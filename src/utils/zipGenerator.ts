import JSZip from 'jszip';
import { ProjectData } from '../types/project';
import { AR_JSON_SAMPLE, EN_JSON_SAMPLE, DELPHI_LOCALIZATION_UNIT_CODE } from '../types/localization';

export async function generateProjectZip(project: ProjectData): Promise<Blob> {
  const zip = new JSZip();

  // Root project file (.dpr)
  zip.file(`${project.id}.dpr`, project.delphiUnits.find(u => u.fileName.endsWith('.dpr'))?.code || '');

  // Folder: Data
  const dataFolder = zip.folder('Data');
  const dmUnit = project.delphiUnits.find(u => u.fileName.includes('dmMain.pas'));
  if (dmUnit && dataFolder) {
    dataFolder.file('dmMain.pas', dmUnit.code);
    dataFolder.file('dmMain.dfm', `object dmData: TdmData
  OldCreateOrder = False
  OnCreate = DataModuleCreate
  OnDestroy = DataModuleDestroy
  Height = 350
  Width = 500
  object FDConnection: TFDConnection
    Params.Strings = (
      'DriverID=MSSQL'
      'Server=127.0.0.1,1433'
      'Database=RayadaERP_DB'
      'OSAuthent=Yes'
      'ApplicationName=RayadaERP_Client'
      'MARS=yes')
    LoginPrompt = False
    Left = 60
    Top = 40
  end
  object FDPhysMSSQLDriverLink: TFDPhysMSSQLDriverLink
    Left = 180
    Top = 40
  end
  object FDGUIxWaitCursor: TFDGUIxWaitCursor
    Provider = 'Forms'
    Left = 310
    Top = 40
  end
  object FDTrans: TFDTransaction
    Connection = FDConnection
    Left = 60
    Top = 130
  end
end`);
  }

  // Folder: Models
  const modelsFolder = zip.folder('Models');
  project.delphiUnits.filter(u => u.layer === 'Models').forEach(u => {
    modelsFolder?.file(u.fileName.replace('Models/', ''), u.code);
  });

  // Folder: Services
  const servicesFolder = zip.folder('Services');
  project.delphiUnits.filter(u => u.layer === 'Business').forEach(u => {
    servicesFolder?.file(u.fileName.replace('Services/', ''), u.code);
  });

  // Folder: Repositories
  const reposFolder = zip.folder('Repositories');
  project.delphiUnits.filter(u => u.layer === 'Data' && !u.fileName.includes('dmMain')).forEach(u => {
    reposFolder?.file(u.fileName.replace('Repositories/', ''), u.code);
  });

  // Folder: Security
  const secFolder = zip.folder('Security');
  project.delphiUnits.filter(u => u.layer === 'Security').forEach(u => {
    secFolder?.file(u.fileName.replace('Security/', ''), u.code);
  });

  // Folder: Reports
  const reportsFolder = zip.folder('Reports');
  project.delphiUnits.filter(u => u.layer === 'Reports').forEach(u => {
    reportsFolder?.file(u.fileName.replace('Reports/', ''), u.code);
  });
  project.fastReports.forEach(fr => {
    reportsFolder?.file(fr.fileName.replace('Reports/', ''), fr.fr3Definition);
  });

  // Folder: Utils & Localization
  const utilsFolder = zip.folder('Utils');
  utilsFolder?.file('uLocalization.pas', DELPHI_LOCALIZATION_UNIT_CODE);

  // Folder: Languages (Localization Dictionaries)
  const langFolder = zip.folder('Languages');
  langFolder?.file('ar.json', AR_JSON_SAMPLE);
  langFolder?.file('en.json', EN_JSON_SAMPLE);

  // Folder: Forms
  const formsFolder = zip.folder('Forms');
  project.forms.forEach(form => {
    formsFolder?.file(form.unitName, form.pasSnippet);
    formsFolder?.file(form.unitName.replace('.pas', '.dfm'), form.dfmSnippet);
  });

  // Folder: SQL
  const sqlFolder = zip.folder('Database_SQLServer');
  sqlFolder?.file('01_CreateDatabase.sql', project.sqlScripts.createDatabase);
  sqlFolder?.file('02_CreateTables.sql', project.sqlScripts.createTables);
  sqlFolder?.file('03_StoredProcedures.sql', project.sqlScripts.storedProcedures);
  sqlFolder?.file('04_ViewsAndIndexes.sql', project.sqlScripts.viewsAndIndexes);
  sqlFolder?.file('05_SeedData.sql', project.sqlScripts.seedData);
  sqlFolder?.file('06_BackupScripts.sql', project.sqlScripts.backupAndRestore);

  // Folder: Config
  const configFolder = zip.folder('Config');
  configFolder?.file('Database.ini', `[Database]
Server=127.0.0.1,1433
Database=RayadaERP_DB
DriverID=MSSQL
Encrypt=Optional
ConnectionTimeout=15

[Localization]
DefaultLanguage=ar
AvailableLanguages=ar,en,fr
LanguagesFolder=Languages
`);

  // Folder: Installer
  const installerFolder = zip.folder('Installer');
  installerFolder?.file('SetupScript.iss', project.innoSetupScript);

  // Folder: Docs
  const docsFolder = zip.folder('Documentation');
  docsFolder?.file('Architecture.md', project.documentation.architectureDoc);
  docsFolder?.file('UserGuide.md', project.documentation.userGuide);
  docsFolder?.file('DeveloperGuide.md', project.documentation.developerGuide);
  docsFolder?.file('CommercialLicensing.md', project.documentation.commercialPlan);
  docsFolder?.file('LocalizationArchitecture.md', `# Delphi 12.1 Localization & Multi-language Architecture

## Structure
- \`Utils/uLocalization.pas\`: Core singleton manager for dynamic runtime translation.
- \`Languages/ar.json\`: Arabic dictionary with RTL BiDiMode and 'Cairo' font mapping.
- \`Languages/en.json\`: English dictionary with LTR BiDiMode and 'Segoe UI' font mapping.
- \`Config/Database.ini\`: Holds [Localization] default language configuration.

## Usage in Delphi
\`\`\`pascal
// Change language at runtime:
TLocalizationManager.Instance.SetLanguage(lcEnglish);

// Manually translate a message:
ShowMessage(TLocalizationManager.Instance.Translate('SaveSuccess'));
\`\`\`
`);

  return await zip.generateAsync({ type: 'blob' });
}
