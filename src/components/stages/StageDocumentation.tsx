import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle2, ListChecks, HelpCircle, Sparkles, Terminal, Languages, Globe, Copy, Check } from 'lucide-react';
import { ProjectData } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';
import { AR_JSON_SAMPLE, EN_JSON_SAMPLE, DELPHI_LOCALIZATION_UNIT_CODE } from '../../types/localization';

interface Props {
  project: ProjectData;
}

export const StageDocumentation: React.FC<Props> = ({ project }) => {
  const { lang } = useLanguage();
  const [activeDocTab, setActiveDocTab] = useState<'progress' | 'loc' | 'user' | 'dev'>('progress');
  const [locSubTab, setLocSubTab] = useState<'overview' | 'ar_json' | 'en_json' | 'uLocalization'>('overview');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortcuts = [
    { key: 'F2', desc: lang === 'ar' ? 'فتح شاشة فاتورة مبيعات جديدة وتفريغ الحقول' : 'Open new sales invoice and reset fields' },
    { key: 'F3', desc: lang === 'ar' ? 'البحث السريع عن صنف بالاسم أو الباركود' : 'Quick product lookup by SKU or barcode' },
    { key: 'F4', desc: lang === 'ar' ? 'البحث عن حساب عميل واختياره' : 'Lookup and select customer account' },
    { key: 'F5', desc: lang === 'ar' ? 'حفظ وترحيل الفاتورة في قاعدة البيانات' : 'Save and post invoice to database' },
    { key: 'F9', desc: lang === 'ar' ? 'معاينة وطباعة الفاتورة عبر FastReport' : 'Preview and print invoice via FastReport' },
    { key: 'F10', desc: lang === 'ar' ? 'فتح درج النقدية الكاشير المتصل بالطابعة الحرارية' : 'Open cash drawer connected to printer' },
    { key: 'Esc', desc: lang === 'ar' ? 'إلغاء العملية الحالية أو إغلاق الشاشة المنبثقة' : 'Cancel current action or close modal' },
    { key: 'Enter', desc: lang === 'ar' ? 'التنقل التلقائي بين حقول الإدخال (Focus Next)' : 'Advance focus to next input field' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
              {lang === 'ar' ? 'المرحلة 14 و 15 : التوثيق الفني ونظام التعريب' : 'Stages 14 & 15: Technical Documentation & Localization Engine'}
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              {lang === 'ar' 
                ? 'دليل المطور، دليل المستخدم، معمارية ملفات اللغات، وسجل الإنجاز الهندسي' 
                : 'Developer Guide, User Manual, Multi-Language File Architecture & Progress Tracker'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ar' 
                ? 'توثيق شامل لتسهيل الصيانة والترقية، وتدريب المستخدمين، ودعم تعدد اللغات (Localization) في Delphi 12.1.' 
                : 'Complete documentation for maintainability, end-user onboarding, and Delphi 12.1 dynamic localization.'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveDocTab('progress')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeDocTab === 'progress'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          <span>{lang === 'ar' ? 'سجل التقدم الفني المعتمد (Progress Log)' : 'Engineering Progress Log'}</span>
        </button>

        <button
          onClick={() => setActiveDocTab('loc')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeDocTab === 'loc'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900'
          }`}
        >
          <Languages className="w-4 h-4 text-amber-400" />
          <span>{lang === 'ar' ? 'هيكلية ملفات اللغات (Localization Engine)' : 'Localization File Architecture'}</span>
        </button>

        <button
          onClick={() => setActiveDocTab('user')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeDocTab === 'user'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{lang === 'ar' ? 'دليل المستخدم السريع والاختصارات' : 'User Manual & Shortcuts'}</span>
        </button>

        <button
          onClick={() => setActiveDocTab('dev')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeDocTab === 'dev'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>{lang === 'ar' ? 'دليل المطور وصيانة الكود' : 'Developer & Maintenance Guide'}</span>
        </button>
      </div>

      {/* Localization Tab Content */}
      {activeDocTab === 'loc' && (
        <div className="space-y-4">
          
          {/* Subtabs for Localization */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLocSubTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  locSubTab === 'overview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                {lang === 'ar' ? 'شرح المعمارية والدليل' : 'Architecture & Guide'}
              </button>
              <button
                onClick={() => setLocSubTab('uLocalization')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition font-mono ${
                  locSubTab === 'uLocalization' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                Utils/uLocalization.pas
              </button>
              <button
                onClick={() => setLocSubTab('ar_json')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition font-mono ${
                  locSubTab === 'ar_json' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                Languages/ar.json
              </button>
              <button
                onClick={() => setLocSubTab('en_json')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition font-mono ${
                  locSubTab === 'en_json' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
              >
                Languages/en.json
              </button>
            </div>

            {locSubTab !== 'overview' && (
              <button
                onClick={() => {
                  if (locSubTab === 'uLocalization') handleCopy(DELPHI_LOCALIZATION_UNIT_CODE);
                  else if (locSubTab === 'ar_json') handleCopy(AR_JSON_SAMPLE);
                  else if (locSubTab === 'en_json') handleCopy(EN_JSON_SAMPLE);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ الملف' : 'Copy File')}</span>
              </button>
            )}
          </div>

          {locSubTab === 'overview' && (
            <div className="space-y-4">
              
              {/* Directory Tree Card */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'ar' ? 'هيكلية ملفات ومجلدات التعريب في مشروع Delphi 12.1' : 'Delphi 12.1 Localization File & Folder Structure'}
                  </span>
                </h3>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
                  <div className="text-amber-400 font-bold">RayadaERP/</div>
                  <div className="pl-4">├── <span className="text-indigo-400">RayadaERP.dpr</span> <span className="text-slate-500">// مشروع البداية وتعيين اللغة الافتراضية</span></div>
                  <div className="pl-4">├── <span className="text-emerald-400">Utils/</span></div>
                  <div className="pl-8">└── <span className="text-amber-300 font-bold">uLocalization.pas</span> <span className="text-slate-500">// مدير التعريب والترجمة العودية للواجهات</span></div>
                  <div className="pl-4">├── <span className="text-emerald-400">Languages/</span></div>
                  <div className="pl-8">├── <span className="text-cyan-300">ar.json</span> <span className="text-slate-500">// القاموس العربي (Cairo, RTL, كل الشاشات)</span></div>
                  <div className="pl-8">├── <span className="text-cyan-300">en.json</span> <span className="text-slate-500">// القاموس الإنجليزي (Segoe UI, LTR)</span></div>
                  <div className="pl-8">└── <span className="text-slate-500">fr.json</span> <span className="text-slate-600">// قابل للتوسعة لأي لغة إضافية</span></div>
                  <div className="pl-4">├── <span className="text-emerald-400">Config/</span></div>
                  <div className="pl-8">└── <span className="text-slate-300">Database.ini</span> <span className="text-slate-500">// يحفظ خيار اللغة الافتراضية [Localization] DefaultLanguage=ar</span></div>
                </div>
              </div>

              {/* Technical Code Snippet */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ar' ? 'طريقة استدعاء وتطبيق التعريب برمجياً في Delphi 12.1' : 'How to Invoke Localization in Delphi Code:'}</span>
                </h3>
                
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed">
                  <span className="text-slate-500">// 1. عند تشغيل البرنامج في ملف RayadaERP.dpr:</span><br/>
                  TLocalizationManager.Instance.SetLanguage(lcArabic);<br/><br/>
                  <span className="text-slate-500">// 2. عند فتح أي نموذج VCL Form (في حدث OnCreate):</span><br/>
                  procedure TInvoiceEditForm.FormCreate(Sender: TObject);<br/>
                  begin<br/>
                  &nbsp;&nbsp;TLocalizationManager.Instance.ApplyLanguageToForm(Self);<br/>
                  end;<br/><br/>
                  <span className="text-slate-500">// 3. عند الضغط على زر تحويل اللغة من شريط الأدوات:</span><br/>
                  procedure TMainForm.btnSwitchLangClick(Sender: TObject);<br/>
                  begin<br/>
                  &nbsp;&nbsp;if TLocalizationManager.Instance.CurrentLanguage = lcArabic then<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;TLocalizationManager.Instance.SetLanguage(lcEnglish)<br/>
                  &nbsp;&nbsp;else<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;TLocalizationManager.Instance.SetLanguage(lcArabic);<br/>
                  end;
                </div>
              </div>

            </div>
          )}

          {locSubTab === 'uLocalization' && (
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-amber-300 font-mono flex items-center justify-between">
                <span>Utils/uLocalization.pas - Embarcadero Delphi 12.1 Object Pascal Engine</span>
                <span className="text-emerald-400">System.JSON & BiDiMode Ready</span>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto max-h-[500px] select-text">
                {DELPHI_LOCALIZATION_UNIT_CODE}
              </pre>
            </div>
          )}

          {locSubTab === 'ar_json' && (
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-cyan-300 font-mono">
                Languages/ar.json - Arabic Translation Dictionary (UTF-8)
              </div>
              <pre className="p-4 text-xs font-mono text-cyan-200/90 leading-relaxed overflow-x-auto max-h-[500px] select-text">
                {AR_JSON_SAMPLE}
              </pre>
            </div>
          )}

          {locSubTab === 'en_json' && (
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-cyan-300 font-mono">
                Languages/en.json - English Translation Dictionary (UTF-8)
              </div>
              <pre className="p-4 text-xs font-mono text-cyan-200/90 leading-relaxed overflow-x-auto max-h-[500px] select-text">
                {EN_JSON_SAMPLE}
              </pre>
            </div>
          )}

        </div>
      )}

      {/* Progress Log Content */}
      {activeDocTab === 'progress' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Completed Work */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'ما تم إنجازه هندسياً بالمشروع (100%)' : 'Engineered Features (100% Complete)'}</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'صياغة الفكرة وتحديد متطلبات الـ MVP ومعايير القبول.' : 'Project PRD, MVP Scope & Acceptance Criteria definition.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'تصميم معمارية N-Tier وفصل الواجهات عن منطق الأعمال والوصول للبيانات.' : 'N-Tier Layered Architecture with complete Separation of Concerns.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'تصميم قاعدة بيانات SQL Server كاملة مع العلاقات والفهارس والإجراءات المخزنة.' : 'SQL Server 2022 Schema with ACID Stored Procedures & Covering Indexes.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'نظام تعريب متكامل (uLocalization.pas) ودعم BiDiMode وقواميس JSON.' : 'Full Localization Engine (uLocalization.pas) with JSON dictionaries & BiDiMode.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'برمجة موديول FireDAC والاتصال الآمن واستعادة الاتصال ومعاملات Transactions.' : 'Central FireDAC DataModule with connection pooling and auto-recovery.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'تصميم واجهات VCL Windows 11 وتجربة الإدخال السريع بالباركود.' : 'Windows 11 VCL Form Designer with dynamic RTL/LTR language toggling.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'نظام أمان متكامل: تجزئة كلمات المرور Argon2id مع ملح عشوائي و RBAC.' : 'Argon2id Salted Hashing & Role-Based Access Control matrix.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'قوالب FastReport للفواتير الضريبية ودعم ZATCA QR Code وتصدير PDF.' : 'FastReport VCL tax invoice templates with 2D QR and PDF export.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <span>{lang === 'ar' ? 'سكربت تثبيت Inno Setup 6 ونظام ترخيص عتادي Hardware ID.' : 'Inno Setup 6 installer script and hardware-locked license key activator.'}</span>
                </li>
              </ul>
            </div>

            {/* Technical Decisions */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'ar' ? 'القرارات التقنية المعتمدة (Architectural Decisions)' : 'Key Technical & Architectural Decisions'}</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
                  <strong className="text-white block">{lang === 'ar' ? 'نظام تعدد اللغات (Localization):' : 'Multi-Language Localization:'}</strong>
                  <span>{lang === 'ar' ? 'اعتماد قواميس JSON خارجية مع وحدة uLocalization ومكتبة System.JSON لتسهيل التوسع دون إعادة التجميع.' : 'External JSON dictionaries with System.JSON and uLocalization unit for zero-recompile language extensions.'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
                  <strong className="text-white block">{lang === 'ar' ? 'Collation الترميز العربي:' : 'Arabic Collation:'}</strong>
                  <span className="font-mono text-emerald-400">Arabic_100_CI_AS_SC_UTF8</span> {lang === 'ar' ? 'لضمان دعم كامل للغة العربية والرموز الحديثة.' : 'for unified UTF-8 encoding and accent-sensitive Arabic support.'}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
                  <strong className="text-white block">{lang === 'ar' ? 'إدارة الذاكرة:' : 'Memory Management:'}</strong>
                  <span>{lang === 'ar' ? 'اعتماد FastMM5 في وضع Release و Debug لكشف أي تسرب للمصادر فوراً.' : 'FastMM5 integrated as the first unit in .dpr to ensure Zero Memory Leaks.'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* User Guide Content */}
      {activeDocTab === 'user' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white mb-2">
              {lang === 'ar' ? 'جدول اختصارات لوحة المفاتيح السريعة (Keyboard Shortcuts)' : 'Keyboard Shortcuts Matrix'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ar' 
                ? 'صُممت المنظومة لتسمح للمحاسب والكاشير بإنجاز الفواتير بالكامل بدون لمس الماوس لزيادة السرعة والإنتاجية.' 
                : 'Designed for high-speed operation allowing full invoice entry and checkout via keyboard without mouse interaction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shortcuts.map((sc) => (
              <div key={sc.key} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
                <kbd className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-400 font-mono font-bold text-xs border border-slate-700 shadow-inner">
                  {sc.key}
                </kbd>
                <span className="text-xs text-slate-200">{sc.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Developer Guide */}
      {activeDocTab === 'dev' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">
            {lang === 'ar' ? 'دليل المطور وصيانة الكود المصدري' : 'Developer & Maintenance Guide'}
          </h3>
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <pre className="p-4 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-96 select-text whitespace-pre-wrap">
              {project.documentation.developerGuide}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
