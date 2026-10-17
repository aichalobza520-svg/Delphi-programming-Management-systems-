import React, { useState } from 'react';
import { Database, Table, Key, Copy, Check, Play, Terminal, Sparkles, ShieldAlert } from 'lucide-react';
import { ProjectData, DatabaseTable } from '../../types/project';

interface Props {
  project: ProjectData;
}

export const StageDatabase: React.FC<Props> = ({ project }) => {
  const [selectedTable, setSelectedTable] = useState<DatabaseTable>(project.tables[2] || project.tables[0]);
  const [activeSqlTab, setActiveSqlTab] = useState<'tables' | 'db' | 'sp' | 'views' | 'seeds' | 'backup'>('tables');
  const [copied, setCopied] = useState(false);
  
  // Interactive SQL Runner Simulation
  const [queryInput, setQueryInput] = useState('SELECT TOP 10 ProductID, ItemCode, ItemNameAr, SellingPrice, CurrentStock FROM dbo.InvProducts;');
  const [queryOutput, setQueryOutput] = useState<any[]>([
    { ProductID: 1, ItemCode: 'PRD-1001', ItemNameAr: 'جهاز حاسوب محمول Core i7', SellingPrice: '3,450.00 ر.س', CurrentStock: '25.000' },
    { ProductID: 2, ItemCode: 'PRD-1002', ItemNameAr: 'طابعة فواتير حرارية ESC/POS USB/LAN', SellingPrice: '490.00 ر.س', CurrentStock: '40.000' },
    { ProductID: 3, ItemCode: 'PRD-1003', ItemNameAr: 'قارئ باركود لاسلكي 2D QR Code', SellingPrice: '260.00 ر.س', CurrentStock: '60.000' },
    { ProductID: 4, ItemCode: 'PRD-1004', ItemNameAr: 'ورق طابعات A4 كرتون 5 رزم', SellingPrice: '115.00 ر.س', CurrentStock: '150.000' }
  ]);
  const [isRunningQuery, setIsRunningQuery] = useState(false);

  const getSqlText = () => {
    switch (activeSqlTab) {
      case 'db': return project.sqlScripts.createDatabase;
      case 'tables': return project.sqlScripts.createTables;
      case 'sp': return project.sqlScripts.storedProcedures;
      case 'views': return project.sqlScripts.viewsAndIndexes;
      case 'seeds': return project.sqlScripts.seedData;
      case 'backup': return project.sqlScripts.backupAndRestore;
      default: return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSqlText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulatedQuery = () => {
    setIsRunningQuery(true);
    setTimeout(() => {
      setIsRunningQuery(false);
      if (queryInput.toLowerCase().includes('invoices') || queryInput.toLowerCase().includes('vw_sal')) {
        setQueryOutput([
          { InvoiceID: 1001, InvoiceNumber: 'INV-202610-0001', CustomerName: 'شركة التقنية المتقدمة', GrandTotal: '3,940.00 ر.س', Status: 'معتمدة' },
          { InvoiceID: 1002, InvoiceNumber: 'INV-202610-0002', CustomerName: 'مؤسسة النور للتجارة', GrandTotal: '820.00 ر.س', Status: 'معتمدة' }
        ]);
      } else if (queryInput.toLowerCase().includes('users') || queryInput.toLowerCase().includes('secusers')) {
        setQueryOutput([
          { UserID: 1, Username: 'admin', FullName: 'مدير المنظومة الافتراضي', Role: 'ADMIN', IsActive: 'True' }
        ]);
      } else {
        setQueryOutput([
          { ProductID: 1, ItemCode: 'PRD-1001', ItemNameAr: 'جهاز حاسوب محمول Core i7', SellingPrice: '3,450.00 ر.س', CurrentStock: '25.000' },
          { ProductID: 2, ItemCode: 'PRD-1002', ItemNameAr: 'طابعة فواتير حرارية ESC/POS USB/LAN', SellingPrice: '490.00 ر.س', CurrentStock: '40.000' }
        ]);
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              المرحلة 4 : تصميم قاعدة بيانات Microsoft SQL Server 2022
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              مخطط الجداول، العلاقات، الإجراءات المخزنة، وفهارس الأداء
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تطبيع البيانات (3NF)، ترميز موحد عربي UTF-8، حماية المعاملات بـ ACID، وسكربتات قابلة للتشغيل المباشر داخل SSMS.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Database className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Tables Explorer */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Table className="w-4 h-4 text-emerald-400" />
            استعراض جداول النظام والمفاتيح الأساسية والأجنبية
          </h3>
          <span className="text-xs text-slate-400">
            إجمالي الجداول المعتمدة: {project.tables.length}
          </span>
        </div>

        {/* Table Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {project.tables.map((table) => {
            const isSelected = selectedTable.name === table.name;
            return (
              <button
                key={table.name}
                onClick={() => setSelectedTable(table)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                }`}
              >
                <Table className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono font-bold">{table.name}</span>
                <span className="text-[11px] text-slate-400">({table.arabicName})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Table Details */}
        {selectedTable && (
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 mt-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="font-mono text-emerald-400">{selectedTable.name}</span>
                  <span className="text-slate-400 font-normal">| {selectedTable.arabicName}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">{selectedTable.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedTable.indexes.map((idx, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    ⚡ {idx}
                  </span>
                ))}
              </div>
            </div>

            {/* Column Matrix */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 px-3 font-semibold">اسم الحقل (Column)</th>
                    <th className="py-2 px-3 font-semibold">النوع (Type)</th>
                    <th className="py-2 px-3 font-semibold">المفاتيح والقيود</th>
                    <th className="py-2 px-3 font-semibold">القيمة الافتراضية</th>
                    <th className="py-2 px-3 font-semibold">الوصف والدور الوظيفي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {selectedTable.columns.map((col, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-semibold text-slate-100 flex items-center gap-1.5">
                        {col.isPrimary && <Key className="w-3.5 h-3.5 text-amber-400" />}
                        {col.isForeign && <span className="text-indigo-400 font-bold text-[10px]">FK</span>}
                        <span>{col.name}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-emerald-400">{col.type}</td>
                      <td className="py-2.5 px-3">
                        {col.isPrimary && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            Primary Key
                          </span>
                        )}
                        {col.isForeign && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                            &rarr; {col.references}
                          </span>
                        )}
                        {!col.isPrimary && !col.isForeign && (
                          <span className="text-slate-500 text-[11px]">{col.isNullable === false ? 'NOT NULL' : 'NULL'}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{col.defaultVal || '-'}</td>
                      <td className="py-2.5 px-3 text-slate-300">{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* SQL Script Viewer */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">ملفات وسكربتات SQL Server الكاملة للتشغيل المباشر</h3>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'تم النسخ بنجاح' : 'نسخ السكربت الحالي'}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'db', label: '1. إنشاء قاعدة البيانات (Database & Collation)' },
            { id: 'tables', label: '2. إنشاء الجداول والعلاقات (Tables & FKs)' },
            { id: 'sp', label: '3. الإجراءات المخزنة والمعاملات (Stored Procedures)' },
            { id: 'views', label: '4. العروض والفهارس (Views & Indexes)' },
            { id: 'seeds', label: '5. البيانات التجريبية الأولية (Seed Data)' },
            { id: 'backup', label: '6. خطة النسخ الاحتياطي (Backup & Restore)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSqlTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeSqlTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Script Code Area */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
            <span>Microsoft SQL Server Management Studio (SSMS) Ready</span>
            <span className="text-emerald-400">T-SQL Strict Syntax</span>
          </div>
          <pre className="p-4 text-xs font-mono text-emerald-300/90 leading-relaxed overflow-x-auto max-h-96 select-text">
            {getSqlText()}
          </pre>
        </div>

        {/* SSMS Execution Guide */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 space-y-1">
          <span className="font-bold flex items-center gap-1.5 text-amber-400">
            <ShieldAlert className="w-4 h-4" />
            تعليمات التنفيذ داخل SQL Server Management Studio:
          </span>
          <p className="text-slate-300 leading-relaxed">
            يجب تنفيذ الملفات بالترتيب المتسلسل (1 ثم 2 ثم 3 ثم 4 ثم 5)، مع التأكد من صلاحيات المستخدم `db_owner` أو `sysadmin`، لضمان إنشاء القيود والمفاتيح الأجنبية بشكل متسق ودون تعارض.
          </p>
        </div>
      </div>

      {/* Simulated SQL Query Runner */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">محاكي تنفيذ الاستعلامات والتحقق من صحة البيانات (SQL Sandbox)</h3>
          </div>
          <span className="text-xs text-slate-400">اختبر استعلامات FireDAC و TFDQuery مباشرة</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            placeholder="أدخل استعلام SQL تجريبي..."
          />
          <button
            onClick={runSimulatedQuery}
            disabled={isRunningQuery}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isRunningQuery ? 'animate-spin' : ''}`} />
            <span>{isRunningQuery ? 'جاري الفحص...' : 'تشغيل الاستعلام'}</span>
          </button>
        </div>

        {/* Quick query buttons */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-slate-500 self-center text-[11px]">نماذج جاهزة:</span>
          <button
            onClick={() => { setQueryInput('SELECT TOP 10 ProductID, ItemCode, ItemNameAr, SellingPrice, CurrentStock FROM dbo.InvProducts;'); runSimulatedQuery(); }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
          >
            InvProducts (الأصناف)
          </button>
          <button
            onClick={() => { setQueryInput('SELECT InvoiceID, InvoiceNumber, CustomerName, GrandTotal, Status FROM dbo.vw_Sal_InvoiceDetails;'); runSimulatedQuery(); }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
          >
            vw_Sal_InvoiceDetails (الفواتير)
          </button>
          <button
            onClick={() => { setQueryInput('SELECT UserID, Username, FullName, Role, IsActive FROM dbo.SecUsers;'); runSimulatedQuery(); }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
          >
            SecUsers (المستخدمين)
          </button>
        </div>

        {/* Query Output Grid */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                {Object.keys(queryOutput[0] || {}).map((key) => (
                  <th key={key} className="py-2.5 px-3 font-semibold font-mono text-emerald-400">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {queryOutput.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  {Object.values(row).map((val: any, i) => (
                    <td key={i} className="py-2 px-3 font-mono text-xs">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
