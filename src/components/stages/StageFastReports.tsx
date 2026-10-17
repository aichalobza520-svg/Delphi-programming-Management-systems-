import React, { useState } from 'react';
import { Printer, FileDown, QrCode, Sparkles, Check, Code, Eye } from 'lucide-react';
import { ProjectData } from '../../types/project';

interface Props {
  project: ProjectData;
}

export const StageFastReports: React.FC<Props> = ({ project }) => {
  const [activeView, setActiveView] = useState<'preview' | 'fr3'>('preview');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const report = project.fastReports[0];

  const handleSimulateExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
              المرحلة 10 : التقارير والطباعة والتصدير (FastReport & ZATCA QR)
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              تصميم قوالب FastReport 2026 ودعم الفاتورة الضريبية وتصدير PDF
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              ربط القوالب بـ TfrxDBDataset، حساب التفقيط التلقائي، تضمين الخطوط العربية السليمة، والباركود ثنائي الأبعاد QR Code.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <Printer className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeView === 'preview'
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>معاينة الفاتورة الضريبية</span>
          </button>
          <button
            onClick={() => setActiveView('fr3')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeView === 'fr3'
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>كود القالب (.fr3 XML)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isExporting ? 'جاري تصدير PDF...' : 'تصدير إلى PDF (frxExportPDF)'}</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>تم توليد وحفظ ملف PDF عالي الدقة في مسار C:\RayadaERP\Exports\TaxInvoice_1001.pdf بنجاح!</span>
        </div>
      )}

      {/* Report Preview */}
      {activeView === 'preview' ? (
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-300 font-sans space-y-6">
          
          {/* Invoice Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
            <div>
              <h3 className="text-xl font-black text-slate-900">شركة ريادة للحلول البرمجية المحدودة</h3>
              <p className="text-xs text-slate-600 mt-1">الرياض - طريق الملك فهد | سجل تجاري: 1010998877</p>
              <p className="text-xs text-slate-600">الرقم الضريبي VAT: <strong className="font-mono text-slate-900">310000000000003</strong></p>
            </div>

            <div className="text-left flex flex-col items-end">
              {/* Simulated ZATCA QR Code */}
              <div className="w-20 h-20 bg-slate-950 p-1.5 rounded-lg flex items-center justify-center text-white">
                <QrCode className="w-16 h-16" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1">ZATCA Compliant QR</span>
            </div>
          </div>

          <div className="text-center py-2 bg-slate-100 rounded-lg border border-slate-200">
            <h4 className="text-base font-bold text-slate-800">فاتورة ضريبية رسمية / TAX INVOICE</h4>
          </div>

          {/* Customer & Invoice Meta */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-500">رقم الفاتورة: <strong className="text-slate-900 font-mono">INV-202610-0001</strong></p>
              <p className="text-slate-500 mt-1">تاريخ الإصدار: <strong className="text-slate-900 font-mono">2026-10-16 14:30</strong></p>
              <p className="text-slate-500 mt-1">طريقة الدفع: <strong className="text-slate-900">نقدي Cash</strong></p>
            </div>
            <div>
              <p className="text-slate-500">اسم العميل: <strong className="text-slate-900">شركة التقنية المتقدمة المحدودة</strong></p>
              <p className="text-slate-500 mt-1">الرقم الضريبي للعميل: <strong className="text-slate-900 font-mono">310234567800003</strong></p>
              <p className="text-slate-500 mt-1">العنوان: <strong className="text-slate-900">الرياض - حي العليا</strong></p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-right text-xs border border-slate-300">
            <thead>
              <tr className="bg-slate-800 text-white font-semibold">
                <th className="py-2 px-3 border border-slate-700">#</th>
                <th className="py-2 px-3 border border-slate-700">بيان الصنف</th>
                <th className="py-2 px-3 border border-slate-700 text-center">الكمية</th>
                <th className="py-2 px-3 border border-slate-700">سعر الوحدة</th>
                <th className="py-2 px-3 border border-slate-700">الضريبة 15%</th>
                <th className="py-2 px-3 border border-slate-700">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              <tr>
                <td className="py-2 px-3 border border-slate-300 font-mono">1</td>
                <td className="py-2 px-3 border border-slate-300 font-medium">جهاز حاسوب محمول Core i7</td>
                <td className="py-2 px-3 border border-slate-300 text-center font-mono">1</td>
                <td className="py-2 px-3 border border-slate-300 font-mono">3,000.00 ر.س</td>
                <td className="py-2 px-3 border border-slate-300 font-mono">450.00 ر.س</td>
                <td className="py-2 px-3 border border-slate-300 font-mono font-bold">3,450.00 ر.س</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-slate-300 font-mono">2</td>
                <td className="py-2 px-3 border border-slate-300 font-medium">طابعة فواتير حرارية ESC/POS USB/LAN</td>
                <td className="py-2 px-3 border border-slate-300 text-center font-mono">1</td>
                <td className="py-2 px-3 border border-slate-300 font-mono">426.09 ر.س</td>
                <td className="py-2 px-3 border border-slate-300 font-mono">63.91 ر.س</td>
                <td className="py-2 px-3 border border-slate-300 font-mono font-bold">490.00 ر.س</td>
              </tr>
            </tbody>
          </table>

          {/* Totals Summary */}
          <div className="flex justify-end">
            <div className="w-72 space-y-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>المجموع الخاضع للضريبة:</span>
                <span className="font-mono font-bold text-slate-900">3,426.09 ر.س</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span className="font-mono font-bold text-slate-900">513.91 ر.س</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-950 border-t border-slate-300 pt-2">
                <span>الإجمالي شامل الضريبة:</span>
                <span className="font-mono text-emerald-700">3,940.00 ر.س</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="border-t border-slate-200 pt-3 text-center text-[10px] text-slate-500">
            تم إصدار هذه الفاتورة إلكترونياً عبر منظومة ريادة ERP بواسطة Delphi 12.1 Athens ومحرك FastReport VCL.
          </div>

        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-purple-300 font-mono">
              FastReport VCL Template Definition (.fr3 XML)
            </div>
            <pre className="p-4 text-xs font-mono text-purple-200/90 leading-relaxed overflow-x-auto max-h-96 select-text">
              {report.fr3Definition}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
