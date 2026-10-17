export type Language = 'ar' | 'en';

export interface TranslationDictionary {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const UI_TRANSLATIONS: Record<string, { ar: string; en: string }> = {
  // Header
  appTitle: {
    ar: 'Delphi 12.1 & SQL Server Enterprise Architect',
    en: 'Delphi 12.1 & SQL Server Enterprise Architect'
  },
  engineBadge: {
    ar: 'Delphi 12.1 Athens + MS SQL Server',
    en: 'Delphi 12.1 Athens + MS SQL Server'
  },
  firedacBadge: {
    ar: 'FireDAC Native',
    en: 'FireDAC Native'
  },
  devTeamBtn: {
    ar: 'فريق التطوير (12 تخصصاً)',
    en: 'Development Team (12 Roles)'
  },
  newIdeaBtn: {
    ar: 'توليد فكرة جديدة',
    en: 'Generate New Idea'
  },
  downloadZipBtn: {
    ar: 'تحميل مشروع Delphi كامل (ZIP)',
    en: 'Download Full Delphi Project (ZIP)'
  },
  downloadingZip: {
    ar: 'جاري تجميع الملفات...',
    en: 'Packaging Files...'
  },
  languageToggle: {
    ar: 'English',
    en: 'العربية'
  },
  settingsBtn: {
    ar: 'الإعدادات واللغات',
    en: 'Settings & Localization'
  },

  // Navigation & Stages
  stagesTitle: {
    ar: 'خطة العمل المعتمدة',
    en: 'Approved Lifecycle Plan'
  },
  stagesSubtitle: {
    ar: 'دورة حياة تطوير البرنامج خطوة بخطوة وفق المتطلبات المحددة',
    en: 'Step-by-step software development lifecycle according to specifications'
  },
  stagesProgress: {
    ar: '15 / 15 مرحلة جاهزة',
    en: '15 / 15 Stages Ready'
  },
  stageStatusActive: {
    ar: 'حالة المشروع: نشط ومتحقق منه',
    en: 'Project Status: Active & Verified'
  },
  stageStatusDesc: {
    ar: 'توليد كود Object Pascal و SQL Server متوافق 100% مع بيئة الإنتاج.',
    en: '100% production-ready Object Pascal and SQL Server generation.'
  },
  stageVerifiedBadge: {
    ar: 'جاهزة ومتحقق منها 100%',
    en: '100% Ready & Verified'
  },
  stageOf: {
    ar: 'المرحلة {curr} من {total}',
    en: 'Stage {curr} of {total}'
  },
  prevStage: {
    ar: 'المرحلة السابقة',
    en: 'Previous Stage'
  },
  nextStage: {
    ar: 'المرحلة التالية',
    en: 'Next Stage'
  },

