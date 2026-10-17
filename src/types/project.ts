export type ProjectCategory = 'erp' | 'clinic' | 'pos' | 'realestate' | 'custom';

export interface DatabaseTable {
  name: string;
  arabicName: string;
  description: string;
  columns: {
    name: string;
    type: string;
    isPrimary?: boolean;
    isForeign?: boolean;
    references?: string;
    isNullable?: boolean;
    defaultVal?: string;
    description: string;
  }[];
  indexes: string[];
}

export interface DelphiUnit {
  fileName: string;
  unitName: string;
  purpose: string;
  layer: 'Presentation' | 'Business' | 'Data' | 'Models' | 'Security' | 'Reports' | 'Config';
  code: string;
  notes?: string;
}

export interface VCLFormSpec {
  formName: string;
  arabicTitle: string;
  unitName: string;
  description: string;
  components: {
    name: string;
    type: string;
    caption?: string;
    event?: string;
    description: string;
  }[];
  dfmSnippet: string;
  pasSnippet: string;
}

export interface QATestCase {
  id: string;
  title: string;
  module: string;
  inputData: string;
  steps: string[];
  expectedResult: string;
  status: 'passed' | 'pending' | 'automated';
}

export interface ProjectData {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  targetAudience: string;
  language: string;
  architecture: {
    layers: string[];
    diagramText: string;
    designPatterns: string[];
    securityMeasures: string[];
  };
  requirements: {
    problemStatement: string;
    mvpScope: string[];
    functional: string[];
    nonFunctional: string[];
    acceptanceCriteria: string[];
  };
  sqlScripts: {
    createDatabase: string;
    createTables: string;
    storedProcedures: string;
    viewsAndIndexes: string;
    seedData: string;
    backupAndRestore: string;
  };
  tables: DatabaseTable[];
  delphiUnits: DelphiUnit[];
  forms: VCLFormSpec[];
  fastReports: {
    reportName: string;
    fileName: string;
    description: string;
    fr3Definition: string;
    pasIntegration: string;
  }[];
  qaTests: QATestCase[];
  innoSetupScript: string;
  documentation: {
    architectureDoc: string;
    userGuide: string;
    developerGuide: string;
    commercialPlan: string;
  };
}
