import React from 'react';
import { 
  FileSearch, 
  ListChecks, 
  Network, 
  Database, 
  Code2, 
  Cable, 
  Layout, 
  Cpu, 
  ShieldCheck, 
  Printer, 
  TestTube2, 
  Gauge, 
  PackageCheck, 
  BookOpen, 
  BadgePercent
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface StageItem {
  id: number;
  nameKey: string;
  defaultName: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'completed' | 'in-progress' | 'ready';
}

export const STAGES_CONFIG: StageItem[] = [
  { id: 1, nameKey: 'stage1', defaultName: 'تحليل الفكرة والمشكلة', icon: FileSearch, status: 'completed' },
  { id: 2, nameKey: 'stage2', defaultName: 'المتطلبات ومعايير القبول', icon: ListChecks, status: 'completed' },
  { id: 3, nameKey: 'stage3', defaultName: 'تصميم معمارية النظم', icon: Network, status: 'completed' },
  { id: 4, nameKey: 'stage4', defaultName: 'قاعدة بيانات SQL Server', icon: Database, status: 'completed' },
  { id: 5, nameKey: 'stage5', defaultName: 'هيكل مشروع Delphi 12.1', icon: Code2, status: 'completed' },
  { id: 6, nameKey: 'stage6', defaultName: 'إعداد اتصال FireDAC', icon: Cable, status: 'completed' },
  { id: 7, nameKey: 'stage7', defaultName: 'واجهات VCL وتجربة المستخدم', icon: Layout, status: 'completed' },
  { id: 8, nameKey: 'stage8', defaultName: 'برمجة منطق الأعمال Services', icon: Cpu, status: 'completed' },
  { id: 9, nameKey: 'stage9', defaultName: 'الأمان وحماية كلمات المرور', icon: ShieldCheck, status: 'completed' },
  { id: 10, nameKey: 'stage10', defaultName: 'التقارير والطباعة FastReport', icon: Printer, status: 'completed' },
  { id: 11, nameKey: 'stage11', defaultName: 'مصفوفة الاختبارات QA', icon: TestTube2, status: 'completed' },
  { id: 12, nameKey: 'stage12', defaultName: 'تحسين الأداء وضبط الذاكرة', icon: Gauge, status: 'completed' },
  { id: 13, nameKey: 'stage13', defaultName: 'تجهيز الإصدار وحزمة التثبيت', icon: PackageCheck, status: 'completed' },
  { id: 14, nameKey: 'stage14', defaultName: 'التوثيق الفني ونظام التعريب', icon: BookOpen, status: 'completed' },
  { id: 15, nameKey: 'stage15', defaultName: 'التسويق ونموذج التراخيص', icon: BadgePercent, status: 'completed' },
];

interface StageNavProps {
  currentStage: number;
  onSelectStage: (id: number) => void;
}

export const StageNav: React.FC<StageNavProps> = ({ currentStage, onSelectStage }) => {
  const { lang, t } = useLanguage();

  return (
    <aside className="w-80 bg-slate-900/60 border-l border-slate-800 flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {t('stagesTitle')}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            {t('stagesProgress')}
          </span>
        </div>
        <p className="text-xs text-slate-400">
          {t('stagesSubtitle')}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {STAGES_CONFIG.map((stage) => {
          const isActive = currentStage === stage.id;
          const Icon = stage.icon;
          const stageName = t(stage.nameKey) || stage.defaultName;
          const stageTag = lang === 'ar' ? `المرحلة ${stage.id}` : `Stage ${stage.id}`;

          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                lang === 'ar' ? 'text-right' : 'text-left'
              } ${
                isActive
                  ? 'bg-amber-500/15 border border-amber-500/30 text-white shadow-sm'
                  : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 group-hover:bg-slate-700 text-slate-400 group-hover:text-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-slate-500 group-hover:text-slate-400">
                      {stageTag}
                    </span>
                  </div>
                  <h4 className={`text-xs font-semibold ${isActive ? 'text-amber-300 font-bold' : ''}`}>
                    {stageName}
                  </h4>
                </div>
              </div>

              <div className="shrink-0">
                <span className="inline-flex w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="rounded-xl bg-slate-900/80 p-3 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{t('stageStatusActive')}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {t('stageStatusDesc')}
          </p>
        </div>
      </div>
    </aside>
  );
};