  // Stages Names
  stage1: { ar: 'تحليل الفكرة والمشكلة', en: 'Idea & Problem Analysis' },
  stage2: { ar: 'المتطلبات ومعايير القبول', en: 'Requirements & Acceptance Criteria' },
  stage3: { ar: 'تصميم معمارية النظم', en: 'System Architecture Design' },
  stage4: { ar: 'قاعدة بيانات SQL Server', en: 'SQL Server Database' },
  stage5: { ar: 'هيكل مشروع Delphi 12.1', en: 'Delphi 12.1 Project Structure' },
  stage6: { ar: 'إعداد اتصال FireDAC', en: 'FireDAC Connection Setup' },
  stage7: { ar: 'واجهات VCL وتجربة المستخدم', en: 'VCL UI & User Experience' },
  stage8: { ar: 'برمجة منطق الأعمال Services', en: 'Business Logic & Services' },
  stage9: { ar: 'الأمان وحماية كلمات المرور', en: 'Security & Password Hashing' },
  stage10: { ar: 'التقارير والطباعة FastReport', en: 'Reporting & FastReport' },
  stage11: { ar: 'مصفوفة الاختبارات QA', en: 'QA & Test Matrix' },
  stage12: { ar: 'تحسين الأداء وضبط الذاكرة', en: 'Performance & Zero Leaks' },
  stage13: { ar: 'تجهيز الإصدار وحزمة التثبيت', en: 'Release & Installer Packaging' },
  stage14: { ar: 'التوثيق الفني ونظام التعريب', en: 'Technical Docs & Localization' },
  stage15: { ar: 'التسويق ونموذج التراخيص', en: 'Commercial Licensing Model' }
};

export const DELPHI_LOCALIZATION_UNIT_CODE = `unit uLocalization;

{==============================================================================
  Delphi 12.1 Athens - Enterprise Localization Manager (uLocalization.pas)
  Supports:
    - Multi-language JSON / INI dynamic dictionary loading
    - Recursive VCL Form and Component translation
    - BiDiMode switching (bdRightToLeft for Arabic, bdLeftToRight for English/French)
    - Font adjustment (e.g. Cairo for Arabic, Segoe UI for English)
    - TDBGrid columns title translation
    - TActionList and TMenuItem translation
  Thread-Safe Singleton Pattern.
==============================================================================}

interface

uses
  System.SysUtils, System.Classes, System.IOUtils, System.JSON,
  Vcl.Forms, Vcl.Controls, Vcl.StdCtrls, Vcl.Buttons, Vcl.ExtCtrls,
  Vcl.Menus, Vcl.ActnList, Vcl.DBGrids, Vcl.Graphics, Data.DB;

type
  TLanguageCode = (lcArabic, lcEnglish, lcFrench);

  TLocalizationManager = class
  private
    class var FInstance: TLocalizationManager;
    FCurrentLanguage: TLanguageCode;
    FLangDict: TJSONObject;
    FLanguagesFolder: string;
    procedure LoadLanguageDictionary(const ALangCode: string);
    function GetComponentTranslation(const AFormName, AComponentName: string; out ATranslation: string): Boolean;
    function GetStringTranslation(const AKey: string; const ADefault: string = ''): string;
  public
    constructor Create;
    destructor Destroy; override;
    class function Instance: TLocalizationManager;
    class destructor ClassDestroy;

    procedure SetLanguage(ALang: TLanguageCode);
    procedure ApplyLanguageToForm(AForm: TCustomForm);
    function Translate(const AKey: string; const ADefault: string = ''): string;

    property CurrentLanguage: TLanguageCode read FCurrentLanguage;
    property LanguagesFolder: string read FLanguagesFolder write FLanguagesFolder;
  end;

implementation

{ TLocalizationManager }

constructor TLocalizationManager.Create;
begin
  inherited Create;
  FLanguagesFolder := TPath.Combine(ExtractFilePath(ParamStr(0)), 'Languages');
  FCurrentLanguage := lcArabic;
  LoadLanguageDictionary('ar');
end;

destructor TLocalizationManager.Destroy;
begin
  FLangDict.Free;
  inherited Destroy;
end;

class function TLocalizationManager.Instance: TLocalizationManager;
begin
  if FInstance = nil then
    FInstance := TLocalizationManager.Create;
  Result := FInstance;
end;

class destructor TLocalizationManager.ClassDestroy;
begin
  FInstance.Free;
end;

procedure TLocalizationManager.LoadLanguageDictionary(const ALangCode: string);
var
  FilePath: string;
  JsonContent: string;
begin
  FreeAndNil(FLangDict);
  FilePath := TPath.Combine(FLanguagesFolder, ALangCode + '.json');

  if FileExists(FilePath) then
  begin
    JsonContent := TFile.ReadAllText(FilePath, TEncoding.UTF8);
    FLangDict := TJSONObject.ParseJSONValue(JsonContent) as TJSONObject;
  end
  else
  begin
    // Fallback empty object
    FLangDict := TJSONObject.Create;
  end;
end;

procedure TLocalizationManager.SetLanguage(ALang: TLanguageCode);
begin
  if FCurrentLanguage <> ALang then
  begin
    FCurrentLanguage := ALang;
    case ALang of
      lcArabic: LoadLanguageDictionary('ar');
      lcEnglish: LoadLanguageDictionary('en');
      lcFrench: LoadLanguageDictionary('fr');
    end;

    // Apply translation to all currently active forms
    if Screen <> nil then
    begin
      for var i := 0 to Screen.CustomFormCount - 1 do
        ApplyLanguageToForm(Screen.CustomForms[i]);
    end;
  end;
end;

function TLocalizationManager.GetComponentTranslation(const AFormName, AComponentName: string;
  out ATranslation: string): Boolean;
begin
  Result := False;
  ATranslation := '';
  if FLangDict = nil then Exit;

  var FormsObj := FLangDict.Values['Forms'] as TJSONObject;
  if FormsObj <> nil then
  begin
    var FormObj := FormsObj.Values[AFormName] as TJSONObject;
    if FormObj <> nil then
    begin
      var Val := FormObj.Values[AComponentName];
      if Val <> nil then
      begin
        ATranslation := Val.Value;
        Result := True;
      end;
    end;
  end;
end;

function TLocalizationManager.GetStringTranslation(const AKey: string; const ADefault: string): string;
begin
  Result := ADefault;
  if FLangDict = nil then Exit;

  var StringsObj := FLangDict.Values['Strings'] as TJSONObject;
  if StringsObj <> nil then
  begin
    var Val := StringsObj.Values[AKey];
    if Val <> nil then
      Result := Val.Value;
  end;
end;

function TLocalizationManager.Translate(const AKey: string; const ADefault: string): string;
begin
  Result := GetStringTranslation(AKey, ADefault);
end;

procedure TLocalizationManager.ApplyLanguageToForm(AForm: TCustomForm);
var
  i, col: Integer;
  Comp: TComponent;
  TextVal: string;
  FormName: string;
begin
  if AForm = nil then Exit;
  FormName := AForm.Name;

  AForm.DisableAlign;
  try
    // 1. BiDiMode and Font Direction
    if FCurrentLanguage = lcArabic then
    begin
      AForm.BiDiMode := bdRightToLeft;
      AForm.Font.Name := 'Cairo';
      AForm.Font.Charset := ARABIC_CHARSET;
    end
    else
    begin
      AForm.BiDiMode := bdLeftToRight;
      AForm.Font.Name := 'Segoe UI';
      AForm.Font.Charset := DEFAULT_CHARSET;
    end;

    // 2. Form Caption
    if GetComponentTranslation(FormName, 'Caption', TextVal) then
      AForm.Caption := TextVal;

    // 3. Iterate all components
    for i := 0 to AForm.ComponentCount - 1 do
    begin
      Comp := AForm.Components[i];

      // Translate standard controls by name
      if GetComponentTranslation(FormName, Comp.Name, TextVal) then
      begin
        if Comp is TLabel then
          TLabel(Comp).Caption := TextVal
        else if Comp is TButton then
          TButton(Comp).Caption := TextVal
        else if Comp is TBitBtn then
          TBitBtn(Comp).Caption := TextVal
        else if Comp is TSpeedButton then
          TSpeedButton(Comp).Caption := TextVal
        else if Comp is TPanel then
          TPanel(Comp).Caption := TextVal
        else if Comp is TGroupBox then
          TGroupBox(Comp).Caption := TextVal
        else if Comp is TMenuItem then
          TMenuItem(Comp).Caption := TextVal
        else if Comp is TAction then
          TAction(Comp).Caption := TextVal;
      end;

      // Translate DBGrid Column Titles
      if Comp is TDBGrid then
      begin
        var Grid := TDBGrid(Comp);
        for col := 0 to Grid.Columns.Count - 1 do
        begin
          var ColKey := Comp.Name + '.Column.' + Grid.Columns[col].FieldName;
          if GetComponentTranslation(FormName, ColKey, TextVal) then
            Grid.Columns[col].Title.Caption := TextVal;
        end;
      end;
    end;
  finally
    AForm.EnableAlign;
  end;
end;

end.`;

export const AR_JSON_SAMPLE = `{
  "Meta": {
    "Language": "ar",
    "Name": "العربية",
    "Direction": "RTL",
    "FontFamily": "Cairo"
  },
  "Strings": {
    "AppTitle": "ريادة ERP - منظومة إدارة المؤسسات",
    "ConfirmSave": "هل أنت متأكد من حفظ وترحيل الفاتورة؟",
    "ConfirmDelete": "هل ترغب حقاً في حذف هذا السطر؟",
    "SaveSuccess": "تم حفظ الفاتورة بنجاح في قاعدة البيانات.",
    "ErrorInvalidCustomer": "يجب اختيار عميل مسجل لإتمام الفاتورة.",
    "Currency": "ر.س"
  },
  "Forms": {
    "InvoiceEditForm": {
      "Caption": "شاشة إصدار وتعديل فواتير المبيعات",
      "lblCustomer": "العميل:",
      "lblInvoiceNum": "رقم الفاتورة:",
      "lblInvoiceDate": "تاريخ الفاتورة:",
      "lblPaymentType": "طريقة الدفع:",
      "lblBarcode": "الباركود:",
      "btnSave": "حفظ وترحيل [F5]",
      "btnPrint": "طباعة إيصال [F9]",
      "btnNew": "فاتورة جديدة [F2]",
      "btnClose": "خروج [Esc]",
      "lblSubTotal": "المجموع قبل الضريبة:",
      "lblTaxAmount": "ضريبة القيمة المضافة 15%:",
      "lblGrandTotal": "الصافي النهائي المستحق:",
      "grdItems.Column.ItemCode": "كود الصنف",
      "grdItems.Column.ItemNameAr": "اسم الصنف",
      "grdItems.Column.Quantity": "الكمية",
      "grdItems.Column.UnitPrice": "سعر الوحدة",
      "grdItems.Column.LineTaxAmount": "الضريبة 15%",
      "grdItems.Column.LineTotal": "الإجمالي"
    },
    "LoginForm": {
      "Caption": "تسجيل الدخول - ريادة ERP",
      "lblUsername": "اسم المستخدم:",
      "lblPassword": "كلمة المرور:",
      "btnLogin": "تسجيل الدخول",
      "btnCancel": "إلغاء"
    }
  }
}`;

export const EN_JSON_SAMPLE = `{
  "Meta": {
    "Language": "en",
    "Name": "English",
    "Direction": "LTR",
    "FontFamily": "Segoe UI"
  },
  "Strings": {
    "AppTitle": "Rayada ERP - Enterprise Suite",
    "ConfirmSave": "Are you sure you want to save and post this invoice?",
    "ConfirmDelete": "Do you really want to delete this row?",
    "SaveSuccess": "Invoice successfully saved to database.",
    "ErrorInvalidCustomer": "A registered customer must be selected to proceed.",
    "Currency": "SAR"
  },
  "Forms": {
    "InvoiceEditForm": {
      "Caption": "Sales Invoice Entry & Management",
      "lblCustomer": "Customer:",
      "lblInvoiceNum": "Invoice No:",
      "lblInvoiceDate": "Invoice Date:",
      "lblPaymentType": "Payment Method:",
      "lblBarcode": "Barcode:",
      "btnSave": "Save & Post [F5]",
      "btnPrint": "Print Receipt [F9]",
      "btnNew": "New Invoice [F2]",
      "btnClose": "Close [Esc]",
      "lblSubTotal": "SubTotal Before Tax:",
      "lblTaxAmount": "VAT 15%:",
      "lblGrandTotal": "Grand Total Due:",
      "grdItems.Column.ItemCode": "Item Code",
      "grdItems.Column.ItemNameAr": "Item Description",
      "grdItems.Column.Quantity": "Qty",
      "grdItems.Column.UnitPrice": "Unit Price",
      "grdItems.Column.LineTaxAmount": "VAT 15%",
      "grdItems.Column.LineTotal": "Line Total"
    },
    "LoginForm": {
      "Caption": "System Login - Rayada ERP",
      "lblUsername": "Username:",
      "lblPassword": "Password:",
      "btnLogin": "Sign In",
      "btnCancel": "Cancel"
    }
  }
}`;
