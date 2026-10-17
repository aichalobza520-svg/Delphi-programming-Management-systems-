/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RAYADA_ERP } from './data/blueprints';
import { ProjectData } from './types/project';
import { Header } from './components/Header';
import { StageNav, STAGES_CONFIG } from './components/StageNav';
import { CustomIdeaModal } from './components/CustomIdeaModal';
import { SettingsModal } from './components/SettingsModal';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import { StageIdeaAndReqs } from './components/stages/StageIdeaAndReqs';
import { StageArchitecture } from './components/stages/StageArchitecture';
import { StageDatabase } from './components/stages/StageDatabase';
import { StageDelphiCode } from './components/stages/StageDelphiCode';
import { StageVCLUI } from './components/stages/StageVCLUI';
import { StageSecurity } from './components/stages/StageSecurity';
import { StageFastReports } from './components/stages/StageFastReports';
import { StageQA } from './components/stages/StageQA';
import { StagePerformance } from './components/stages/StagePerformance';
import { StageDeployment } from './components/stages/StageDeployment';
import { StageDocumentation } from './components/stages/StageDocumentation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [project, setProject] = useState<ProjectData>(RAYADA_ERP);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { lang, t, isRTL } = useLanguage();

  const handleNextStage = () => {
    setActiveStage((prev) => Math.min(15, prev + 1));
  };

  const handlePrevStage = () => {
    setActiveStage((prev) => Math.max(1, prev - 1));
  };

  const renderActiveStageComponent = () => {
    switch (activeStage) {
      case 1:
      case 2:
        return <StageIdeaAndReqs project={project} />;
      case 3:
        return <StageArchitecture project={project} />;
      case 4:
        return <StageDatabase project={project} />;
      case 5:
      case 6:
      case 8:
        return <StageDelphiCode project={project} />;
      case 7:
        return <StageVCLUI project={project} />;
      case 9:
        return <StageSecurity project={project} />;
      case 10:
        return <StageFastReports project={project} />;
      case 11:
        return <StageQA project={project} />;
      case 12:
        return <StagePerformance />;
      case 13:
      case 15:
        return <StageDeployment project={project} />;
      case 14:
        return <StageDocumentation project={project} />;
      default:
        return <StageIdeaAndReqs project={project} />;
    }
  };

  const currentStageConfig = STAGES_CONFIG.find((s) => s.id === activeStage) || STAGES_CONFIG[0];
  const currentStageName = t(currentStageConfig.nameKey) || currentStageConfig.defaultName;
  const stageTag = lang === 'ar' ? `المرحلة ${activeStage}` : `Stage ${activeStage}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Navigation */}
      <Header
        project={project}
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        activeStage={activeStage}
      />

      {/* Main Workspace: Left Content + Right Stage Stepper */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Main Stage Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Breadcrumb & Stage Status Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-amber-400 font-bold">{stageTag}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300 font-semibold">{currentStageName}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                {lang === 'ar' ? 'حالة المرحلة:' : 'Stage Status:'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('stageVerifiedBadge')}</span>
              </span>
            </div>
          </div>

          {/* Active Stage Body */}
          {renderActiveStageComponent()}

          {/* Bottom Navigation Controls */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={handlePrevStage}
              disabled={activeStage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t('prevStage')}</span>
            </button>

            <div className="text-xs text-slate-500 font-mono">
              {t('stageOf', { curr: activeStage, total: 15 })}
            </div>

            <button
              onClick={handleNextStage}
              disabled={activeStage === 15}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <span>{t('nextStage')}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </main>

        {/* Stage Stepper Navigation */}
        <StageNav
          currentStage={activeStage}
          onSelectStage={(id) => setActiveStage(id)}
        />

      </div>

      {/* Custom Idea Modal */}
      <CustomIdeaModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onApplyProject={(newProj) => {
          setProject(newProj);
          setActiveStage(1);
        }}
      />

      {/* Settings & Localization Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
