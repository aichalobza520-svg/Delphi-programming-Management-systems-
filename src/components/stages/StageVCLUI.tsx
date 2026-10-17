import React, { useState } from 'react';
import { Layout, Monitor, Plus, Trash2, Printer, Save, RefreshCw, Barcode, CheckCircle, Code, Globe } from 'lucide-react';
import { ProjectData } from '../../types/project';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  project: ProjectData;
}

interface InvoiceRow {
  id: number;
  itemCode: string;
  nameAr: string;
  nameEn: string;
  quantity: number;
  price: number;
  discount: number;
}

export const StageVCLUI: React.FC<Props> = ({ project }) => {
  const { lang: globalLang } = useLanguage();
  const [formLang, setFormLang] = useState<'ar' | 'en'>(globalLang);
  const [activeFormTab, setActiveFormTab] = useState<'preview' | 'dfm' | 'pas'>('preview');
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);
  const currentForm = project.forms[selectedFormIndex] || project.forms[0];

  const isFormRtl = formLang === 'ar';

  // Interactive Invoice Form Simulator State
  const [customer, setCustomer] = useState('شركة التقنية المتقدمة المحدودة');
  const [paymentType, setPaymentType] = useState('1'); // 1: Cash, 2: Credit, 3: Card
  const [barcodeInput, setBarcodeInput] = useState('');
  const [items, setItems] = useState<InvoiceRow[]>([
    { id: 1, itemCode: 'PRD-1001', nameAr: 'جهاز حاسوب محمول Core i7', nameEn: 'Laptop Dell Core i7', quantity: 1, price: 3450.00, discount: 0 },
    { id: 2, itemCode: 'PRD-1002', nameAr: 'طابعة فواتير حرارية ESC/POS', nameEn: 'Thermal POS Receipt Printer', quantity: 1, price: 490.00, discount: 0 }
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Quick sample products
  const sampleProducts = [
    { code: 'PRD-1001', nameAr: 'جهاز حاسوب محمول Core i7', nameEn: 'Laptop Dell Core i7', price: 3450.00 },
    { code: 'PRD-1002', nameAr: 'طابعة فواتير حرارية ESC/POS', nameEn: 'Thermal POS Receipt Printer', price: 490.00 },
    { code: 'PRD-1003', nameAr: 'قارئ باركود لاسلكي 2D QR Code', nameEn: 'Wireless 2D QR Barcode Scanner', price: 260.00 },
    { code: 'PRD-1004', nameAr: 'ورق طابعات A4 كرتون 5 رزم', nameEn: 'A4 Printing Paper Carton', price: 115.00 },
  ];

  const handleAddSampleItem = (prod: typeof sampleProducts[0]) => {
    const existing = items.find(i => i.itemCode === prod.code);
    if (existing) {
      setItems(items.map(i => i.itemCode === prod.code ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setItems([...items, {
        id: Date.now(),
        itemCode: prod.code,
        nameAr: prod.nameAr,
        nameEn: prod.nameEn,
        quantity: 1,
        price: prod.price,
        discount: 0
      }]);
    }
    setSaveSuccess(false);
  };

  const handleScanBarcode = () => {
    if (!barcodeInput.trim()) return;
    const found = sampleProducts.find(p => p.code.toLowerCase().includes(barcodeInput.toLowerCase()));
    if (found) {
      handleAddSampleItem(found);
      setBarcodeInput('');
    } else {
      handleAddSampleItem({
        code: `PRD-${Math.floor(Math.random() * 9000 + 1000)}`,
        nameAr: `صنف ممسوح بالباركود (${barcodeInput})`,
        nameEn: `Barcode Item (${barcodeInput})`,
        price: 150.00
      });
      setBarcodeInput('');
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
    setSaveSuccess(false);
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(i => {
      if (i.id === id) {
        const newQ = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQ };
      }
      return i;
    }));
    setSaveSuccess(false);
  };

  // Calculations
  const subTotal = items.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
  const vatAmount = subTotal * 0.15;
  const grandTotal = subTotal + vatAmount;

  const handleSaveInvoice = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
              المرحلة 7 : تصميم واجهات VCL وتجربة المستخدم (Windows 11 UI/UX)
            </span>
            <h2 className="text-xl font-bold text-white mt-3">
              محاكي واجهات VCL التفاعلية ومفتش ملفات النماذج (.dfm & .pas)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تصميم واجهات احترافية تدعم ثنائية اللغة (عربي RTL / إنجليزي LTR) وثيمات Windows 11 الحديثة مع سهولة التنقل عبر لوحة المفاتيح والباركود.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Layout className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Form Switcher & View Mode */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">اختر النموذج Form:</span>
          {project.forms.map((f, i) => (
            <button
              key={f.formName}
              onClick={() => setSelectedFormIndex(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedFormIndex === i
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.arabicTitle} ({f.formName})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveFormTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition ${
              activeFormTab === 'preview'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>المعاينة التفاعلية Live UI</span>
          </button>
          <button
            onClick={() => setActiveFormTab('dfm')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition ${
              activeFormTab === 'dfm'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>ملف الخصائص (.dfm)</span>
          </button>
          <button
            onClick={() => setActiveFormTab('pas')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition ${
              activeFormTab === 'pas'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>كود الأحداث (.pas)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Content */}
      {activeFormTab === 'preview' && (
        <div 
          dir={isFormRtl ? 'rtl' : 'ltr'} 
          className="rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden font-sans transition-all"
        >
          
          {/* Windows 11 VCL Window Title Bar */}
          <div className="bg-slate-800/90 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition cursor-pointer"></div>
              <span className="text-xs text-slate-300 font-semibold font-mono pr-2">
                Delphi 12.1 VCL [Windows 11 Mica] - {isFormRtl ? currentForm.arabicTitle : 'Sales Invoice Entry & Management'}
              </span>
            </div>

            {/* In-Form Runtime Language Switcher */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-700">
                <Globe className="w-3.5 h-3.5 text-amber-400 ml-1" />
                <button
                  onClick={() => setFormLang('ar')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                    formLang === 'ar' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  العربية (RTL)
                </button>
                <button
                  onClick={() => setFormLang('en')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                    formLang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English (LTR)
                </button>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                BiDiMode: {isFormRtl ? 'bdRightToLeft' : 'bdLeftToRight'}
              </span>
            </div>
          </div>

          {/* Ribbon / Action Toolbar */}
          <div className="bg-slate-850 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveInvoice}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isFormRtl ? 'حفظ وترحيل [F5]' : 'Save & Post [F5]'}</span>
              </button>

              <button
                onClick={() => alert(isFormRtl ? 'جاري تجهيز تقرير الفاتورة عبر FastReport...' : 'Preparing FastReport printout...')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>{isFormRtl ? 'طباعة إيصال [F9]' : 'Print Receipt [F9]'}</span>
              </button>

              <button
                onClick={() => { setItems([]); setSaveSuccess(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isFormRtl ? 'فاتورة جديدة [F2]' : 'New Invoice [F2]'}</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs animate-fade-in font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>
                  {isFormRtl 
                    ? 'تم حفظ وترحيل الفاتورة بنجاح في قاعدة البيانات وتحديث رصيد المخزن!' 
                    : 'Invoice successfully saved and posted to SQL Server database!'}
                </span>
              </div>
            )}
          </div>

          {/* Form Body */}
          <div className="p-5 space-y-4 bg-slate-950/60">
            
            {/* Header Controls: Invoice No, Date, Customer, Payment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">
                  {isFormRtl ? 'رقم الفاتورة (TEdit)' : 'Invoice No (TEdit)'}
                </label>
                <input
                  type="text"
                  readOnly
                  value="INV-202610-0001"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">
                  {isFormRtl ? 'تاريخ الفاتورة (TDateTimePicker)' : 'Invoice Date (TDateTimePicker)'}
                </label>
                <input
                  type="text"
                  readOnly
                  value="2026-10-17 14:30"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">
                  {isFormRtl ? 'العميل (TComboBox)' : 'Customer (TComboBox)'}
                </label>
                <select
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="شركة التقنية المتقدمة المحدودة">
                    {isFormRtl ? 'شركة التقنية المتقدمة المحدودة' : 'Advanced Tech Co. Ltd.'}
                  </option>
                  <option value="مؤسسة النور للتجارة والتوزيع">
                    {isFormRtl ? 'مؤسسة النور للتجارة والتوزيع' : 'Al Noor Trading Est.'}
                  </option>
                  <option value="عميل نقدي عام (صالات البيع)">
                    {isFormRtl ? 'عميل نقدي عام (صالات البيع)' : 'Walk-in Cash Customer'}
                  </option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">
                  {isFormRtl ? 'طريقة الدفع (TComboBox)' : 'Payment Method (TComboBox)'}
                </label>
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="1">{isFormRtl ? 'نقدي Cash' : 'Cash'}</option>
                  <option value="2">{isFormRtl ? 'آجل Credit' : 'Credit / On-Account'}</option>
                  <option value="3">{isFormRtl ? 'شبكة / مدى Card' : 'Debit / Credit Card'}</option>
                </select>
              </div>
            </div>

            {/* Barcode & Fast Add Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-2 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
              <div className="flex-1 flex items-center gap-2 w-full">
                <Barcode className="w-5 h-5 text-amber-400 shrink-0" />
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleScanBarcode()}
                  placeholder={isFormRtl ? 'مسح باركود الصنف أو إدخال الكود واضغط Enter...' : 'Scan barcode or enter SKU and press Enter...'}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleScanBarcode}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  {isFormRtl ? 'إضافة' : 'Add Item'}
                </button>
              </div>

              {/* Sample Quick Product Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {sampleProducts.map((p) => (
                  <button
                    key={p.code}
                    onClick={() => handleAddSampleItem(p)}
                    className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-blue-600/30 text-[11px] text-slate-300 hover:text-blue-300 border border-slate-700 whitespace-nowrap transition"
                  >
                    + {isFormRtl ? p.nameAr.split(' ')[0] : p.nameEn.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* VCL TDBGrid Simulation */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden">
              <div className="px-4 py-2 bg-slate-850 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>
                  {isFormRtl 
                    ? `جدول بنود الفاتورة (TDBGrid) - عدد البنود: ${items.length}` 
                    : `Invoice Items Grid (TDBGrid) - Rows: ${items.length}`}
                </span>
                <span className="text-[11px] font-mono text-emerald-400">DataSource := dsInvoiceItems</span>
              </div>

              <table className={`w-full ${isFormRtl ? 'text-right' : 'text-left'} text-xs`}>
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">{isFormRtl ? 'كود الصنف' : 'Item Code'}</th>
                    <th className="py-2.5 px-3">{isFormRtl ? 'اسم الصنف' : 'Item Description'}</th>
                    <th className="py-2.5 px-3 text-center">{isFormRtl ? 'الكمية' : 'Qty'}</th>
                    <th className="py-2.5 px-3">{isFormRtl ? 'سعر الوحدة' : 'Unit Price'}</th>
                    <th className="py-2.5 px-3">{isFormRtl ? 'ضريبة 15%' : 'VAT 15%'}</th>
                    <th className="py-2.5 px-3">{isFormRtl ? 'الإجمالي' : 'Line Total'}</th>
                    <th className="py-2.5 px-3 text-center">{isFormRtl ? 'إجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                        {isFormRtl 
                          ? 'لا توجد أصناف في الفاتورة بعد. امسح الباركود أو اختر صنفاً من الأعلى لإضافته.' 
                          : 'No items in invoice. Scan barcode or choose from sample products above.'}
                      </td>
                    </tr>
                  ) : (
                    items.map((item, index) => {
                      const lineSub = item.quantity * item.price;
                      const lineTax = lineSub * 0.15;
                      const lineTotal = lineSub + lineTax;
                      const currencySymbol = isFormRtl ? 'ر.س' : 'SAR';

                      return (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-2.5 px-3 font-mono text-slate-500">{index + 1}</td>
                          <td className="py-2.5 px-3 font-mono text-amber-400">{item.itemCode}</td>
                          <td className="py-2.5 px-3 font-medium">{isFormRtl ? item.nameAr : item.nameEn}</td>
                          <td className="py-2.5 px-3 text-center">
                            <div className="inline-flex items-center gap-1.5 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                              >
                                -
                              </button>
                              <span className="font-mono font-bold px-1">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono">{item.price.toFixed(2)} {currencySymbol}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-400">{lineTax.toFixed(2)} {currencySymbol}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                            {lineTotal.toFixed(2)} {currencySymbol}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 rounded hover:bg-rose-950/50 text-slate-500 hover:text-rose-400 transition"
                              title={isFormRtl ? 'حذف البند' : 'Delete item'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals Summary Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">
                  {isFormRtl ? 'المجموع قبل الضريبة (SubTotal)' : 'SubTotal Before Tax'}
                </span>
                <span className="text-lg font-mono font-bold text-slate-200">
                  {subTotal.toFixed(2)} {isFormRtl ? 'ر.س' : 'SAR'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">
                  {isFormRtl ? 'ضريبة القيمة المضافة 15% (VAT)' : 'Value Added Tax (15% VAT)'}
                </span>
                <span className="text-lg font-mono font-bold text-amber-400">
                  {vatAmount.toFixed(2)} {isFormRtl ? 'ر.س' : 'SAR'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40">
                <span className="text-[11px] text-emerald-300 block mb-0.5">
                  {isFormRtl ? 'الصافي النهائي المستحق (Grand Total)' : 'Grand Total Due'}
                </span>
                <span className="text-xl font-mono font-black text-emerald-400">
                  {grandTotal.toFixed(2)} {isFormRtl ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DFM Snippet Inspector */}
      {activeFormTab === 'dfm' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono">
              {currentForm.unitName.replace('.pas', '.dfm')} - Form Visual Layout Definition
            </h3>
            <span className="text-xs text-slate-400">تنسيق Delphi Form Text</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <pre className="p-4 text-xs font-mono text-blue-300/90 leading-relaxed overflow-x-auto max-h-96 select-text">
              {currentForm.dfmSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* PAS Snippet Inspector */}
      {activeFormTab === 'pas' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono">
              {currentForm.unitName} - Form Event Handler Implementation
            </h3>
            <span className="text-xs text-slate-400">Object Pascal Code</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <pre className="p-4 text-xs font-mono text-emerald-300/90 leading-relaxed overflow-x-auto max-h-96 select-text">
              {currentForm.pasSnippet}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
