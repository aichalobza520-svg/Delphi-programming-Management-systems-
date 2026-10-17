import React, { useState } from 'react';
import { TestTube2, CheckCircle2, Play, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { ProjectData } from '../../types/project';

interface Props {
  project: ProjectData;
}

export const StageQA: React.FC<Props> = ({ project }) => {
  const [tests, setTests] = useState(project.qaTests);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const runAllTests = () => {
    setIsRunningAll(true);
    setTimeout(() => {
      setIsRunningAll(false);
      setTests(tests.map(t => ({ ...t, status: 'passed' })));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              المرحلة 11 : الاختبارات وضمان الجودة (QA & Test Execution Matrix)
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              مصفوفة حالات الاختبار: العمليات، الأمان، المعاملات، والتوافق
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              التحقق من صحة الاستعلامات، اختبار التراجع التلقائي Rollback، فحص ثغرات SQL Injection، وتكامل FastReport.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <TestTube2 className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">إجمالي حالات الاختبار المعتمدة:</span>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {tests.length} حالات اختبار
          </span>
        </div>

        <button
          onClick={runAllTests}
          disabled={isRunningAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 ${isRunningAll ? 'animate-spin' : ''}`} />
          <span>{isRunningAll ? 'جاري تشغيل الاختبارات الآلية...' : 'تشغيل مصفوفة الاختبارات الآلية الآن'}</span>
        </button>
      </div>

      {/* Test Matrix Cards */}
      <div className="space-y-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                  {test.id}
                </span>
                <h4 className="text-sm font-bold text-slate-100">{test.title}</h4>
              </div>

              <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Passed (ناجح)</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-500 block text-[11px] mb-1">الوحدة المستهدفة (Module):</span>
                <span className="font-mono text-indigo-300 font-semibold">{test.module}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-500 block text-[11px] mb-1">بيانات الإدخال (Input Data):</span>
                <span className="text-slate-300">{test.inputData}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-500 block text-[11px] mb-1">النتيجة المتوقعة والمعتمدة:</span>
                <span className="text-emerald-300">{test.expectedResult}</span>
              </div>
            </div>

            {/* Steps */}
            <div className="text-xs text-slate-400 pt-1 flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 font-semibold">خطوات الفحص:</span>
              {test.steps.map((s, idx) => (
                <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                  {idx + 1}. {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
