import React, { useState } from 'react';
import { Code2, Folder, FileCode, Copy, Check, ShieldCheck, Terminal, Cpu, Info } from 'lucide-react';
import { ProjectData, DelphiUnit } from '../../types/project';

interface Props {
  project: ProjectData;
}

export const StageDelphiCode: React.FC<Props> = ({ project }) => {
  const [selectedUnit, setSelectedUnit] = useState<DelphiUnit>(
    project.delphiUnits.find(u => u.fileName.includes('dmMain.pas')) || project.delphiUnits[0]
  );
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedUnit.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              المراحل 5 و 6 و 8 : مشروع Delphi 12.1 Athens & FireDAC Core
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              الأكواد المصدرية الكاملة (Object Pascal Units & DataModule)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تنظيم الوحدات، إدارة الاتصال والمعاملات المالية مع SQL Server، عزل الاستعلامات، وتحرير الذاكرة بدقة لمنع أي تسرب (Zero Memory Leaks).
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Code2 className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Code Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Unit List Tree (4 cols) */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-amber-400" />
              هيكل وحدات المشروع (Delphi Units)
            </span>
            <span className="font-mono text-slate-500 text-[11px]">{project.delphiUnits.length} ملفات</span>
          </div>

          <div className="space-y-1.5 max-h-[550px] overflow-y-auto">
            {project.delphiUnits.map((u) => {
              const isSelected = selectedUnit.fileName === u.fileName;
              return (
                <button
                  key={u.fileName}
                  onClick={() => setSelectedUnit(u)}
                  className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-right transition-all group ${
                    isSelected
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200'
                      : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold truncate block">
                        {u.fileName}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                        {u.layer}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {u.purpose}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Architecture Reminder */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ضوابط جودة الأكواد في Delphi 12.1</span>
            </div>
            <p className="leading-relaxed">
              تحرير الكائنات دائمًا داخل كتل <code className="text-amber-300 font-mono">try ... finally Free; end;</code>، وتمرير المعاملات بـ <code className="text-emerald-300 font-mono">ParamByName</code> لمنع حقن SQL.
            </p>
          </div>
        </div>

        {/* Code Content & Details (8 cols) */}
        <div className="lg:col-span-8 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col space-y-3">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">{selectedUnit.fileName}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  Unit: {selectedUnit.unitName}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedUnit.purpose}</p>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition self-end sm:self-auto"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'تم النسخ' : 'نسخ الكود الكامل'}</span>
            </button>
          </div>

          {/* Unit Code Editor Box */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex-1 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
              <span>Embarcadero Delphi 12.1 Athens | Object Pascal</span>
              <span className="text-emerald-400">Strict Compiler Compliant</span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto max-h-[460px] select-text">
              {selectedUnit.code}
            </pre>
          </div>

          {/* Technical Note */}
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong>مكان وضع الملف في Delphi:</strong> احفظ الملف في مسار المجلد المحدد بالاسم، وأضفه إلى المشروع عبر <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">Project -&gt; Add to Project (Shift+F11)</kbd>.
            </span>
          </div>

        </div>

      </div>

      {/* FireDAC Connection Deep Dive Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          هندسة اتصال FireDAC مع Microsoft SQL Server
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400">1. تجمع الاتصالات (Connection Pooling)</span>
            <p className="text-slate-400 leading-relaxed">
              تفعيل خاصية Pooling في FireDAC يسمح بإعادة استخدام المقابس الشبكية المفتوحة، مما يقلل زمن إنشاء الاتصال من 120ms إلى أقل من 2ms لكل طلب.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400">2. جلب البيانات عند الطلب (fmOnDemand)</span>
            <p className="text-slate-400 leading-relaxed">
              ضبط <code className="text-amber-300 font-mono">FetchOptions.Mode := fmOnDemand</code> و <code className="text-amber-300 font-mono">RowsetSize := 50</code> يمنع تحميل آلاف السجلات دفعة واحدة في ذاكرة RAM للعميل.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
            <span className="font-bold text-indigo-400">3. استعادة الاتصال التلقائي (AutoReconnect)</span>
            <p className="text-slate-400 leading-relaxed">
              ربط حدث <code className="text-indigo-300 font-mono">OnRecover</code> مع خيار <code className="text-indigo-300 font-mono">faRetry</code> يمنع انهيار البرنامج عند انقطاع Wi-Fi أو إعادة تشغيل خادم SQL Server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
