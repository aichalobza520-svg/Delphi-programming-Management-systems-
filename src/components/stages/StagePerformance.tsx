import React from 'react';
import { Gauge, Zap, Database, Cpu, CheckCircle, ShieldCheck, Activity } from 'lucide-react';

export const StagePerformance: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
              المرحلة 12 : تحسين الأداء وإدارة الذاكرة (Performance Tuning & Zero Leaks)
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              منع تسرب الذاكرة بـ FastMM5، ضبط FireDAC، وفهارس Covering Indexes
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تحقيق استجابة فورية أقل من 50 مللي ثانية للعمليات الميدانية وضمان استقرار البرنامج على مدار 24/7 دون استهلاك مفرط للـ RAM.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Gauge className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* 4 Pillars of Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar 1: FastMM5 */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Activity className="w-4 h-4" />
            <h3>1. مراقبة تسرب الذاكرة (FastMM5 Integration)</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            تم دمج مدير الذاكرة المتقدم <strong>FastMM5</strong> كأول وحدة في ملف <code className="text-amber-300 font-mono">RayadaERP.dpr</code> لاكتشاف أي كائن لم يتم تحريره بالذاكرة فور إغلاق التطبيق.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
            program RayadaERP;<br/>
            uses<br/>
            &nbsp;&nbsp;FastMM5, // يجب أن تكون أول وحدة لمنع أي تسرب للذاكرة<br/>
            &nbsp;&nbsp;Vcl.Forms,<br/>
            &nbsp;&nbsp;dmMain in 'Data\dmMain.pas';...
          </div>
        </div>

        {/* Pillar 2: FireDAC Tuning */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <h3>2. ضبط خيارات FireDAC FetchOptions</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            تجنب جلب كامل الجدول عند فتح الشاشات الكبيرة عبر تفعيل الجلب عند الطلب والتنقل السلس:
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
            FDConnection.FetchOptions.Mode := fmOnDemand;<br/>
            FDConnection.FetchOptions.RowsetSize := 50;<br/>
            FDConnection.ResourceOptions.AutoReconnect := True;<br/>
            FDConnection.FormatOptions.StrsEmpty2Null := True;
          </div>
        </div>

        {/* Pillar 3: SQL Covering Indexes */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Database className="w-4 h-4" />
            <h3>3. الفهارس المغطاة (Covering Indexes)</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            إلغاء عمليات Key Lookup البطيئة عبر تضمين الأعمدة المستعلم عنها في الفهرس مباشرة:
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
            CREATE NONCLUSTERED INDEX IX_SalInvoices_QuickSearch<br/>
            ON dbo.SalInvoices (InvoiceDate DESC, CustomerID)<br/>
            INCLUDE (InvoiceNumber, GrandTotal, TaxAmount, Status);
          </div>
        </div>

        {/* Pillar 4: Non-blocking UI / PPL */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <h3>4. المعالجة في الخلفية وعدم تجميد الواجهة (PPL)</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            استخدام مكتبة المعالجة المتوازية (Parallel Programming Library) للعمليات الثقيلة كالتقارير الشهرية أو رفع الفواتير السحابية:
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300">
            TTask.Run(procedure<br/>
            begin<br/>
            &nbsp;&nbsp;// معالجة التقرير في خيط منفصل<br/>
            &nbsp;&nbsp;TThread.Synchronize(nil, procedure<br/>
            &nbsp;&nbsp;begin<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;UpdateUIProgressBar;<br/>
            &nbsp;&nbsp;end);<br/>
            end);
          </div>
        </div>

      </div>

      {/* Performance Checklist Card */}
      <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
        <h4 className="text-xs font-bold text-white flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          قائمة التحقق من الأداء قبل اعتماد الإصدار التجاري:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>استهلاك الذاكرة لا يتجاوز 75 MB في وضع الاستقرار.</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>زمن الاستعلام عن 100,000 فاتورة أقل من 150ms بفضل الفهارس.</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Zero Memory Leaks مؤكد من تقرير FastMM5 النهائي.</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>إغلاق جميع معاملات Transactions سواء بالـ Commit أو Rollback.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
