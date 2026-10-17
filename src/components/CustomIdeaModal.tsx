import React, { useState } from 'react';
import { Sparkles, Building2, Stethoscope, ShoppingBag, Home } from 'lucide-react';
import { ProjectData } from '../types/project';
import { RAYADA_ERP } from '../data/blueprints';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyProject: (project: ProjectData) => void;
}

export const CustomIdeaModal: React.FC<Props> = ({ isOpen, onClose, onApplyProject }) => {
  const { lang } = useLanguage();
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState(lang === 'ar' ? 'شركات ومؤسسات تجارية' : 'Commercial Enterprises & Wholesalers');
  const [selectedTemplate, setSelectedTemplate] = useState<'erp' | 'clinic' | 'pos' | 'realestate' | 'custom'>('erp');

  if (!isOpen) return null;

  const templates = [
    {
      id: 'erp',
      name: lang === 'ar' ? 'ريادة ERP (المنظومة المحاسبية)' : 'Rayada ERP (Core Enterprise Suite)',
      icon: Building2,
      desc: lang === 'ar' ? 'المبيعات، المخازن، الفواتير الضريبية، القيود المحاسبية، والعملاء' : 'Sales, Inventory, VAT Invoices, General Ledger, Accounts',
      defaultTitle: lang === 'ar' ? 'ريادة ERP - Rayada Enterprise 2026' : 'Rayada ERP Suite 2026',
      defaultDesc: lang === 'ar' 
        ? 'نظام متكامل لتخطيط الموارد وإدارة المخزون والمبيعات والفواتير الإلكترونية ZATCA Phase 2 للشركات التجارية والمتوسطة.'
        : 'Enterprise Resource Planning system for inventory, sales, ZATCA e-invoicing and accounting for medium to large enterprises.'
    },
    {
      id: 'clinic',
      name: lang === 'ar' ? 'شفا كلينك (إدارة العيادات والمراكز)' : 'Shifa Clinic CRM (Healthcare)',
      icon: Stethoscope,
      desc: lang === 'ar' ? 'الملفات الطبية، المواعيد، الفواتير والتأمين الصحي، والسجلات الإلكترونية EMR' : 'EMR, Appointments, Patients History, Insurance Billing',
      defaultTitle: lang === 'ar' ? 'شفا كلينك CRM - Shifa Medical Suite' : 'Shifa Medical Clinic Suite 2026',
      defaultDesc: lang === 'ar' 
        ? 'منظومة إدارة المراكز الطبية والعيادات التخصصية، تنظيم حجوزات المرضى، السجلات الطبية، والربط مع شركات التأمين الصحي.'
        : 'Medical clinic management suite with appointments, patient electronic medical records (EMR), and insurance claims.'
    },
    {
      id: 'pos',
      name: lang === 'ar' ? 'زاد POS (نقاط البيع السريعة)' : 'Zaad Retail POS (Point of Sale)',
      icon: ShoppingBag,
      desc: lang === 'ar' ? 'طابعات الفواتير الحرارية ESC/POS، الباركود، ورديات الكاشير، والبيع السريع' : 'Thermal ESC/POS Printers, Barcodes, Cashier Shifts, Quick Checkout',
      defaultTitle: lang === 'ar' ? 'زاد POS - Zaad Retail & Fast POS' : 'Zaad High-Speed Retail POS',
      defaultDesc: lang === 'ar' 
        ? 'برنامج نقاط بيع فائق السرعة لصالات التجزئة والمطاعم مع دعم كامل للطباعة الحرارية المباشرة وإغلاق الورديات اليومية.'
        : 'Ultra-responsive point of sale software with direct ESC/POS thermal printing and shift balancing.'
    },
    {
      id: 'realestate',
      name: lang === 'ar' ? 'أفق العقاري (إدارة الأملاك والعقود)' : 'Ofuq Real Estate (Property CRM)',
      icon: Home,
      desc: lang === 'ar' ? 'عقود الإيجار، تحصيل الشيكات، متابعة الصيانة، وتنبيهات الإخلاء' : 'Leasing Contracts, Cheque Collections, Maintenance, Alerts',
      defaultTitle: lang === 'ar' ? 'أفق لإدارة الأملاك - Ofuq Real Estate' : 'Ofuq Property Management Suite',
      defaultDesc: lang === 'ar' 
        ? 'نظام إدارة العقارات والمجمعات التجارية، أرشفة العقود، تتبع الأقساط والشيكات وتنبيهات الصيانة الدورية.'
        : 'Comprehensive real estate management system with rental contract archiving, installments, and tenant notices.'
    }
  ];

  const handleSelectTemplate = (t: typeof templates[0]) => {
    setSelectedTemplate(t.id as any);
    setIdeaTitle(t.defaultTitle);
    setIdeaDescription(t.defaultDesc);
  };

  const handleGenerate = () => {
    if (selectedTemplate === 'erp' || !ideaTitle) {
      onApplyProject(RAYADA_ERP);
    } else {
      const customProject: ProjectData = {
        ...RAYADA_ERP,
        id: `custom-${Date.now()}`,
        name: ideaTitle || 'مشروع Delphi 12.1 المخصص',
        nameEn: ideaTitle.replace(/[^a-zA-Z0-9 ]/g, '') || 'Delphi Enterprise App',
        tagline: ideaDescription || RAYADA_ERP.tagline,
        targetAudience: targetAudience,
        requirements: {
          ...RAYADA_ERP.requirements,
          problemStatement: ideaDescription || RAYADA_ERP.requirements.problemStatement
        }
      };
      onApplyProject(customProject);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 font-sans">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative space-y-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'ar' ? 'توليد وهندسة فكرة جديدة (Delphi 12.1 + SQL Server)' : 'Generate & Architect New Project (Delphi 12.1 + SQL Server)'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'اختر قالباً مؤسسياً جاهزاً أو أدخل فكرة مشروعك ليتم هندستها بالكامل' : 'Select a ready enterprise archetype or enter your custom requirements'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            ✕
          </button>
        </div>

        {/* Template Selectors */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 block">
            {lang === 'ar' ? 'نماذج مؤسسية جاهزة سريعة التحميل:' : 'Pre-Engineered Enterprise Blueprints:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {templates.map((t) => {
              const isSelected = selectedTemplate === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTemplate(t)}
                  className={`p-3 rounded-xl border text-right transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-bold block">{t.name}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{t.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input Fields */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              {lang === 'ar' ? 'اسم البرنامج المقترح' : 'Proposed Application Name'}
            </label>
            <input
              type="text"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              placeholder={lang === 'ar' ? 'مثال: ريادة ERP، شفا كلينك، زاد للمبيعات...' : 'e.g. ApexERP, Shifa Clinic, QuickPOS...'}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              {lang === 'ar' ? 'فكرة البرنامج بالتفصيل والوظائف المطلوبة' : 'Program Concept & Functional Requirements'}
            </label>
            <textarea
              rows={3}
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              placeholder={lang === 'ar' ? 'اشرح فكرة البرنامج، والعمليات الأساسية التي ترغب في تضمينها...' : 'Describe the workflow, key modules, target customers...'}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              {lang === 'ar' ? 'الفئة المستهدفة' : 'Target Industry / Audience'}
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {lang === 'ar' ? 'سيتم توليد كود Object Pascal و SQL Server كامل للمشروع.' : 'Generates complete Object Pascal and SQL Server source code.'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleGenerate}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ar' ? 'توليد وتطبيق المشروع الهندسي' : 'Generate & Apply Project'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
