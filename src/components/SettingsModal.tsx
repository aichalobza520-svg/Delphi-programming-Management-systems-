import React, { useState } from 'react';
import { 
  Globe, 
  Settings, 
  FileText, 
  Check, 
  Copy, 
  Languages, 
  Code2, 
  ArrowLeftRight, 
  CheckCircle2, 
  Database, 
  RotateCcw,
  Sparkles,
  Type,
  Coins,
  ShieldCheck
} from 'lucide-react';
import { useLanguage, LANGUAGE_STORAGE_KEY, FONT_STORAGE_KEY, CURRENCY_STORAGE_KEY } from '../context/LanguageContext';
import { AR_JSON_SAMPLE, EN_JSON_SAMPLE, DELPHI_LOCALIZATION_UNIT_CODE } from '../types/localization';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { 
    lang, 
    setLang, 
    font, 
    setFont, 
    currency, 
    setCurrency, 
    lastSavedAt, 
    resetToDefaults 
  } = useLanguage();

  const [activeTab, setActiveTab] = useState<'preferences' | 'storage' | 'ar_json' | 'en_json' | 'pas_unit'>('preferences');
  const [copied, setCopied] = useState(false);
  const [testKey, setTestKey] = useState('SaveSuccess');
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleSelectLang = (newLang: 'ar' | 'en') => {
    setLang(newLang);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSelectFont = (newFont: string) => {
    setFont(newFont);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSelectCurrency = (newCurr: string) => {
    setCurrency(newCurr);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case 'ar_json': return AR_JSON_SAMPLE;
      case 'en_json': return EN_JSON_SAMPLE;
      case 'pas_unit': return DELPHI_LOCALIZATION_UNIT_CODE;
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-sans">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative space-y-5 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-indigo-500/20 border border-amber-500/30 text-amber-400">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {lang === 'ar' ? 'إعدادات اللغة وحفظ التفضيلات في LocalStorage' : 'Language Preferences & LocalStorage Persistence'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  LocalStorage: Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'ar' 
                  ? 'التبديل التلقائي بين العربية والإنجليزية مع الحفظ التلقائي في ذاكرة المتصفح' 
                  : 'Seamless dynamic language switching with persistent browser localStorage'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'preferences'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'خيارات اللغة والتفضيلات' : 'Language & Preferences'}</span>
          </button>

          <button
            onClick={() => setActiveTab('storage')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'storage'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'فاحص التخزين LocalStorage' : 'LocalStorage Inspector'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ar_json')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition font-mono ${
              activeTab === 'ar_json'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Languages/ar.json</span>
          </button>

          <button
            onClick={() => setActiveTab('en_json')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition font-mono ${
              activeTab === 'en_json'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Languages/en.json</span>
          </button>

          <button
            onClick={() => setActiveTab('pas_unit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition font-mono ${
              activeTab === 'pas_unit'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>uLocalization.pas</span>
          </button>
        </div>

        {/* Real-time Save Toast Banner */}
        {savedAlert && (
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'ar' 
                  ? 'تم حفظ تفضيلاتك بنجاح في LocalStorage للمتصفح!' 
                  : 'Your preferences have been saved to browser LocalStorage!'}
              </span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400/80">{lastSavedAt}</span>
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1">
          
          {/* TAB 1: Preferences & Language Switcher */}
          {activeTab === 'preferences' && (
            <div className="space-y-5">
              
              {/* Dynamic Language Switcher Cards */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  {lang === 'ar' ? 'اختر لغة الواجهة الرئيسية (Language Selection):' : 'Select Primary Interface Language:'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Arabic Card */}
                  <div
                    onClick={() => handleSelectLang('ar')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                      lang === 'ar'
                        ? 'bg-gradient-to-br from-amber-500/20 to-slate-900 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/40'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <span className="text-xl">🇸🇦</span>
                        <span>العربية (Arabic)</span>
                      </span>
                      {lang === 'ar' ? (
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-600"></div>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      واجهة عربية كاملة، محاذاة من اليمين لليسار (RTL - bdRightToLeft)، خط Cairo العربي المعتمد، وتنسيق أرقام محلي.
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
                      <span>Direction: RTL</span>
                      <span className="text-amber-400">Stored: 'ar'</span>
                    </div>
                  </div>

                  {/* English Card */}
                  <div
                    onClick={() => handleSelectLang('en')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                      lang === 'en'
                        ? 'bg-gradient-to-br from-indigo-500/20 to-slate-900 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-500/40'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <span className="text-xl">🇺🇸</span>
                        <span>English (الإنجليزية)</span>
                      </span>
                      {lang === 'en' ? (
                        <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-600"></div>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Full English interface, Left-to-Right layout (LTR - bdLeftToRight), Segoe UI typography, and international formats.
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
                      <span>Direction: LTR</span>
                      <span className="text-indigo-400">Stored: 'en'</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Font & Typography Preference */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">
                      {lang === 'ar' ? 'تفضيل الخطوط والطباعة (Typography Style):' : 'Preferred Font Family:'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Key: {FONT_STORAGE_KEY}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'cairo', name: 'خط القاهرة (Cairo)', desc: 'الافتراضي الموصى به للعربية' },
                    { id: 'segoe', name: 'Segoe UI / النظام', desc: 'خط ويندوز الرسمي القياسي' },
                    { id: 'ibm', name: 'IBM Plex Sans Arabic', desc: 'خط رقمي حديث عالي الوضوح' },
                  ].map((fItem) => (
                    <button
                      key={fItem.id}
                      onClick={() => handleSelectFont(fItem.id)}
                      className={`p-3 rounded-xl border text-right transition ${
                        font === fItem.id
                          ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">{fItem.name}</span>
                        {font === fItem.id && <span className="text-xs text-amber-400">✓</span>}
                      </div>
                      <span className="text-[11px] text-slate-500 block">{fItem.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency & Financial Units */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">
                      {lang === 'ar' ? 'رمز العملة الافتراضية بالفواتير (Currency Symbol):' : 'Default Currency Symbol:'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Key: {CURRENCY_STORAGE_KEY}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { symbol: 'ر.س', label: 'ريال سعودي (SAR)' },
                    { symbol: 'SAR', label: 'Saudi Riyal (ISO)' },
                    { symbol: '$', label: 'US Dollar (USD)' },
                    { symbol: '€', label: 'Euro (EUR)' },
                    { symbol: 'د.إ', label: 'درهم إماراتي (AED)' },
                  ].map((currItem) => (
                    <button
                      key={currItem.symbol}
                      onClick={() => handleSelectCurrency(currItem.symbol)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition flex items-center gap-1.5 ${
                        currency === currItem.symbol
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-emerald-400 font-bold">{currItem.symbol}</span>
                      <span>{currItem.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Translation Key Tester */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  {lang === 'ar' ? 'فحص ترجمة المفاتيح حياً (String Key Tester):' : 'Test Translation Keys Live:'}
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testKey}
                    onChange={(e) => setTestKey(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300"
                    placeholder="e.g. SaveSuccess, ConfirmSave, AppTitle..."
                  />
                  <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-300 flex items-center gap-1">
                    <span className="text-[10px] text-slate-500">Value:</span>
                    <span>
                      {testKey === 'SaveSuccess' 
                        ? (lang === 'ar' ? 'تم حفظ الفاتورة بنجاح في قاعدة البيانات.' : 'Invoice successfully saved to database.')
                        : (testKey === 'AppTitle' 
                            ? (lang === 'ar' ? 'ريادة ERP - منظومة إدارة المؤسسات' : 'Rayada ERP - Enterprise Suite')
                            : 'Result Value...')}
                    </span>
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LocalStorage Diagnostics & Inspector */}
          {activeTab === 'storage' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>محتويات التخزين المحلي للمتصفح (Browser LocalStorage Inspector)</span>
                  </h4>
                  <button
                    onClick={resetToDefaults}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-semibold border border-rose-800/60 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>استعادة الإعدادات الافتراضية</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                        <th className="py-2.5 px-3 font-mono">مفتاح التخزين (Key)</th>
                        <th className="py-2.5 px-3 font-mono">القيمة الحالية (Stored Value)</th>
                        <th className="py-2.5 px-3">الوصف والدور الوظيفي</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      <tr>
                        <td className="py-2.5 px-3 font-mono text-amber-400">{LANGUAGE_STORAGE_KEY}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">"{lang}"</td>
                        <td className="py-2.5 px-3 text-slate-400">اللغة المختارة (ar للعربية أو en للإنجليزية)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono text-amber-400">{FONT_STORAGE_KEY}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">"{font}"</td>
                        <td className="py-2.5 px-3 text-slate-400">نوع الخط المفضل لواجهة العرض</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono text-amber-400">{CURRENCY_STORAGE_KEY}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">"{currency}"</td>
                        <td className="py-2.5 px-3 text-slate-400">رمز العملة الافتراضي المعروض في شاشات الفواتير</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <span className="font-semibold text-slate-300 block">كيف يتم استخدام هذه الإعدادات عند إعادة فتح الصفحة؟</span>
                  <p className="leading-relaxed">
                    يقوم التطبيق فور التحميل (Mount) بقراءة المفتاح <code className="text-amber-300 font-mono">{LANGUAGE_STORAGE_KEY}</code>، وتطبيق اتجاه <code className="text-emerald-300 font-mono">document.documentElement.dir</code> وترجمة كافة الشاشات والقوائم تلقائياً دون أي فقدان لتفضيلات المستخدم.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3-5: JSON & Pascal Code Viewers */}
          {activeTab !== 'preferences' && activeTab !== 'storage' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {activeTab === 'ar_json' && 'Languages/ar.json - Arabic Translation Dictionary'}
                  {activeTab === 'en_json' && 'Languages/en.json - English Translation Dictionary'}
                  {activeTab === 'pas_unit' && 'Utils/uLocalization.pas - Object Pascal Core Engine'}
                </span>
                <button
                  onClick={() => handleCopy(getActiveContent())}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : (lang === 'ar' ? 'نسخ الكود' : 'Copy Code')}</span>
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <pre className="p-4 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto max-h-96 select-text whitespace-pre-wrap">
                  {getActiveContent()}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === 'ar' ? 'يتم حفظ كافة التفضيلات تلقائياً في LocalStorage.' : 'All changes are automatically saved to LocalStorage.'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
          >
            {lang === 'ar' ? 'حفظ وإغلاق' : 'Save & Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
