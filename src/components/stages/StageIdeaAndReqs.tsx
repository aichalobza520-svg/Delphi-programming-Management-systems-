import React from 'react';
import { Target, CheckCircle2, AlertTriangle, Lightbulb, Shield, Zap, FileText } from 'lucide-react';
import { ProjectData } from '../../types/project';

interface Props {
  project: ProjectData;
}

export const StageIdeaAndReqs: React.FC<Props> = ({ project }) => {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/80 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              المرحلة 1 و 2 : التحليل الهندسي الشامل والمتطلبات
            </span>
            <h2 className="text-2xl font-black text-white mt-3">
              {project.name}
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Target className="w-8 h-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700/60">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">الفئة المستهدفة</span>
            <span className="text-sm font-semibold text-slate-100">{project.targetAudience}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">بيئة التطوير واللغة</span>
            <span className="text-sm font-semibold text-amber-400 font-mono">Delphi 12.1 Athens + Object Pascal</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">محرك قواعد البيانات</span>
            <span className="text-sm font-semibold text-emerald-400 font-mono">MS SQL Server 2022 + FireDAC</span>
          </div>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            <h3>المشكلة التي يحلها البرنامج</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
            {project.requirements.problemStatement}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Lightbulb className="w-5 h-5" />
            <h3>نطاق الإصدار الأول (MVP Scope)</h3>
          </div>
          <div className="space-y-2">
            {project.requirements.mvpScope.map((scope, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{scope}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3>المتطلبات الوظيفية وغير الوظيفية (PRD Matrix)</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Functional Requirements */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              المتطلبات الوظيفية (Functional)
            </h4>
            <div className="space-y-2">
              {project.requirements.functional.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="font-mono text-indigo-400 font-bold shrink-0">F-{idx + 1}</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Functional Requirements */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              المتطلبات غير الوظيفية والأمنية (Non-Functional)
            </h4>
            <div className="space-y-2">
              {project.requirements.nonFunctional.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="font-mono text-emerald-400 font-bold shrink-0">NF-{idx + 1}</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Acceptance Criteria */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          معايير قبول المشروع وتسليمه (Acceptance Criteria)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.requirements.acceptanceCriteria.map((crit, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-200/90 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              <span>{crit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
