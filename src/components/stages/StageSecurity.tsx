import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, Eye, ShieldAlert, Check, RefreshCw } from 'lucide-react';
import { ProjectData } from '../../types/project';

interface Props {
  project: ProjectData;
}

export const StageSecurity: React.FC<Props> = ({ project }) => {
  const [testPassword, setTestPassword] = useState('Admin@2026');
  const [salt, setSalt] = useState('v2F5YWRhU2FsdDIwMjYxMDAw');
  const [generatedHash, setGeneratedHash] = useState('$argon2id$v=19$m=65536,t=3,p=4$v2F5YWRhU2FsdDIwMjYxMDAw$XzV4KzT9Q1qZ8xV0kL7mP3nB2vC4xZ9aQ8wE7rT6yU0');

  const handleHashPassword = () => {
    const newSalt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setSalt(newSalt);
    // Simulated Argon2id hash output
    setGeneratedHash(`$argon2id$v=19$m=65536,t=3,p=4$${newSalt}$${btoa(testPassword + newSalt).substring(0, 32)}...`);
  };

  const rbacMatrix = [
    { module: 'فواتير المبيعات (Sales Invoices)', admin: true, accountant: true, cashier: true },
    { module: 'مرتجع المبيعات (Sales Returns)', admin: true, accountant: true, cashier: false },
    { module: 'إدارة بطاقات الأصناف (Products)', admin: true, accountant: false, cashier: false },
    { module: 'الجرد وتعديل المخزون (Inventory Adjust)', admin: true, accountant: true, cashier: false },
    { module: 'القيود المحاسبية وسندات القبض (GL & Receipts)', admin: true, accountant: true, cashier: false },
    { module: 'شاشة المستخدمين والصلاحيات (Users & Roles)', admin: true, accountant: false, cashier: false },
    { module: 'النسخ الاحتياطي لقاعدة البيانات (Backup DB)', admin: true, accountant: false, cashier: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
              المرحلة 9 : هندسة الأمان والمصادقة وحماية البيانات (Security Architecture)
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              تشفير كلمات المرور Argon2id، مصفوفة الصلاحيات RBAC، وسجل التدقيق
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              عدم تخزين كلمات المرور كنص صريح مطلقاً، استخدام ملح Salt فريد لكل مستخدم، حماية الاستعلامات ضد الحقن، وتسجيل العمليات الحساسة.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Password Hashing Sandbox */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            مختبر تجزئة كلمات المرور (Argon2id / Salt Sandbox)
          </h3>
          <span className="text-xs text-slate-400">تحصين كلمات المرور ضد هجمات القوة الغاشمة و GPU</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold block">كلمة المرور التجريبية (Plain Password)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleHashPassword}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>توليد التجزئة</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold block">الملح العشوائي المولد (Unique Salt)</label>
            <input
              type="text"
              readOnly
              value={salt}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300"
            />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 block font-semibold">تجزئة الرمز المخزنة في قاعدة البيانات (PasswordHash):</span>
          <code className="text-xs font-mono text-emerald-400 break-all block">
            {generatedHash}
          </code>
        </div>
      </div>

      {/* RBAC Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          مصفوفة الأدوار والصلاحيات (Role-Based Access Control - RBAC)
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                <th className="py-2.5 px-4 font-semibold">الوحدة البرمجية / الإجراء</th>
                <th className="py-2.5 px-4 font-semibold text-center text-amber-400">مدير النظام (ADMIN)</th>
                <th className="py-2.5 px-4 font-semibold text-center text-indigo-400">محاسب عام (ACCOUNTANT)</th>
                <th className="py-2.5 px-4 font-semibold text-center text-emerald-400">كاشير مبيعات (CASHIER)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {rbacMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-2.5 px-4 font-medium text-slate-200">{item.module}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="inline-flex p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                      <Check className="w-4 h-4" />
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {item.accountant ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-slate-600 font-mono">-</span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {item.cashier ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-slate-600 font-mono">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SQL Injection Defense Proof */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          تحصين الاستعلامات ومنع حقن SQL Injection نهائياً
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          يلتزم المشروع بمنع كتابة أي استعلامات مركبة نصياً مثل <code className="text-rose-400 font-mono bg-slate-950 px-1 py-0.5 rounded">"WHERE Username = '" + edtUser.Text + "'"</code>. بدلاً من ذلك، نستخدم حصرياً:
        </p>
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
          Qry.SQL.Text := 'SELECT UserID, PasswordHash, Salt FROM dbo.SecUsers WHERE Username = :UName AND IsActive = 1';<br/>
          Qry.ParamByName('UName').AsString := Trim(edtUser.Text);<br/>
          Qry.Open;
        </div>
      </div>
    </div>
  );
};
