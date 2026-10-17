import React from 'react';
import { Layers, Network, ShieldCheck, FolderTree, ArrowDown, Cpu, Database, Layout, Sparkles } from 'lucide-react';
import { ProjectData } from '../../types/project';

interface Props {
  project: ProjectData;
}

export const StageArchitecture: React.FC<Props> = ({ project }) => {
  const folders = [
    { name: 'Forms/', desc: 'نماذج الواجهات VCL (.pas / .dfm) والشاشات الفرعية والـ Frames' },
    { name: 'Data/', desc: 'موديول البيانات dmMain.pas ومكونات الاتصال FireDAC والمكونات المشتركة' },
    { name: 'Models/', desc: 'كائنات DTOs وسجلات Object Pascal لتمثيل الفواتير والأصناف والعملاء' },
    { name: 'Services/', desc: 'منطق الأعمال والتحقق من القواعد وحساب الضرائب والخصومات' },
    { name: 'Repositories/', desc: 'طبقة الوصول لقواعد البيانات والتعامل الآمن مع TFDQuery' },
    { name: 'Security/', desc: 'تشفير كلمات المرور Argon2id وإدارة الصلاحيات RBAC وسجل التدقيق' },
    { name: 'Reports/', desc: 'قوالب FastReport (.fr3) ووحدات التصدير لـ PDF والطباعة' },
    { name: 'Config/', desc: 'ملفات الإعدادات المشفرة ومحددات الاتصال Database.ini' },
    { name: 'Tests/', desc: 'وحدات الاختبارات وضمان الجودة وحالات التحقق الآلي' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
              المرحلة 3 : معمارية النظم متعددة الطبقات (N-Tier Architecture)
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              التصميم الهيكلي لمشروع Delphi 12.1 وقواعد بيانات SQL Server
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              فصل كامل بين واجهات المستخدم، ومنطق الأعمال، والوصول لقواعد البيانات، وفق مبادئ SOLID و Separation of Concerns.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Network className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Interactive Visual Layers Diagram */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          مخطط تدفق البيانات بين الطبقات (Data Flow & Layer Hierarchy)
        </h3>

        <div className="space-y-3 max-w-4xl mx-auto py-2">
          
          {/* Layer 1: UI */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-blue-950/40 border border-blue-500/30 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-300">1. طبقة العرض والواجهات (Presentation Layer - VCL)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Forms / Frames: frmMain, frmLogin, frmInvoiceEdit (تدعم RTL، ثيمات Windows 11 الحديثة، اختصارات F-Keys)
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Forms/*.pas
              </span>
            </div>
          </div>

          <div className="flex justify-center text-slate-500 my-1">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Layer 2: Business Logic */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 border border-indigo-500/30 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-indigo-300">2. طبقة منطق الأعمال والخدمات (Business & Services Layer)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    TInvoiceService, TStockService: التحقق من صحة المدخلات، حساب ضريبة القيمة المضافة 15%، فحص سقف الائتمان
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Services/*.pas
              </span>
            </div>
          </div>

          <div className="flex justify-center text-slate-500 my-1">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 3: Repositories */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-300">3. طبقة المستودعات والوصول للبيانات (Repository & Unit of Work)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    TInvoiceRepository, TUserRepository: استعلامات ذات معاملات Parameterized وآمنة تماماً ضد الحقن
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Repositories/*.pas
              </span>
            </div>
          </div>

          <div className="flex justify-center text-slate-500 my-1">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 4: DataModule / FireDAC */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">4. موديول الاتصال المركزي (FireDAC Engine & Transactions)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    TdmData (dmMain.pas): TFDConnection, TFDPhysMSSQLDriverLink, إدارة المعاملات المالية واستعادة الاتصال
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Data/dmMain.pas
              </span>
            </div>
          </div>

          <div className="flex justify-center text-slate-500 my-1">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 5: SQL Server */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-900 to-red-950/40 border border-red-500/30 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-300">5. محرك قاعدة البيانات (Microsoft SQL Server 2022)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ACID Transactions, Stored Procedures, Covering Indexes, Collation: Arabic_100_CI_AS_SC_UTF8, Audit Log
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                Port 1433 / TCP-IP
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Directory & Unit Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <FolderTree className="w-4 h-4 text-amber-400" />
            <h3>تنظيم المجلدات والوحدات (Project Directory Layout)</h3>
          </div>
          <div className="space-y-2">
            {folders.map((f, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 flex items-start gap-3">
                <span className="font-mono text-xs text-amber-400 font-bold shrink-0">{f.name}</span>
                <span className="text-xs text-slate-300">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Principles */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3>قواعد التصميم ومعايير الجودة المطبقة</h3>
          </div>
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
              <span className="font-bold text-emerald-400 block">Separation of Concerns (SoC)</span>
              <p className="text-slate-400">عزل شاشات VCL تماماً عن أوامر SQL، وعدم كتابة أي استعلامات مباشرة داخل أحداث النقر للأزرار (Button.OnClick).</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
              <span className="font-bold text-indigo-400 block">Centralized FireDAC DataModule</span>
              <p className="text-slate-400">إدارة اتصال واحد موثوق يخدم كامل البرنامج، مع دعم خاصية إعادة المحاولة التلقائية (AutoReconnect) لمعالجة انقطاع الشبكة المؤقت.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1">
              <span className="font-bold text-amber-400 block">Strong Typing & DTO Records</span>
              <p className="text-slate-400">نقل البيانات بين النماذج والخدمات عبر كائنات وسجلات Pascal محددة النوع لضمان الأمان أثناء التجميع ومنع أخطاء وقت التشغيل.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
