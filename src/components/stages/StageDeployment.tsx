import React, { useState } from 'react';
import { PackageCheck, BadgePercent, Shield, Copy, Check, Terminal, Key, Cpu, Sparkles } from 'lucide-react';
import { ProjectData } from '../../types/project';

interface Props {
  project: ProjectData;
}

export const StageDeployment: React.FC<Props> = ({ project }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'installer' | 'license' | 'pricing'>('installer');

  // Interactive License Key Generator Simulator
  const [hardwareId, setHardwareId] = useState('BFEBFBFF-000906EA-78E94C21');
  const [clientName, setClientName] = useState('شركة التقنية المتقدمة المحدودة');
  const [licenseType, setLicenseType] = useState('Enterprise Perpetual (دائم)');
  const [generatedKey, setGeneratedKey] = useState('RYD-2026-X94B-77E2-89A1-CC04');

  const handleCopyInno = () => {
    navigator.clipboard.writeText(project.innoSetupScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomHex2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    setGeneratedKey(`RYD-2026-${randomHex}-${randomHex2}-89A1-CC04`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              المراحل 13 و 15 : حزمة التثبيت Inno Setup 6 والتوزيع التجاري
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              سكربت المثبت الذكي، حماية التراخيص بـ Hardware ID، ونموذج التسعير
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تثبيت متطلبات التشغيل تلقائياً (ODBC Driver 18)، إنشاء اختصارات سطح المكتب، وقفل النسخة على عتاد الجهاز لمنع القرصنة.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <PackageCheck className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('installer')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'installer'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>سكربت التثبيت (Inno Setup .iss)</span>
        </button>

        <button
          onClick={() => setActiveTab('license')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'license'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>توليد تراخيص Hardware ID</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'pricing'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900'
          }`}
        >
          <BadgePercent className="w-4 h-4" />
          <span>باقات التسعير والنموذج التجاري</span>
        </button>
      </div>

      {/* Inno Setup Content */}
      {activeTab === 'installer' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                ملف إعداد حزمة التثبيت الذكية (RayadaERP_Setup.iss)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تثبيت صامت لمشغل Microsoft ODBC 18، نسخ قوالب FastReport والخطوط العربية
              </p>
            </div>
            <button
              onClick={handleCopyInno}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'تم النسخ' : 'نسخ سكربت Inno Setup'}</span>
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <pre className="p-4 text-xs font-mono text-amber-200/90 leading-relaxed overflow-x-auto max-h-96 select-text">
              {project.innoSetupScript}
            </pre>
          </div>
        </div>
      )}

      {/* Hardware License Generator Simulator */}
      {activeTab === 'license' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                نظام حماية وتوليد مفاتيح الترخيص التجاري (License Activator)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                قفل الترخيص على البصمة العتادية لجهاز العميل (CPU ID + Motherboard Serial)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">اسم العميل / المؤسسة</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">بصمة العتاد المقروءة (Hardware ID)</label>
              <input
                type="text"
                value={hardwareId}
                onChange={(e) => setHardwareId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">نوع الترخيص</label>
              <select
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Enterprise Perpetual">ترخيص دائم مدى الحياة (Perpetual)</option>
                <option value="Annual Subscription">اشتراك سنوي مع التحديثات والدعم</option>
                <option value="Trial 30 Days">نسخة تجريبية 30 يوماً</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-400 block mb-1">مفتاح التنشيط المشفر الناتج (Activation Key):</span>
              <code className="text-base font-mono font-bold text-emerald-400 tracking-wider">
                {generatedKey}
              </code>
            </div>

            <button
              onClick={handleGenerateKey}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>توليد مفتاح جديد للعميل</span>
            </button>
          </div>
        </div>
      )}

      {/* Commercial Business Model */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase">باقة الأعمال الأساسية</span>
            <div className="text-2xl font-black text-white font-mono">
              3,500 <span className="text-xs text-slate-400 font-normal">ر.س / ترخيص دائم</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>✓ حتى 3 أجهزة ومستخدمين على شبكة LAN</li>
              <li>✓ إدارة المخزون والمبيعات والفواتير</li>
              <li>✓ قوالب FastReport جاهزة للطباعة</li>
              <li>✓ سنة دعم فني وتحديثات مجانية</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/30 to-slate-900 border border-amber-500/40 space-y-4 relative shadow-xl">
            <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
              الأكثر طلباً
            </span>
            <span className="text-xs font-bold text-amber-400 uppercase">باقة المؤسسات المتقدمة</span>
            <div className="text-2xl font-black text-white font-mono">
              7,500 <span className="text-xs text-slate-400 font-normal">ر.س / ترخيص دائم</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-200">
              <li>✓ مستخدمين غير محدودين على شبكة LAN</li>
              <li>✓ نظام المحاسبة والقيود اليومية التلقائية</li>
              <li>✓ دعم الفاتورة الضريبية ZATCA Phase 2</li>
              <li>✓ صلاحيات متقدمة وسجل تدقيق Audit Trail</li>
              <li>✓ ربط الفروع عبر شبكة VPN آمنة</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase">الاشتراك السنوي SaaS</span>
            <div className="text-2xl font-black text-white font-mono">
              1,800 <span className="text-xs text-slate-400 font-normal">ر.س / سنوياً</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>✓ تكلفة دخول منخفضة للمتاجر الناشئة</li>
              <li>✓ نسخ احتياطي سحابي تلقائي مشفر</li>
              <li>✓ تحديثات دورية مجانية مستمرة</li>
              <li>✓ دعم فني مباشر عبر الهاتف والتحكم عن بعد</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
