import React, { useState } from 'react';
import { 
  Download, 
  Users, 
  Sparkles, 
  Code2, 
  Database, 
  ShieldCheck, 
  CheckCircle2,
  Cpu,
  Layers,
  Globe,
  Settings
} from 'lucide-react';
import { ProjectData } from '../types/project';
import { generateProjectZip } from '../utils/zipGenerator';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  project: ProjectData;
  onOpenCustomModal: () => void;
  onOpenSettingsModal: () => void;
  activeStage: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  project, 
  onOpenCustomModal, 
  onOpenSettingsModal,
  activeStage 
}) => {
  const { lang, toggleLang, t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      const blob = await generateProjectZip(project);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.id}-delphi12-sqlserver-project.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const teamRoles = [
    { 
      title: 'Senior Software Architect', 
      name: lang === 'ar' ? 'رئيس مهندسي البرمجيات' : 'Lead Software Architect', 
      icon: Layers, 
      desc: lang === 'ar' ? 'تصميم المعمارية متعددة الطبقات N-Tier ومبادئ SOLID' : 'N-Tier Layered Architecture & SOLID Design' 
    },
    { 
      title: 'Delphi 12.1 & Object Pascal Expert', 
      name: lang === 'ar' ? 'خبير دلفي وأوبجكت باسكال' : 'Delphi 12.1 Senior Expert', 
      icon: Code2, 
      desc: lang === 'ar' ? 'بناء الـ Units و VCL و DataModules وإدارة الذاكرة' : 'Units, VCL Forms, DataModules & Memory Management' 
    },
    { 
      title: 'MS SQL Server Database Administrator', 
      name: lang === 'ar' ? 'خبير قواعد بيانات SQL Server' : 'SQL Server DBA & Architect', 
      icon: Database, 
      desc: lang === 'ar' ? 'تصميم الجداول، Stored Procedures، الفهارس، والنسخ الاحتياطي' : 'Tables, Stored Procedures, Indexes & Backup Plans' 
    },
    { 
      title: 'FireDAC & Connectivity Lead', 
      name: lang === 'ar' ? 'مهندس اتصالات FireDAC' : 'FireDAC Connectivity Lead', 
      icon: Cpu, 
      desc: lang === 'ar' ? 'ضبط الاتصال وتجمع الاتصالات Connection Pooling والمعاملات' : 'Connection Pooling, Recovery & ACID Transactions' 
    },
    { 
      title: 'Information Security & RBAC', 
      name: lang === 'ar' ? 'خبير أمن المعلومات والتشفير' : 'Security & RBAC Specialist', 
      icon: ShieldCheck, 
      desc: lang === 'ar' ? 'تشفير كلمات المرور Argon2id والصلاحيات والـ Audit Trail' : 'Argon2id Hashing, Permissions & Audit Logging' 
    },
    { 
      title: 'QA & Test Automation Lead', 
      name: lang === 'ar' ? 'مهندس جودة واختبارات الأنظمة' : 'QA & Test Lead', 
      icon: CheckCircle2, 
      desc: lang === 'ar' ? 'إعداد مصفوفة الاختبارات وحالات الفحص الشاملة' : 'Test Matrix, Regression & Automated Validation' 
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Project Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-black text-xl border border-amber-400/30">
              D12
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                  {t('engineBadge')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {t('firedacBadge')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-mono">
                  {lang.toUpperCase()}
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                {lang === 'ar' ? project.name : project.nameEn}
              </h1>
            </div>
          </div>

          {/* Actions & Team */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-bold border border-slate-700 transition"
              title={lang === 'ar' ? 'التحويل إلى اللغة الإنجليزية (Switch to English)' : 'التحويل إلى اللغة العربية (Switch to Arabic)'}
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Settings & Localization Modal Trigger */}
            <button
              onClick={onOpenSettingsModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition"
              title={t('settingsBtn')}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">{t('settingsBtn')}</span>
            </button>

            <button
              onClick={() => setShowTeamModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition"
              title={t('devTeamBtn')}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">{t('devTeamBtn')}</span>
            </button>

            <button
              onClick={onOpenCustomModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>{t('newIdeaBtn')}</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? t('downloadingZip') : t('downloadZipBtn')}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'ar' ? 'فريق التطوير الهندسي المتكامل' : 'Full-Stack Software Engineering Team'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'ar' ? '12 دوراً تخصصياً لإنتاج نظام مؤسسي بمستوى الإنتاج والتوزيع التجاري' : '12 specialized roles for commercial enterprise grade production'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowTeamModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 max-h-[60vh] overflow-y-auto pl-1">
              {teamRoles.map((role, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-700/50 text-amber-400 mt-1">
                    <role.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{role.name}</h4>
                    <span className="text-[11px] text-amber-400/80 font-mono block">{role.title}</span>
                    <p className="text-xs text-slate-400 mt-1">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowTeamModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
