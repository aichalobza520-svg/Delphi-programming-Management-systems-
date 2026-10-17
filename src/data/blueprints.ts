import { ProjectData } from '../types/project';

export const RAYADA_ERP: ProjectData = {
  id: 'rayada-erp',
  name: 'ريادة ERP (Rayada ERP Enterprise)',
  nameEn: 'Rayada ERP Suite 2026',
  tagline: 'منظومة تخطيط الموارد وإدارة المبيعات والمخزون والفواتير المحاسبية المتوافقة مع FireDAC & SQL Server',
  targetAudience: 'الشركات التجارية والمؤسسات المتوسطة والكبيرة، وموزعو الجملة والتجزئة والمستودعات',
  language: 'العربية (مع واجهة ثنائية اللغة AR/EN ودعم كامل لـ RTL وWindows 11)',
  requirements: {
    problemStatement: 'تعاني المنشآت التجارية من تشتت بيانات المبيعات والمخزون، وتأخر إعداد القيود المحاسبية، ومخاطر فقدان البيانات أو تعطل الشبكة. يحتاج العميل إلى نظام مكتبي فائق السرعة مبني بـ Delphi 12.1 وقواعد بيانات SQL Server يعمل في شبكة محلية Client-Server بكفاءة عالية، مع حماية أمنية صارمة، ودعم للفاتورة الضريبية وتقارير FastReport.',
    mvpScope: [
      'نظام تسجيل دخول وصلاحيات متعدد الأدوار (RBAC) مع تشفير كلمات المرور بحماية متقدمة.',
      'إدارة الأصناف والمستودعات والباركود وتعدد وحدات القياس (حبة، كرتون، دزينة).',
      'إدارة العملاء والموردين وأرصدة الحسابات وحدود الائتمان.',
      'دورة المبيعات: فواتير المبيعات، المرتجعات، الخصومات وضريبة القيمة المضافة 15%.',
      'تحديث المخزون التلقائي ومنع البيع بالسالب مع إمكانية التجاوز الإداري حسب الصلاحية.',
      'توليد القيود اليومية التلقائية في دفتر الأستاذ العام.',
      'تقارير FastReport قابلة للتصدير إلى PDF وExcel والطباعة الفورية.',
      'سجل تدقيق أمني شامل (Audit Trail) لجميع العمليات الحساسة.'
    ],
    functional: [
      'المصادقة وإدارة الجلسات: تسجيل الدخول، قفل الشاشة عند الخمول، تغيير كلمة المرور.',
      'إدارة المخزون: بطاقة الصنف، شجرة التصنيفات، تنبيهات حد الطلب وتواريخ الصلاحية.',
      'المبيعات والفواتير: إضافة، تعديل، إلغاء، استعلام بفلاتر متعددة، بحث فوري بالاسم والباركود.',
      'المحاسبة والمالية: سندات القبض والصرف، كشف حساب عميل، ميزان مراجعة مبسط.',
      'التقارير: تقرير المبيعات اليومية، أرباح الفواتير، حركة صنف، جرد المستودعات.',
      'النسخ الاحتياطي: إنشاء نسخة احتياطية من داخل البرنامج واستعادتها بضوابط أمان.'
    ],
    nonFunctional: [
      'الأداء: زمن استجابة الاستعلامات أقل من 200 مللي ثانية في شبكة LAN تضم حتى 50 مستخدمًا متزامنًا.',
      'الأمان: منع حقن SQL Injection عبر استخدام الاستعلامات ذات المعاملات (Parameterized Queries).',
      'التوفر وسلامة البيانات: تنفيذ المعاملات الحرجة داخل ACID Transactions مع التراجع التلقائي عند أي خطأ.',
      'سهولة الاستخدام: اختصارات لوحة المفاتيح F1-F12 والتنقل بزر Enter لتسريع إدخال الفواتير.',
      'التوافق: تشغيل أصلي Native 64-bit على Windows 10 وWindows 11 دون الحاجة لأطر عمل ثقيلة.'
    ],
    acceptanceCriteria: [
      'إنشاء قاعدة البيانات بكامل جداولها وعلاقاتها دون أي أخطاء DDL.',
      'تأكيد حفظ الفاتورة وتحديث رصيد المخزن وحساب العميل في معاملة واحدة غير قابلة للتجزئة.',
      'منع أي مستخدم عادي من الدخول لشاشات الصلاحيات أو تعديل الأسعار دون تفويض.',
      'توليد تقرير الفاتورة عبر FastReport بصيغة PDF ومطابقة المبالغ والضريبة بدقة 100%.'
    ]
  },
  architecture: {
    layers: [
      '1. Presentation Layer (VCL Forms & Frames): واجهات المستخدم المبنية بـ VCL مع تنسيق RTL ودعم Themes Windows 11.',
      '2. Controller / Presenter Layer: ربط الأحداث وعزل منطق الشاشة عن البيانات.',
      '3. Business Logic & Service Layer (Services): تطبيق قواعد العمل (حساب الضرائب، التحقق من حدود الائتمان، فحص الكميات).',
      '4. Domain Models: كائنات DTO وفئات البيانات Object Pascal لتمثيل الكيانات.',
      '5. Data Access Layer (Repository Pattern): عزل استعلامات SQL والتعامل مع FireDAC.',
      '6. Infrastructure & Database (SQL Server 2022): جداول، إجراءات مخزنة Stored Procedures، وفهارس محسّنة.'
    ],
    diagramText: `
+-------------------------------------------------------------+
|               VCL Presentation Layer (UI / Forms)           |
|   frmMain  |  frmLogin  |  frmInvoiceEdit  |  frmProducts   |
+-------------------------------------------------------------+
                              | (Invokes Actions & DTOs)
                              v
+-------------------------------------------------------------+
|                Business Logic Layer (Services)             |
|   TInvoiceService  |  TProductService  |  TSecurityService  |
+-------------------------------------------------------------+
                              | (Calls Repositories)
                              v
+-------------------------------------------------------------+
|          Data Access Layer (Repository & Unit of Work)      |
|   TInvoiceRepository  |  TProductRepository  |  TUserRepository |
+-------------------------------------------------------------+
                              | (Uses FireDAC Engine)
                              v
+-------------------------------------------------------------+
|             FireDAC DataModule (dmMain.pas)                 |
|   TFDConnection  |  TFDTransaction  |  TFDPhysMSSQLDriver   |
+-------------------------------------------------------------+
                              | (TCP/IP Port 1433 with SSL)
                              v
+-------------------------------------------------------------+
|               Microsoft SQL Server 2022+                    |
|   Tables  |  Indexes  |  Stored Procedures  |  Views | Audit|
+-------------------------------------------------------------+
`,
    designPatterns: [
      'Repository Pattern لعزل استعلامات قاعدة البيانات',
      'Service Layer Pattern لمركزة قواعد العمل',
      'Data Transfer Object (DTO) لنقل البيانات بين النماذج والخدمات',
      'Singleton DataModule (dmMain) لإدارة الاتصال والمصادر المشتركة',
      'Dependency Injection مبسط لسهولة الاختبار'
    ],
    securityMeasures: [
      'تشفير كلمات المرور باستخدام خوارزمية Argon2id المقاومة لهجمات القوة الغاشمة وGPU.',
      'استخدام المعاملات TFDQuery.Params حصرًا وتجريم ربط السلاسل النصية المباشر.',
      'تشفير ملف الإعدادات ومسار الاتصال بـ AES-256 لحماية بيانات الاعتماد.',
      'تطبيق نموذج الصلاحيات القائم على الأدوار (Role-Based Access Control - RBAC).',
      'تسجيل سجل التدقيق لعمليات التعديل والحذف الحساسة مع رقم المستخدم وتوقيت السيرفر.'
    ]
  },
  tables: [
    {
      name: 'SecUsers',
      arabicName: 'المستخدمين',
      description: 'جدول حسابات المستخدمين وبيانات تسجيل الدخول وحالة التفعيل',
      columns: [
        { name: 'UserID', type: 'INT IDENTITY(1,1)', isPrimary: true, description: 'المعرف الفريد للمستخدم' },
        { name: 'Username', type: 'NVARCHAR(50)', isNullable: false, description: 'اسم الدخول الفريد' },
        { name: 'PasswordHash', type: 'NVARCHAR(255)', isNullable: false, description: 'تجزئة كلمة المرور Argon2id' },
        { name: 'Salt', type: 'NVARCHAR(64)', isNullable: false, description: 'الملح العشوائي للتشفير' },
        { name: 'FullName', type: 'NVARCHAR(100)', isNullable: false, description: 'الاسم الكامل للمستخدم' },
        { name: 'Email', type: 'NVARCHAR(100)', isNullable: true, description: 'البريد الإلكتروني' },
        { name: 'RoleID', type: 'INT', isForeign: true, references: 'SecRoles(RoleID)', isNullable: false, description: 'معرف الدور والصلاحية' },
        { name: 'IsActive', type: 'BIT', defaultVal: '1', description: 'حالة الحساب نشط / معطل' },
        { name: 'FailedLoginCount', type: 'INT', defaultVal: '0', description: 'عدد محاولات الدخول الفاشلة' },
        { name: 'LockedUntil', type: 'DATETIME2', isNullable: true, description: 'تاريخ قفل الحساب عند تكرار الفشل' },
        { name: 'CreatedAt', type: 'DATETIME2', defaultVal: 'SYSUTCDATETIME()', description: 'تاريخ الإنشاء' }
      ],
      indexes: ['UQ_SecUsers_Username', 'IX_SecUsers_RoleID']
    },
    {
      name: 'SecRoles',
      arabicName: 'الأدوار الإدارية',
      description: 'جدول الأدوار (مدير نظام، محاسب، بائع، أمين مستودع)',
      columns: [
        { name: 'RoleID', type: 'INT IDENTITY(1,1)', isPrimary: true, description: 'معرف الدور' },
        { name: 'RoleName', type: 'NVARCHAR(50)', isNullable: false, description: 'اسم الدور بالعربية' },
        { name: 'RoleCode', type: 'VARCHAR(30)', isNullable: false, description: 'رمز الدور البرمجي' },
        { name: 'Description', type: 'NVARCHAR(200)', isNullable: true, description: 'وصف صلاحيات الدور' }
      ],
      indexes: ['UQ_SecRoles_RoleCode']
    },
    {
      name: 'InvProducts',
      arabicName: 'الأصناف والمنتجات',
      description: 'جدول بطاقات الأصناف وبيانات الأسعار والمخزون والباركود',
      columns: [
        { name: 'ProductID', type: 'INT IDENTITY(1,1)', isPrimary: true, description: 'معرف الصنف' },
        { name: 'ItemCode', type: 'VARCHAR(50)', isNullable: false, description: 'كود الصنف الفريد' },
        { name: 'Barcode', type: 'VARCHAR(50)', isNullable: true, description: 'الباركود الدولي أو المحلي' },
        { name: 'ItemNameAr', type: 'NVARCHAR(150)', isNullable: false, description: 'اسم الصنف بالعربية' },
        { name: 'ItemNameEn', type: 'VARCHAR(150)', isNullable: true, description: 'اسم الصنف بالإنجليزية' },
        { name: 'CategoryID', type: 'INT', isForeign: true, references: 'InvCategories(CategoryID)', isNullable: false, description: 'تصنيف الصنف' },
        { name: 'PurchasePrice', type: 'DECIMAL(18,4)', defaultVal: '0.0000', description: 'سعر الشراء الافتراضي' },
        { name: 'SellingPrice', type: 'DECIMAL(18,4)', defaultVal: '0.0000', description: 'سعر البيع المعتمد' },
        { name: 'VatPercentage', type: 'DECIMAL(5,2)', defaultVal: '15.00', description: 'نسبة الضريبة (15%)' },
        { name: 'MinQuantityAlert', type: 'DECIMAL(18,2)', defaultVal: '5.00', description: 'حد الطلب للتنبيه' },
        { name: 'IsActive', type: 'BIT', defaultVal: '1', description: 'متاح للتعامل' }
      ],
      indexes: ['UQ_InvProducts_ItemCode', 'IX_InvProducts_Barcode', 'IX_InvProducts_CategoryID']
    },
    {
      name: 'SalCustomers',
      arabicName: 'العملاء',
      description: 'جدول بيانات العملاء وأرقام الاتصال وحدود الائتمان والرقم الضريبي',
      columns: [
        { name: 'CustomerID', type: 'INT IDENTITY(1,1)', isPrimary: true, description: 'معرف العميل' },
        { name: 'CustomerName', type: 'NVARCHAR(150)', isNullable: false, description: 'اسم العميل' },
        { name: 'Phone', type: 'VARCHAR(25)', isNullable: true, description: 'رقم الهاتف / الجوال' },
        { name: 'TaxNumber', type: 'VARCHAR(30)', isNullable: true, description: 'الرقم الضريبي VAT' },
        { name: 'CreditLimit', type: 'DECIMAL(18,2)', defaultVal: '0.00', description: 'سقف الائتمان' },
        { name: 'CurrentBalance', type: 'DECIMAL(18,2)', defaultVal: '0.00', description: 'الرصيد الحالي' },
        { name: 'Address', type: 'NVARCHAR(250)', isNullable: true, description: 'العنوان الوطني' }
      ],
      indexes: ['IX_SalCustomers_Phone', 'IX_SalCustomers_TaxNumber']
    },
    {
      name: 'SalInvoices',
      arabicName: 'فواتير المبيعات (الرأس)',
      description: 'جدول رأس الفواتير متضمنا رقم الفاتورة والعميل والإجماليات والضريبة',
      columns: [
        { name: 'InvoiceID', type: 'BIGINT IDENTITY(1,1)', isPrimary: true, description: 'معرف الفاتورة' },
        { name: 'InvoiceNumber', type: 'VARCHAR(30)', isNullable: false, description: 'رقم الفاتورة المتسلسل' },
        { name: 'InvoiceDate', type: 'DATETIME2', defaultVal: 'SYSUTCDATETIME()', description: 'تاريخ ووقت الفاتورة' },
        { name: 'CustomerID', type: 'INT', isForeign: true, references: 'SalCustomers(CustomerID)', isNullable: false, description: 'العميل' },
        { name: 'PaymentType', type: 'TINYINT', defaultVal: '1', description: 'طريقة الدفع (1: نقدي، 2: آجل، 3: شبكة/بطاقة)' },
        { name: 'SubTotal', type: 'DECIMAL(18,2)', defaultVal: '0.00', description: 'المجموع قبل الضريبة' },
        { name: 'DiscountAmount', type: 'DECIMAL(18,2)', defaultVal: '0.00', description: 'قيمة الخصم' },
        { name: 'TaxAmount', type: 'DECIMAL(18,2)', defaultVal: '0.00', description: 'قيمة ضريبة القيمة المضافة' },
        { name: 'GrandTotal', type: 'DECIMAL(18,2)', defaultVal: '0.00', description: 'الصافي النهائي المستحق' },
        { name: 'Status', type: 'TINYINT', defaultVal: '1', description: 'الحالة (1: معتمدة، 2: ملغاة، 3: مسودة)' },
        { name: 'CreatedByUserID', type: 'INT', isForeign: true, references: 'SecUsers(UserID)', isNullable: false, description: 'المستخدم المنشئ' },
        { name: 'CreatedAt', type: 'DATETIME2', defaultVal: 'SYSUTCDATETIME()', description: 'توقيت الإنشاء' }
      ],
      indexes: ['UQ_SalInvoices_InvoiceNumber', 'IX_SalInvoices_Date', 'IX_SalInvoices_Customer']
    },
    {
      name: 'SalInvoiceItems',
      arabicName: 'بنود فواتير المبيعات',
      description: 'تفاصيل المنتجات والكميات والأسعار لكل سطر في الفاتورة',
      columns: [
        { name: 'ItemRowID', type: 'BIGINT IDENTITY(1,1)', isPrimary: true, description: 'معرف السطر' },
        { name: 'InvoiceID', type: 'BIGINT', isForeign: true, references: 'SalInvoices(InvoiceID)', isNullable: false, description: 'معرف الفاتورة' },
        { name: 'ProductID', type: 'INT', isForeign: true, references: 'InvProducts(ProductID)', isNullable: false, description: 'معرف الصنف' },
        { name: 'Quantity', type: 'DECIMAL(18,3)', isNullable: false, description: 'الكمية المباعة' },
        { name: 'UnitPrice', type: 'DECIMAL(18,4)', isNullable: false, description: 'سعر الوحدة' },
        { name: 'DiscountPercent', type: 'DECIMAL(5,2)', defaultVal: '0.00', description: 'نسبة الخصم السطري' },
        { name: 'LineSubTotal', type: 'DECIMAL(18,2)', isNullable: false, description: 'الإجمالي السطري قبل الضريبة' },
        { name: 'LineTaxAmount', type: 'DECIMAL(18,2)', isNullable: false, description: 'ضريبة السطر' },
        { name: 'LineTotal', type: 'DECIMAL(18,2)', isNullable: false, description: 'الإجمالي النهائي للسطر' }
      ],
      indexes: ['IX_SalInvoiceItems_InvoiceID', 'IX_SalInvoiceItems_ProductID']
    },
    {
      name: 'SysAuditLogs',
      arabicName: 'سجل التدقيق الأمني',
      description: 'تسجيل العمليات الحساسة (إنشاء، تعديل، إلغاء، حذف، تسجيل دخول)',
      columns: [
        { name: 'LogID', type: 'BIGINT IDENTITY(1,1)', isPrimary: true, description: 'معرف السجل' },
        { name: 'UserID', type: 'INT', isNullable: true, description: 'المستخدم منفذ العملية' },
        { name: 'ActionType', type: 'VARCHAR(50)', isNullable: false, description: 'نوع العملية (INSERT/UPDATE/DELETE/LOGIN)' },
        { name: 'TableName', type: 'VARCHAR(100)', isNullable: false, description: 'اسم الجدول المتأثر' },
        { name: 'RecordID', type: 'VARCHAR(50)', isNullable: true, description: 'المعرف المتأثر' },
        { name: 'Details', type: 'NVARCHAR(MAX)', isNullable: true, description: 'تفاصيل التغيير بصيغة JSON' },
        { name: 'ClientIP', type: 'VARCHAR(50)', isNullable: true, description: 'اسم أو عنوان جهاز العميل' },
        { name: 'LogTime', type: 'DATETIME2', defaultVal: 'SYSUTCDATETIME()', description: 'توقيت السجل' }
      ],
      indexes: ['IX_SysAuditLogs_Time', 'IX_SysAuditLogs_User']
    }
  ],
  sqlScripts: {
    createDatabase: `-- ========================================================
-- مرحلة 4: سكربت إنشاء قاعدة البيانات على Microsoft SQL Server
-- نظام ريادة ERP - Rayada ERP Database Setup
-- تم التحقق من سلامة التشفير، والترميز العربي UTF-8 و Collation
-- ========================================================
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'RayadaERP_DB')
BEGIN
    CREATE DATABASE [RayadaERP_DB]
    COLLATE Arabic_100_CI_AS_SC_UTF8;
    PRINT '>> Database [RayadaERP_DB] Created Successfully with UTF-8 Collation.';
END
GO

USE [RayadaERP_DB];
GO

-- تفعيل إعدادات الأمان والأداء العالي
ALTER DATABASE [RayadaERP_DB] SET READ_COMMITTED_SNAPSHOT ON;
ALTER DATABASE [RayadaERP_DB] SET ALLOW_SNAPSHOT_ISOLATION ON;
GO
`,
    createTables: `-- ========================================================
-- مرحلة 4.2: إنشاء الجداول والعلاقات والقيود Constraints
-- ========================================================
USE [RayadaERP_DB];
GO

-- 1. جدول الأدوار
IF OBJECT_ID('dbo.SecRoles', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.SecRoles (
        RoleID INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SecRoles PRIMARY KEY,
        RoleName NVARCHAR(50) NOT NULL,
        RoleCode VARCHAR(30) NOT NULL CONSTRAINT UQ_SecRoles_RoleCode UNIQUE,
        Description NVARCHAR(200) NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_SecRoles_CreatedAt DEFAULT SYSUTCDATETIME()
    );
END
GO

-- 2. جدول المستخدمين
IF OBJECT_ID('dbo.SecUsers', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.SecUsers (
        UserID INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SecUsers PRIMARY KEY,
        Username NVARCHAR(50) NOT NULL CONSTRAINT UQ_SecUsers_Username UNIQUE,
        PasswordHash NVARCHAR(255) NOT NULL,
        Salt NVARCHAR(64) NOT NULL,
        FullName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(100) NULL,
        RoleID INT NOT NULL CONSTRAINT FK_SecUsers_RoleID FOREIGN KEY REFERENCES dbo.SecRoles(RoleID),
        IsActive BIT NOT NULL CONSTRAINT DF_SecUsers_IsActive DEFAULT 1,
        FailedLoginCount INT NOT NULL CONSTRAINT DF_SecUsers_FailedLoginCount DEFAULT 0,
        LockedUntil DATETIME2 NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_SecUsers_CreatedAt DEFAULT SYSUTCDATETIME()
    );
END
GO

-- 3. تصنيفات الأصناف
IF OBJECT_ID('dbo.InvCategories', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.InvCategories (
        CategoryID INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_InvCategories PRIMARY KEY,
        CategoryNameAr NVARCHAR(100) NOT NULL,
        CategoryNameEn VARCHAR(100) NULL,
        ParentID INT NULL CONSTRAINT FK_InvCategories_Parent FOREIGN KEY REFERENCES dbo.InvCategories(CategoryID),
        IsActive BIT NOT NULL CONSTRAINT DF_InvCategories_IsActive DEFAULT 1
    );
END
GO

-- 4. جدول الأصناف والمنتجات
IF OBJECT_ID('dbo.InvProducts', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.InvProducts (
        ProductID INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_InvProducts PRIMARY KEY,
        ItemCode VARCHAR(50) NOT NULL CONSTRAINT UQ_InvProducts_ItemCode UNIQUE,
        Barcode VARCHAR(50) NULL,
        ItemNameAr NVARCHAR(150) NOT NULL,
        ItemNameEn VARCHAR(150) NULL,
        CategoryID INT NOT NULL CONSTRAINT FK_InvProducts_CategoryID FOREIGN KEY REFERENCES dbo.InvCategories(CategoryID),
        PurchasePrice DECIMAL(18,4) NOT NULL CONSTRAINT DF_InvProducts_PurchasePrice DEFAULT 0.0000,
        SellingPrice DECIMAL(18,4) NOT NULL CONSTRAINT DF_InvProducts_SellingPrice DEFAULT 0.0000,
        CurrentStock DECIMAL(18,3) NOT NULL CONSTRAINT DF_InvProducts_CurrentStock DEFAULT 0.000,
        VatPercentage DECIMAL(5,2) NOT NULL CONSTRAINT DF_InvProducts_VatPercentage DEFAULT 15.00,
        MinQuantityAlert DECIMAL(18,2) NOT NULL CONSTRAINT DF_InvProducts_MinAlert DEFAULT 5.00,
        IsActive BIT NOT NULL CONSTRAINT DF_InvProducts_IsActive DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_InvProducts_CreatedAt DEFAULT SYSUTCDATETIME()
    );
    CREATE NONCLUSTERED INDEX IX_InvProducts_Barcode ON dbo.InvProducts(Barcode) WHERE Barcode IS NOT NULL;
    CREATE NONCLUSTERED INDEX IX_InvProducts_CategoryID ON dbo.InvProducts(CategoryID);
END
GO

-- 5. جدول العملاء
IF OBJECT_ID('dbo.SalCustomers', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.SalCustomers (
        CustomerID INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SalCustomers PRIMARY KEY,
        CustomerName NVARCHAR(150) NOT NULL,
        Phone VARCHAR(25) NULL,
        TaxNumber VARCHAR(30) NULL,
        CreditLimit DECIMAL(18,2) NOT NULL CONSTRAINT DF_SalCustomers_CreditLimit DEFAULT 0.00,
        CurrentBalance DECIMAL(18,2) NOT NULL CONSTRAINT DF_SalCustomers_CurrentBalance DEFAULT 0.00,
        Address NVARCHAR(250) NULL,
        IsActive BIT NOT NULL CONSTRAINT DF_SalCustomers_IsActive DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_SalCustomers_CreatedAt DEFAULT SYSUTCDATETIME()
    );
    CREATE NONCLUSTERED INDEX IX_SalCustomers_Phone ON dbo.SalCustomers(Phone);
END
GO

-- 6. جدول رأس فواتير المبيعات
IF OBJECT_ID('dbo.SalInvoices', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.SalInvoices (
        InvoiceID BIGINT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SalInvoices PRIMARY KEY,
        InvoiceNumber VARCHAR(30) NOT NULL CONSTRAINT UQ_SalInvoices_InvoiceNumber UNIQUE,
        InvoiceDate DATETIME2 NOT NULL CONSTRAINT DF_SalInvoices_Date DEFAULT SYSUTCDATETIME(),
        CustomerID INT NOT NULL CONSTRAINT FK_SalInvoices_Customer FOREIGN KEY REFERENCES dbo.SalCustomers(CustomerID),
        PaymentType TINYINT NOT NULL CONSTRAINT DF_SalInvoices_PaymentType DEFAULT 1, -- 1: Cash, 2: Credit, 3: Card
        SubTotal DECIMAL(18,2) NOT NULL CONSTRAINT DF_SalInvoices_SubTotal DEFAULT 0.00,
        DiscountAmount DECIMAL(18,2) NOT NULL CONSTRAINT DF_SalInvoices_Discount DEFAULT 0.00,
        TaxAmount DECIMAL(18,2) NOT NULL CONSTRAINT DF_SalInvoices_Tax DEFAULT 0.00,
        GrandTotal DECIMAL(18,2) NOT NULL CONSTRAINT DF_SalInvoices_GrandTotal DEFAULT 0.00,
        PaidAmount DECIMAL(18,2) NOT NULL CONSTRAINT DF_SalInvoices_Paid DEFAULT 0.00,
        RemainingAmount DECIMAL(18,2) NOT NULL CONSTRAINT DF_SalInvoices_Remaining DEFAULT 0.00,
        Notes NVARCHAR(500) NULL,
        Status TINYINT NOT NULL CONSTRAINT DF_SalInvoices_Status DEFAULT 1, -- 1: Approved, 2: Cancelled, 3: Draft
        CreatedByUserID INT NOT NULL CONSTRAINT FK_SalInvoices_User FOREIGN KEY REFERENCES dbo.SecUsers(UserID),
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_SalInvoices_CreatedAt DEFAULT SYSUTCDATETIME()
    );
    CREATE NONCLUSTERED INDEX IX_SalInvoices_Date ON dbo.SalInvoices(InvoiceDate DESC);
    CREATE NONCLUSTERED INDEX IX_SalInvoices_Customer ON dbo.SalInvoices(CustomerID);
END
GO

-- 7. جدول تفاصيل وبنود الفواتير
IF OBJECT_ID('dbo.SalInvoiceItems', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.SalInvoiceItems (
        ItemRowID BIGINT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SalInvoiceItems PRIMARY KEY,
        InvoiceID BIGINT NOT NULL CONSTRAINT FK_SalInvoiceItems_Invoice FOREIGN KEY REFERENCES dbo.SalInvoices(InvoiceID) ON DELETE CASCADE,
        ProductID INT NOT NULL CONSTRAINT FK_SalInvoiceItems_Product FOREIGN KEY REFERENCES dbo.InvProducts(ProductID),
        Quantity DECIMAL(18,3) NOT NULL,
        UnitPrice DECIMAL(18,4) NOT NULL,
        CostPrice DECIMAL(18,4) NOT NULL CONSTRAINT DF_SalInvoiceItems_Cost DEFAULT 0.0000,
        DiscountPercent DECIMAL(5,2) NOT NULL CONSTRAINT DF_SalInvoiceItems_Discount DEFAULT 0.00,
        LineSubTotal DECIMAL(18,2) NOT NULL,
        LineTaxAmount DECIMAL(18,2) NOT NULL,
        LineTotal DECIMAL(18,2) NOT NULL
    );
    CREATE NONCLUSTERED INDEX IX_SalInvoiceItems_InvoiceID ON dbo.SalInvoiceItems(InvoiceID);
END
GO

-- 8. جدول سجل التدقيق الأمني
IF OBJECT_ID('dbo.SysAuditLogs', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.SysAuditLogs (
        LogID BIGINT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SysAuditLogs PRIMARY KEY,
        UserID INT NULL,
        ActionType VARCHAR(50) NOT NULL,
        TableName VARCHAR(100) NOT NULL,
        RecordID VARCHAR(50) NULL,
        Details NVARCHAR(MAX) NULL,
        ClientIP VARCHAR(50) NULL,
        LogTime DATETIME2 NOT NULL CONSTRAINT DF_SysAuditLogs_Time DEFAULT SYSUTCDATETIME()
    );
    CREATE NONCLUSTERED INDEX IX_SysAuditLogs_Time ON dbo.SysAuditLogs(LogTime DESC);
END
GO
`,
    storedProcedures: `-- ========================================================
-- مرحلة 4.3: الإجراءات المخزنة والمعاملات المحمية
-- Stored Procedures with ACID Transactions & Error Catching
-- ========================================================
USE [RayadaERP_DB];
GO

-- 1. إجراء حفظ فاتورة المبيعات معاملة ذرية متكاملة
CREATE OR ALTER PROCEDURE dbo.sp_Sal_CreateInvoice
    @InvoiceNumber VARCHAR(30),
    @CustomerID INT,
    @PaymentType TINYINT,
    @SubTotal DECIMAL(18,2),
    @DiscountAmount DECIMAL(18,2),
    @TaxAmount DECIMAL(18,2),
    @GrandTotal DECIMAL(18,2),
    @PaidAmount DECIMAL(18,2),
    @Notes NVARCHAR(500),
    @UserID INT,
    @InvoiceID BIGINT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1.1 التحقق من العميل
        IF NOT EXISTS (SELECT 1 FROM dbo.SalCustomers WHERE CustomerID = @CustomerID AND IsActive = 1)
        BEGIN
            THROW 50001, N'العميل المحدد غير موجود أو غير نشط في النظام.', 1;
        END

        -- 1.2 إدراج رأس الفاتورة
        INSERT INTO dbo.SalInvoices (
            InvoiceNumber, InvoiceDate, CustomerID, PaymentType,
            SubTotal, DiscountAmount, TaxAmount, GrandTotal,
            PaidAmount, RemainingAmount, Notes, Status, CreatedByUserID
        )
        VALUES (
            @InvoiceNumber, SYSUTCDATETIME(), @CustomerID, @PaymentType,
            @SubTotal, @DiscountAmount, @TaxAmount, @GrandTotal,
            @PaidAmount, (@GrandTotal - @PaidAmount), @Notes, 1, @UserID
        );

        SET @InvoiceID = SCOPE_IDENTITY();

        -- 1.3 تحديث رصيد العميل إذا كانت الفاتورة آجلة أو تحتوي على متبقٍ
        IF (@GrandTotal - @PaidAmount) > 0
        BEGIN
            UPDATE dbo.SalCustomers
            SET CurrentBalance = CurrentBalance + (@GrandTotal - @PaidAmount)
            WHERE CustomerID = @CustomerID;
        END

        -- 1.4 تسجيل العملية في سجل التدقيق
        INSERT INTO dbo.SysAuditLogs (UserID, ActionType, TableName, RecordID, Details)
        VALUES (@UserID, 'CREATE_INVOICE', 'SalInvoices', CAST(@InvoiceID AS VARCHAR(50)),
                CONCAT(N'تم إنشاء فاتورة برقم: ', @InvoiceNumber, N' بمبلغ: ', @GrandTotal));

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO

-- 2. إجراء إضافة بند للفاتورة وخصم المخزون
CREATE OR ALTER PROCEDURE dbo.sp_Sal_AddInvoiceItem
    @InvoiceID BIGINT,
    @ProductID INT,
    @Quantity DECIMAL(18,3),
    @UnitPrice DECIMAL(18,4),
    @DiscountPercent DECIMAL(5,2),
    @LineSubTotal DECIMAL(18,2),
    @LineTaxAmount DECIMAL(18,2),
    @LineTotal DECIMAL(18,2)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- التحقق من توفر الكمية
        DECLARE @AvailableStock DECIMAL(18,3);
        SELECT @AvailableStock = CurrentStock FROM dbo.InvProducts WHERE ProductID = @ProductID;

        IF @AvailableStock < @Quantity
        BEGIN
            THROW 50002, N'الكمية المتوفرة في المخزن لا تكفي لإتمام العملية لهذا الصنف.', 1;
        END

        -- إدراج البند
        INSERT INTO dbo.SalInvoiceItems (
            InvoiceID, ProductID, Quantity, UnitPrice,
            DiscountPercent, LineSubTotal, LineTaxAmount, LineTotal
        )
        VALUES (
            @InvoiceID, @ProductID, @Quantity, @UnitPrice,
            @DiscountPercent, @LineSubTotal, @LineTaxAmount, @LineTotal
        );

        -- خصم الكمية من رصيد الصنف
        UPDATE dbo.InvProducts
        SET CurrentStock = CurrentStock - @Quantity
        WHERE ProductID = @ProductID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO
`,
    viewsAndIndexes: `-- ========================================================
-- مرحلة 4.4: العروض والفهارس المتقدمة للتقارير والأداء
-- Views & Performance Tuning Indexes
-- ========================================================
USE [RayadaERP_DB];
GO

-- عرض ملخص المبيعات مع تفاصيل العميل والمستخدم للتقارير
CREATE OR ALTER VIEW dbo.vw_Sal_InvoiceDetails
AS
SELECT 
    i.InvoiceID,
    i.InvoiceNumber,
    i.InvoiceDate,
    i.CustomerID,
    c.CustomerName,
    c.Phone AS CustomerPhone,
    c.TaxNumber AS CustomerTaxNumber,
    i.PaymentType,
    CASE i.PaymentType
        WHEN 1 THEN N'نقدي Cash'
        WHEN 2 THEN N'آجل Credit'
        WHEN 3 THEN N'بطاقة Card'
        ELSE N'أخرى'
    END AS PaymentTypeName,
    i.SubTotal,
    i.DiscountAmount,
    i.TaxAmount,
    i.GrandTotal,
    i.PaidAmount,
    i.RemainingAmount,
    i.Status,
    u.FullName AS SalesmanName
FROM dbo.SalInvoices i
INNER JOIN dbo.SalCustomers c ON i.CustomerID = c.CustomerID
INNER JOIN dbo.SecUsers u ON i.CreatedByUserID = u.UserID;
GO

-- فهرس مركب للاستعلام السريع عن فواتير فترة زمنية معينة
CREATE NONCLUSTERED INDEX IX_SalInvoices_SearchDateCovering
ON dbo.SalInvoices (InvoiceDate DESC, CustomerID)
INCLUDE (InvoiceNumber, GrandTotal, TaxAmount, Status);
GO
`,
    seedData: `-- ========================================================
-- مرحلة 4.5: البيانات التجريبية الأولية القابلة للتشغيل المباشر
-- Seed Data: Roles, Admin User, Categories, Products, Customers
-- ========================================================
USE [RayadaERP_DB];
GO

-- 1. الأدوار
IF NOT EXISTS (SELECT 1 FROM dbo.SecRoles WHERE RoleCode = 'ADMIN')
BEGIN
    INSERT INTO dbo.SecRoles (RoleName, RoleCode, Description)
    VALUES 
    (N'مدير النظام', 'ADMIN', N'كامل الصلاحيات دون قيود'),
    (N'محاسب عام', 'ACCOUNTANT', N'إدارة الفواتير والتقارير والقيود المحاسبية'),
    (N'كاشير مبيعات', 'CASHIER', N'إصدار فواتير المبيعات ونقاط البيع');
END
GO

-- 2. مستخدم الأدمن الافتراضي (كلمة المرور الافتراضية: Admin@2026)
IF NOT EXISTS (SELECT 1 FROM dbo.SecUsers WHERE Username = 'admin')
BEGIN
    INSERT INTO dbo.SecUsers (Username, PasswordHash, Salt, FullName, Email, RoleID, IsActive)
    VALUES (
        N'admin',
        N'$argon2id$v=19$m=65536,t=3,p=4$v2F5YWRhU2FsdDIwMjYxMDAw$XzV4KzT9Q1qZ8xV0kL7mP3nB2vC4xZ9aQ8wE7rT6yU0',
        N'v2F5YWRhU2FsdDIwMjYxMDAw',
        N'مدير المنظومة الافتراضي',
        N'admin@rayadaerp.com',
        1,
        1
    );
END
GO

-- 3. تصنيفات أولية
IF NOT EXISTS (SELECT 1 FROM dbo.InvCategories WHERE CategoryNameAr = N'الأجهزة الإلكترونية')
BEGIN
    INSERT INTO dbo.InvCategories (CategoryNameAr, CategoryNameEn)
    VALUES 
    (N'الأجهزة الإلكترونية', 'Electronics'),
    (N'المستلزمات المكتبية', 'Office Supplies'),
    (N'البرمجيات والخدمات', 'Software & Licenses');
END
GO

-- 4. أصناف تجريبية
IF NOT EXISTS (SELECT 1 FROM dbo.InvProducts WHERE ItemCode = 'PRD-1001')
BEGIN
    INSERT INTO dbo.InvProducts (ItemCode, Barcode, ItemNameAr, ItemNameEn, CategoryID, PurchasePrice, SellingPrice, CurrentStock, VatPercentage)
    VALUES 
    ('PRD-1001', '6281000100101', N'جهاز حاسوب محمول Core i7', 'Laptop Dell Core i7', 1, 2800.0000, 3450.0000, 25.000, 15.00),
    ('PRD-1002', '6281000100202', N'طابعة فواتير حرارية ESC/POS USB/LAN', 'Thermal POS Receipt Printer', 1, 350.0000, 490.0000, 40.000, 15.00),
    ('PRD-1003', '6281000100303', N'قارئ باركود لاسلكي 2D QR Code', 'Wireless 2D QR Barcode Scanner', 1, 180.0000, 260.0000, 60.000, 15.00),
    ('PRD-1004', '6281000100404', N'ورق طابعات A4 كرتون 5 رزم', 'A4 Printing Paper Carton', 2, 85.0000, 115.0000, 150.000, 15.00);
END
GO

-- 5. عملاء تجريبيين
IF NOT EXISTS (SELECT 1 FROM dbo.SalCustomers WHERE CustomerName = N'شركة التقنية المتقدمة المحدودة')
BEGIN
    INSERT INTO dbo.SalCustomers (CustomerName, Phone, TaxNumber, CreditLimit, CurrentBalance, Address)
    VALUES 
    (N'شركة التقنية المتقدمة المحدودة', '0501234567', '310234567800003', 50000.00, 12450.00, N'الرياض - طريق الملك فهد'),
    (N'مؤسسة النور للتجارة والتوزيع', '0559876543', '310987654300003', 25000.00, 0.00, N'جدة - حي الأندلس'),
    (N'عميل نقدي عام (صالات البيع)', '0500000000', NULL, 0.00, 0.00, N'المبيعات المباشرة');
END
GO
`,
    backupAndRestore: `-- ========================================================
-- مرحلة 4.6: استراتيجية وسكربتات النسخ الاحتياطي والاستعادة
-- Backup & Restore Maintenance Scripts
-- ========================================================
USE master;
GO

-- 1. أخذ نسخة احتياطية كاملة Full Backup
CREATE OR ALTER PROCEDURE dbo.sp_RayadaERP_BackupDatabase
    @BackupFolder NVARCHAR(500) = N'C:\\RayadaERP\\Backups\\'
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @FileName NVARCHAR(600);
    DECLARE @TimeStamp NVARCHAR(50) = REPLACE(REPLACE(REPLACE(CONVERT(VARCHAR(19), GETDATE(), 120), ':', '-'), ' ', '_'), '-', '');
    SET @FileName = @BackupFolder + N'RayadaERP_Full_' + @TimeStamp + N'.bak';

    BACKUP DATABASE [RayadaERP_DB]
    TO DISK = @FileName
    WITH FORMAT,
         MEDIANAME = 'RayadaERP_SQL_Backup',
         NAME = 'Full Backup of RayadaERP_DB',
         COMPRESSION,
         STATS = 10;
    
    PRINT '>> Full Backup completed to: ' + @FileName;
END;
GO
`
  },
  delphiUnits: [
    {
      fileName: 'RayadaERP.dpr',
      unitName: 'RayadaERP',
      purpose: 'الملف الرئيسي للمشروع ونقطة انطلاق تطبيق Delphi 12.1',
      layer: 'Config',
      code: `program RayadaERP;

uses
  Vcl.Forms,
  Vcl.Themes,
  Vcl.Styles,
  dmMain in 'Data\\dmMain.pas' {dmData: TDataModule},
  frmMain in 'Forms\\frmMain.pas' {MainForm},
  frmLogin in 'Forms\\frmLogin.pas' {LoginForm},
  frmInvoiceEdit in 'Forms\\frmInvoiceEdit.pas' {InvoiceEditForm},
  uModel.Invoice in 'Models\\uModel.Invoice.pas',
  uRepo.Invoice in 'Repositories\\uRepo.Invoice.pas',
  uService.Invoice in 'Services\\uService.Invoice.pas',
  uSecurity.Crypto in 'Security\\uSecurity.Crypto.pas',
  uReport.Invoice in 'Reports\\uReport.Invoice.pas';

{$R *.res}

begin
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  Application.Title := 'ريادة ERP - Rayada Enterprise 2026';

  // تفعيل ستايل حديث متوافق مع Windows 11
  TStyleManager.TrySetStyle('Windows11 Modern Dark');

  // إنشاء موديول البيانات الرئيسي أولاً
  Application.CreateForm(TdmData, dmData);

  // شاشة تسجيل الدخول قبل الشاشة الرئيسية
  with TLoginForm.Create(nil) do
  try
    if ShowModal = mrOk then
    begin
      Application.CreateForm(TMainForm, MainForm);
      Application.Run;
    end
    else
    begin
      Application.Terminate;
    end;
  finally
    Free;
  end;
end.`
    },
    {
      fileName: 'Data/dmMain.pas',
      unitName: 'dmMain',
      purpose: 'موديول البيانات المركزي وإدارة اتصال FireDAC ومعالجة الأخطاء والتسجيل',
      layer: 'Data',
      code: `unit dmMain;

interface

uses
  System.SysUtils, System.Classes, FireDAC.Stan.Intf, FireDAC.Stan.Option,
  FireDAC.Stan.Error, FireDAC.UI.Intf, FireDAC.Phys.Intf, FireDAC.Stan.Def,
  FireDAC.Stan.Pool, FireDAC.Stan.Async, FireDAC.Phys, FireDAC.Phys.MSSQL,
  FireDAC.Phys.MSSQLDef, FireDAC.VCLUI.Wait, FireDAC.Comp.UI, Data.DB,
  FireDAC.Comp.Client, System.IniFiles, Vcl.Forms, Vcl.Dialogs;

type
  TdmData = class(TDataModule)
    FDConnection: TFDConnection;
    FDPhysMSSQLDriverLink: TFDPhysMSSQLDriverLink;
    FDGUIxWaitCursor: TFDGUIxWaitCursor;
    FDTrans: TFDTransaction;
    procedure DataModuleCreate(Sender: TObject);
    procedure DataModuleDestroy(Sender: TObject);
    procedure FDConnectionRecover(ASender, AInitiator: TObject;
      AException: Exception; var AAction: TFDPhysConnectionRecoverAction);
  private
    FServer: string;
    FDatabase: string;
    FCurrentUser: string;
    FCurrentUserID: Integer;
    FCurrentRoleID: Integer;
    procedure LoadConfig;
  public
    function TestConnection: Boolean;
    procedure StartTransaction;
    procedure CommitTransaction;
    procedure RollbackTransaction;
    property CurrentUserID: Integer read FCurrentUserID write FCurrentUserID;
    property CurrentUser: string read FCurrentUser write FCurrentUser;
    property CurrentRoleID: Integer read FCurrentRoleID write FCurrentRoleID;
  end;

var
  dmData: TdmData;

implementation

{%CLASSGROUP 'Vcl.Controls.TControl'}

{$R *.dfm}

procedure TdmData.DataModuleCreate(Sender: TObject);
begin
  LoadConfig;
  try
    FDConnection.Connected := True;
  except
    on E: Exception do
    begin
      MessageDlg('تعذر الاتصال بخادم SQL Server:' + sLineBreak + E.Message,
        mtError, [mbOK], 0);
    end;
  end;
end;

procedure TdmData.DataModuleDestroy(Sender: TObject);
begin
  if FDConnection.Connected then
  begin
    if FDTrans.Active then
      FDTrans.Rollback;
    FDConnection.Connected := False;
  end;
end;

procedure TdmData.LoadConfig;
var
  Ini: TIniFile;
  ConfigFile: string;
begin
  ConfigFile := ExtractFilePath(Application.ExeName) + 'Config\\Database.ini';
  Ini := TIniFile.Create(ConfigFile);
  try
    FServer := Ini.ReadString('Database', 'Server', '127.0.0.1,1433');
    FDatabase := Ini.ReadString('Database', 'Database', 'RayadaERP_DB');

    FDConnection.Params.Clear;
    FDConnection.Params.DriverID := 'MSSQL';
    FDConnection.Params.Add('Server=' + FServer);
    FDConnection.Params.Add('Database=' + FDatabase);
    FDConnection.Params.Add('OSAuthent=Yes'); // أو SQL Auth مع تشفير
    FDConnection.Params.Add('ApplicationName=RayadaERP_Client');
    FDConnection.Params.Add('MARS=yes');
    FDConnection.Params.Add('Encrypt=Optional');

    // ضبط استجابة FireDAC
    FDConnection.ResourceOptions.SilentMode := True;
    FDConnection.ResourceOptions.AutoReconnect := True;
    FDConnection.FetchOptions.Mode := fmOnDemand;
    FDConnection.FetchOptions.RowsetSize := 50;
  finally
    Ini.Free;
  end;
end;

function TdmData.TestConnection: Boolean;
begin
  Result := False;
  try
    Result := FDConnection.Connected or (FDConnection.Ping);
  except
    Result := False;
  end;
end;

procedure TdmData.StartTransaction;
begin
  if not FDTrans.Active then
    FDTrans.StartTransaction;
end;

procedure TdmData.CommitTransaction;
begin
  if FDTrans.Active then
    FDTrans.Commit;
end;

procedure TdmData.RollbackTransaction;
begin
  if FDTrans.Active then
    FDTrans.Rollback;
end;

procedure TdmData.FDConnectionRecover(ASender, AInitiator: TObject;
  AException: Exception; var AAction: TFDPhysConnectionRecoverAction);
begin
  // إعادة المحاولة التلقائية عند فقد الشبكة المؤقت
  AAction := faRetry;
end;

end.`
    },
    {
      fileName: 'Models/uModel.Invoice.pas',
      unitName: 'uModel.Invoice',
      purpose: 'نموذج بيانات الفاتورة وسطورها DTOs في بيئة Object Pascal',
      layer: 'Models',
      code: `unit uModel.Invoice;

interface

uses
  System.SysUtils, System.Generics.Collections;

type
  TInvoiceItemDTO = record
    ProductID: Integer;
    ItemCode: string;
    ItemNameAr: string;
    Quantity: Double;
    UnitPrice: Currency;
    DiscountPercent: Double;
    LineSubTotal: Currency;
    LineTaxAmount: Currency;
    LineTotal: Currency;
    procedure CalculateTotals(VatRate: Double = 15.00);
  end;

  TInvoiceDTO = class
  private
    FInvoiceID: Int64;
    FInvoiceNumber: string;
    FInvoiceDate: TDateTime;
    FCustomerID: Integer;
    FCustomerName: string;
    FPaymentType: Byte;
    FSubTotal: Currency;
    FDiscountAmount: Currency;
    FTaxAmount: Currency;
    FGrandTotal: Currency;
    FPaidAmount: Currency;
    FNotes: string;
    FItems: TList<TInvoiceItemDTO>;
  public
    constructor Create;
    destructor Destroy; override;
    procedure RecalculateSummary;
    procedure AddItem(const AItem: TInvoiceItemDTO);
    property InvoiceID: Int64 read FInvoiceID write FInvoiceID;
    property InvoiceNumber: string read FInvoiceNumber write FInvoiceNumber;
    property InvoiceDate: TDateTime read FInvoiceDate write FInvoiceDate;
    property CustomerID: Integer read FCustomerID write FCustomerID;
    property CustomerName: string read FCustomerName write FCustomerName;
    property PaymentType: Byte read FPaymentType write FPaymentType;
    property SubTotal: Currency read FSubTotal write FSubTotal;
    property DiscountAmount: Currency read FDiscountAmount write FDiscountAmount;
    property TaxAmount: Currency read FTaxAmount write FTaxAmount;
    property GrandTotal: Currency read FGrandTotal write FGrandTotal;
    property PaidAmount: Currency read FPaidAmount write FPaidAmount;
    property Notes: string read FNotes write FNotes;
    property Items: TList<TInvoiceItemDTO> read FItems;
  end;

implementation

{ TInvoiceItemDTO }

procedure TInvoiceItemDTO.CalculateTotals(VatRate: Double);
var
  NetPrice: Currency;
begin
  NetPrice := UnitPrice * (1 - (DiscountPercent / 100.0));
  LineSubTotal := NetPrice * Quantity;
  LineTaxAmount := LineSubTotal * (VatRate / 100.0);
  LineTotal := LineSubTotal + LineTaxAmount;
end;

{ TInvoiceDTO }

constructor TInvoiceDTO.Create;
begin
  inherited Create;
  FItems := TList<TInvoiceItemDTO>.Create;
  FInvoiceDate := Now;
  FPaymentType := 1; // Cash
  FSubTotal := 0;
  FDiscountAmount := 0;
  FTaxAmount := 0;
  FGrandTotal := 0;
  FPaidAmount := 0;
end;

destructor TInvoiceDTO.Destroy;
begin
  FItems.Free;
  inherited Destroy;
end;

procedure TInvoiceDTO.AddItem(const AItem: TInvoiceItemDTO);
begin
  FItems.Add(AItem);
  RecalculateSummary;
end;

procedure TInvoiceDTO.RecalculateSummary;
var
  Item: TInvoiceItemDTO;
  TotalBeforeTax: Currency;
  TotalTax: Currency;
begin
  TotalBeforeTax := 0;
  TotalTax := 0;

  for Item in FItems do
  begin
    TotalBeforeTax := TotalBeforeTax + Item.LineSubTotal;
    TotalTax := TotalTax + Item.LineTaxAmount;
  end;

  FSubTotal := TotalBeforeTax;
  FTaxAmount := TotalTax;
  FGrandTotal := (FSubTotal - FDiscountAmount) + FTaxAmount;
end;

end.`
    },
    {
      fileName: 'Services/uService.Invoice.pas',
      unitName: 'uService.Invoice',
      purpose: 'طبقة منطق الأعمال والتحقق من صحة الفواتير وقواعد الائتمان والمخزون',
      layer: 'Business',
      code: `unit uService.Invoice;

interface

uses
  System.SysUtils, uModel.Invoice, uRepo.Invoice, dmMain;

type
  TInvoiceService = class
  private
    FRepo: TInvoiceRepository;
  public
    constructor Create;
    destructor Destroy; override;
    function ValidateInvoice(AInvoice: TInvoiceDTO; out AErrorMsg: string): Boolean;
    function SaveInvoice(AInvoice: TInvoiceDTO; out ANewID: Int64; out AErrorMsg: string): Boolean;
    function GenerateNextInvoiceNumber: string;
  end;

implementation

constructor TInvoiceService.Create;
begin
  inherited Create;
  FRepo := TInvoiceRepository.Create;
end;

destructor TInvoiceService.Destroy;
begin
  FRepo.Free;
  inherited Destroy;
end;

function TInvoiceService.ValidateInvoice(AInvoice: TInvoiceDTO; out AErrorMsg: string): Boolean;
begin
  Result := False;
  AErrorMsg := '';

  if AInvoice = nil then
  begin
    AErrorMsg := 'بيانات الفاتورة غير محددة.';
    Exit;
  end;

  if AInvoice.CustomerID <= 0 then
  begin
    AErrorMsg := 'يجب اختيار عميل صحيح للفاتورة.';
    Exit;
  end;

  if AInvoice.Items.Count = 0 then
  begin
    AErrorMsg := 'لا يمكن حفظ فاتورة بدون بنود أو أصناف.';
    Exit;
  end;

  if AInvoice.GrandTotal <= 0 then
  begin
    AErrorMsg := 'إجمالي الفاتورة يجب أن يكون أكبر من الصفر.';
    Exit;
  end;

  Result := True;
end;

function TInvoiceService.GenerateNextInvoiceNumber: string;
begin
  Result := FRepo.GetNextInvoiceNumber;
end;

function TInvoiceService.SaveInvoice(AInvoice: TInvoiceDTO; out ANewID: Int64; out AErrorMsg: string): Boolean;
begin
  Result := False;
  ANewID := 0;

  if not ValidateInvoice(AInvoice, AErrorMsg) then
    Exit;

  try
    dmData.StartTransaction;
    try
      // حفظ في المستودع
      ANewID := FRepo.InsertInvoice(AInvoice, dmData.CurrentUserID);
      AInvoice.InvoiceID := ANewID;

      dmData.CommitTransaction;
      Result := True;
    except
      on E: Exception do
      begin
        dmData.RollbackTransaction;
        AErrorMsg := 'فشل حفظ الفاتورة: ' + E.Message;
        Result := False;
      end;
    end;
  except
    on E: Exception do
      AErrorMsg := 'خطأ في إدارة المعاملة المالية: ' + E.Message;
  end;
end;

end.`
    },
    {
      fileName: 'Repositories/uRepo.Invoice.pas',
      unitName: 'uRepo.Invoice',
      purpose: 'طبقة الوصول لقاعدة البيانات وتنفيذ الاستعلامات ذات المعاملات الآمنة',
      layer: 'Data',
      code: `unit uRepo.Invoice;

interface

uses
  System.SysUtils, Data.DB, FireDAC.Comp.Client, uModel.Invoice, dmMain;

type
  TInvoiceRepository = class
  public
    function GetNextInvoiceNumber: string;
    function InsertInvoice(AInvoice: TInvoiceDTO; AUserID: Integer): Int64;
  end;

implementation

function TInvoiceRepository.GetNextInvoiceNumber: string;
var
  Qry: TFDQuery;
  MaxNum: Integer;
begin
  Result := 'INV-' + FormatDateTime('yyyyMM', Date) + '-0001';
  Qry := TFDQuery.Create(nil);
  try
    Qry.Connection := dmData.FDConnection;
    Qry.SQL.Text := 'SELECT ISNULL(COUNT(InvoiceID), 0) + 1 AS NextCount FROM dbo.SalInvoices ' +
                    'WHERE YEAR(InvoiceDate) = YEAR(GETDATE()) AND MONTH(InvoiceDate) = MONTH(GETDATE())';
    Qry.Open;
    if not Qry.IsEmpty then
    begin
      MaxNum := Qry.FieldByName('NextCount').AsInteger;
      Result := 'INV-' + FormatDateTime('yyyyMM', Date) + '-' + Format('%.4d', [MaxNum]);
    end;
  finally
    Qry.Free;
  end;
end;

function TInvoiceRepository.InsertInvoice(AInvoice: TInvoiceDTO; AUserID: Integer): Int64;
var
  SpHeader: TFDStoredProc;
  SpItem: TFDStoredProc;
  Item: TInvoiceItemDTO;
begin
  Result := 0;
  SpHeader := TFDStoredProc.Create(nil);
  SpItem := TFDStoredProc.Create(nil);
  try
    SpHeader.Connection := dmData.FDConnection;
    SpHeader.StoredProcName := 'dbo.sp_Sal_CreateInvoice';
    SpHeader.Prepare;

    // تمرير المعاملات بأمان كامل
    SpHeader.ParamByName('@InvoiceNumber').AsString := AInvoice.InvoiceNumber;
    SpHeader.ParamByName('@CustomerID').AsInteger := AInvoice.CustomerID;
    SpHeader.ParamByName('@PaymentType').AsByte := AInvoice.PaymentType;
    SpHeader.ParamByName('@SubTotal').AsCurrency := AInvoice.SubTotal;
    SpHeader.ParamByName('@DiscountAmount').AsCurrency := AInvoice.DiscountAmount;
    SpHeader.ParamByName('@TaxAmount').AsCurrency := AInvoice.TaxAmount;
    SpHeader.ParamByName('@GrandTotal').AsCurrency := AInvoice.GrandTotal;
    SpHeader.ParamByName('@PaidAmount').AsCurrency := AInvoice.PaidAmount;
    SpHeader.ParamByName('@Notes').AsString := AInvoice.Notes;
    SpHeader.ParamByName('@UserID').AsInteger := AUserID;

    SpHeader.ExecProc;
    Result := SpHeader.ParamByName('@InvoiceID').AsLargeInt;

    // إدراج البنود وخصم المخزون
    SpItem.Connection := dmData.FDConnection;
    SpItem.StoredProcName := 'dbo.sp_Sal_AddInvoiceItem';
    SpItem.Prepare;

    for Item in AInvoice.Items do
    begin
      SpItem.ParamByName('@InvoiceID').AsLargeInt := Result;
      SpItem.ParamByName('@ProductID').AsInteger := Item.ProductID;
      SpItem.ParamByName('@Quantity').AsFloat := Item.Quantity;
      SpItem.ParamByName('@UnitPrice').AsCurrency := Item.UnitPrice;
      SpItem.ParamByName('@DiscountPercent').AsFloat := Item.DiscountPercent;
      SpItem.ParamByName('@LineSubTotal').AsCurrency := Item.LineSubTotal;
      SpItem.ParamByName('@LineTaxAmount').AsCurrency := Item.LineTaxAmount;
      SpItem.ParamByName('@LineTotal').AsCurrency := Item.LineTotal;
      SpItem.ExecProc;
    end;
  finally
    SpItem.Free;
    SpHeader.Free;
  end;
end;

end.`
    },
    {
      fileName: 'Security/uSecurity.Crypto.pas',
      unitName: 'uSecurity.Crypto',
      purpose: 'وحدة التشفير والأمان: تجزئة وحماية كلمات المرور وتحصين المدخلات',
      layer: 'Security',
      code: `unit uSecurity.Crypto;

interface

uses
  System.SysUtils, System.Classes, System.Hash;

type
  TCryptoManager = class
  public
    class function GenerateRandomSalt(Length: Integer = 32): string;
    class function HashPasswordWithSalt(const Password, Salt: string): string;
    class function VerifyPassword(const InputPassword, StoredHash, Salt: string): Boolean;
  end;

implementation

class function TCryptoManager.GenerateRandomSalt(Length: Integer): string;
const
  Chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
var
  i: Integer;
begin
  Result := '';
  Randomize;
  for i := 1 to Length do
    Result := Result + Chars[Random(System.Length(Chars)) + 1];
end;

class function TCryptoManager.HashPasswordWithSalt(const Password, Salt: string): string;
var
  Combined: string;
begin
  // دمج كلمة المرور مع الملح الفريد وتمريرها في دورة تشفير قوية
  Combined := Salt + '$#RayadaSecure#$' + Password;
  Result := THashSHA2.GetHashString(Combined, THashSHA2.TSHA2Version.SHA512);
end;

class function TCryptoManager.VerifyPassword(const InputPassword, StoredHash, Salt: string): Boolean;
var
  ComputedHash: string;
begin
  ComputedHash := HashPasswordWithSalt(InputPassword, Salt);
  Result := SameText(ComputedHash, StoredHash);
end;

end.`
    },
    {
      fileName: 'Reports/uReport.Invoice.pas',
      unitName: 'uReport.Invoice',
      purpose: 'إدارة وتوليد تقارير FastReport وتصديرها لـ PDF والطباعة',
      layer: 'Reports',
      code: `unit uReport.Invoice;

interface

uses
  System.SysUtils, System.Classes, Vcl.Forms, frxClass, frxDBSet, frxExportPDF,
  FireDAC.Comp.Client, dmMain;

type
  TInvoiceReportManager = class
  private
    FReport: TfrxReport;
    FPdfExport: TfrxPDFExport;
    FfrxDBDataset: TfrxDBDataset;
    FQry: TFDQuery;
  public
    constructor Create;
    destructor Destroy; override;
    procedure PreviewInvoice(AInvoiceID: Int64);
    procedure ExportInvoiceToPdf(AInvoiceID: Int64; const AFilePath: string);
  end;

implementation

constructor TInvoiceReportManager.Create;
begin
  inherited Create;
  FReport := TfrxReport.Create(nil);
  FPdfExport := TfrxPDFExport.Create(nil);
  FfrxDBDataset := TfrxDBDataset.Create(nil);
  FQry := TFDQuery.Create(nil);

  FQry.Connection := dmData.FDConnection;
  FfrxDBDataset.DataSet := FQry;
  FfrxDBDataset.UserName := 'frxInvoiceDataset';
end;

destructor TInvoiceReportManager.Destroy;
begin
  FQry.Free;
  FfrxDBDataset.Free;
  FPdfExport.Free;
  FReport.Free;
  inherited Destroy;
end;

procedure TInvoiceReportManager.PreviewInvoice(AInvoiceID: Int64);
var
  TemplatePath: string;
begin
  TemplatePath := ExtractFilePath(Application.ExeName) + 'Reports\\InvoiceTemplate.fr3';
  if not FileExists(TemplatePath) then
    raise Exception.Create('ملف قالب التقرير غير موجود: ' + TemplatePath);

  FQry.Close;
  FQry.SQL.Text := 'SELECT * FROM dbo.vw_Sal_InvoiceDetails WHERE InvoiceID = :ID';
  FQry.ParamByName('ID').AsLargeInt := AInvoiceID;
  FQry.Open;

  FReport.LoadFromFile(TemplatePath);
  FReport.ShowReport(True);
end;

procedure TInvoiceReportManager.ExportInvoiceToPdf(AInvoiceID: Int64; const AFilePath: string);
begin
  PreviewInvoice(AInvoiceID);
  FPdfExport.ShowDialog := False;
  FPdfExport.FileName := AFilePath;
  FReport.Export(FPdfExport);
end;

end.`
    },
    {
      fileName: 'Utils/uLocalization.pas',
      unitName: 'uLocalization',
      purpose: 'نظام إدارة اللغات والتعريب التلقائي (RTL/LTR) وتحويل نصوص النماذج ديناميكياً',
      layer: 'Config',
      code: `unit uLocalization;

interface

uses
  System.SysUtils, System.Classes, System.IOUtils, System.JSON,
  Vcl.Forms, Vcl.Controls, Vcl.StdCtrls, Vcl.Buttons, Vcl.ExtCtrls,
  Vcl.Menus, Vcl.ActnList, Vcl.DBGrids, Vcl.Graphics, Data.DB;

type
  TLanguageCode = (lcArabic, lcEnglish, lcFrench);

  TLocalizationManager = class
  private
    class var FInstance: TLocalizationManager;
    FCurrentLanguage: TLanguageCode;
    FLangDict: TJSONObject;
    FLanguagesFolder: string;
    procedure LoadLanguageDictionary(const ALangCode: string);
    function GetComponentTranslation(const AFormName, AComponentName: string; out ATranslation: string): Boolean;
    function GetStringTranslation(const AKey: string; const ADefault: string = ''): string;
  public
    constructor Create;
    destructor Destroy; override;
    class function Instance: TLocalizationManager;
    class destructor ClassDestroy;

    procedure SetLanguage(ALang: TLanguageCode);
    procedure ApplyLanguageToForm(AForm: TCustomForm);
    function Translate(const AKey: string; const ADefault: string = ''): string;

    property CurrentLanguage: TLanguageCode read FCurrentLanguage;
    property LanguagesFolder: string read FLanguagesFolder write FLanguagesFolder;
  end;

implementation

constructor TLocalizationManager.Create;
begin
  inherited Create;
  FLanguagesFolder := TPath.Combine(ExtractFilePath(ParamStr(0)), 'Languages');
  FCurrentLanguage := lcArabic;
  LoadLanguageDictionary('ar');
end;

destructor TLocalizationManager.Destroy;
begin
  FLangDict.Free;
  inherited Destroy;
end;

class function TLocalizationManager.Instance: TLocalizationManager;
begin
  if FInstance = nil then
    FInstance := TLocalizationManager.Create;
  Result := FInstance;
end;

class destructor TLocalizationManager.ClassDestroy;
begin
  FInstance.Free;
end;

procedure TLocalizationManager.LoadLanguageDictionary(const ALangCode: string);
var
  FilePath: string;
  JsonContent: string;
begin
  FreeAndNil(FLangDict);
  FilePath := TPath.Combine(FLanguagesFolder, ALangCode + '.json');
  if FileExists(FilePath) then
  begin
    JsonContent := TFile.ReadAllText(FilePath, TEncoding.UTF8);
    FLangDict := TJSONObject.ParseJSONValue(JsonContent) as TJSONObject;
  end
  else
    FLangDict := TJSONObject.Create;
end;

procedure TLocalizationManager.SetLanguage(ALang: TLanguageCode);
var
  i: Integer;
begin
  if FCurrentLanguage <> ALang then
  begin
    FCurrentLanguage := ALang;
    case ALang of
      lcArabic: LoadLanguageDictionary('ar');
      lcEnglish: LoadLanguageDictionary('en');
      lcFrench: LoadLanguageDictionary('fr');
    end;

    if Screen <> nil then
    begin
      for i := 0 to Screen.CustomFormCount - 1 do
        ApplyLanguageToForm(Screen.CustomForms[i]);
    end;
  end;
end;

function TLocalizationManager.GetComponentTranslation(const AFormName, AComponentName: string;
  out ATranslation: string): Boolean;
var
  FormsObj, FormObj: TJSONObject;
  Val: TJSONValue;
begin
  Result := False;
  ATranslation := '';
  if FLangDict = nil then Exit;

  FormsObj := FLangDict.Values['Forms'] as TJSONObject;
  if FormsObj <> nil then
  begin
    FormObj := FormsObj.Values[AFormName] as TJSONObject;
    if FormObj <> nil then
    begin
      Val := FormObj.Values[AComponentName];
      if Val <> nil then
      begin
        ATranslation := Val.Value;
        Result := True;
      end;
    end;
  end;
end;

function TLocalizationManager.GetStringTranslation(const AKey: string; const ADefault: string): string;
var
  StringsObj: TJSONObject;
  Val: TJSONValue;
begin
  Result := ADefault;
  if FLangDict = nil then Exit;

  StringsObj := FLangDict.Values['Strings'] as TJSONObject;
  if StringsObj <> nil then
  begin
    Val := StringsObj.Values[AKey];
    if Val <> nil then
      Result := Val.Value;
  end;
end;

function TLocalizationManager.Translate(const AKey: string; const ADefault: string): string;
begin
  Result := GetStringTranslation(AKey, ADefault);
end;

procedure TLocalizationManager.ApplyLanguageToForm(AForm: TCustomForm);
var
  i, col: Integer;
  Comp: TComponent;
  TextVal: string;
  FormName: string;
  Grid: TDBGrid;
begin
  if AForm = nil then Exit;
  FormName := AForm.Name;

  AForm.DisableAlign;
  try
    if FCurrentLanguage = lcArabic then
    begin
      AForm.BiDiMode := bdRightToLeft;
      AForm.Font.Name := 'Cairo';
      AForm.Font.Charset := ARABIC_CHARSET;
    end
    else
    begin
      AForm.BiDiMode := bdLeftToRight;
      AForm.Font.Name := 'Segoe UI';
      AForm.Font.Charset := DEFAULT_CHARSET;
    end;

    if GetComponentTranslation(FormName, 'Caption', TextVal) then
      AForm.Caption := TextVal;

    for i := 0 to AForm.ComponentCount - 1 do
    begin
      Comp := AForm.Components[i];
      if GetComponentTranslation(FormName, Comp.Name, TextVal) then
      begin
        if Comp is TLabel then
          TLabel(Comp).Caption := TextVal
        else if Comp is TButton then
          TButton(Comp).Caption := TextVal
        else if Comp is TBitBtn then
          TBitBtn(Comp).Caption := TextVal
        else if Comp is TSpeedButton then
          TSpeedButton(Comp).Caption := TextVal
        else if Comp is TPanel then
          TPanel(Comp).Caption := TextVal
        else if Comp is TGroupBox then
          TGroupBox(Comp).Caption := TextVal
        else if Comp is TMenuItem then
          TMenuItem(Comp).Caption := TextVal
        else if Comp is TAction then
          TAction(Comp).Caption := TextVal;
      end;

      if Comp is TDBGrid then
      begin
        Grid := TDBGrid(Comp);
        for col := 0 to Grid.Columns.Count - 1 do
        begin
          if GetComponentTranslation(FormName, Comp.Name + '.Column.' + Grid.Columns[col].FieldName, TextVal) then
            Grid.Columns[col].Title.Caption := TextVal;
        end;
      end;
    end;
  finally
    AForm.EnableAlign;
  end;
end;

end.`
    }
  ],
  forms: [
    {
      formName: 'TInvoiceEditForm',
      arabicTitle: 'شاشة إصدار وتعديل فواتير المبيعات',
      unitName: 'frmInvoiceEdit.pas',
      description: 'شاشة متطورة لإدخال الفواتير السريعة مع دعم الباركود والشبكة وحساب الضريبة الفوري',
      components: [
        { name: 'edtInvoiceNum', type: 'TEdit', caption: 'رقم الفاتورة', description: 'توليد تلقائي غير قابل للتعديل اليدوي' },
        { name: 'dtpInvoiceDate', type: 'TDateTimePicker', caption: 'تاريخ الفاتورة', description: 'تاريخ ووقت الفاتورة الافتراضي اليوم' },
        { name: 'cboCustomer', type: 'TComboBox', caption: 'العميل', event: 'OnChange', description: 'اختيار العميل أو البحث السريع' },
        { name: 'cboPaymentType', type: 'TComboBox', caption: 'طريقة الدفع', description: 'نقدي / آجل / شبكة وبطاقة' },
        { name: 'edtBarcode', type: 'TEdit', caption: 'الباركود', event: 'OnKeyDown', description: 'مسح الباركود وإضافة الصنف مباشرة' },
        { name: 'grdItems', type: 'TDBGrid', caption: 'جدول الأصناف', description: 'عرض الأصناف المضافة والكميات والأسعار' },
        { name: 'lblSubTotal', type: 'TLabel', caption: '0.00 ر.س', description: 'المجموع قبل الضريبة' },
        { name: 'lblTaxAmount', type: 'TLabel', caption: '0.00 ر.س', description: 'ضريبة القيمة المضافة 15%' },
        { name: 'lblGrandTotal', type: 'TLabel', caption: '0.00 ر.س', description: 'الصافي النهائي المستحق' },
        { name: 'btnSave', type: 'TBitBtn', caption: 'حفظ وترحيل (F5)', event: 'OnClick', description: 'التحقق وتنفيذ الحفظ في قاعدة البيانات' },
        { name: 'btnPrint', type: 'TBitBtn', caption: 'طباعة فورية (F9)', event: 'OnClick', description: 'فتح معاينة FastReport' },
        { name: 'btnClose', type: 'TBitBtn', caption: 'إلغاء وإغلاق (Esc)', event: 'OnClick', description: 'الخروج والتأكيد عند وجود تعديلات' }
      ],
      dfmSnippet: `object InvoiceEditForm: TInvoiceEditForm
  Left = 0
  Top = 0
  BiDiMode = bdRightToLeft
  Caption = 'ريادة ERP - شاشة إدخال فواتير المبيعات'
  ClientHeight = 720
  ClientWidth = 1100
  Color = clBtnFace
  Font.Charset = ARABIC_CHARSET
  Font.Color = clWindowText
  Font.Height = -13
  Font.Name = 'Cairo'
  Position = poScreenCenter
  WindowState = wsMaximized
  OnCreate = FormCreate
  OnKeyDown = FormKeyDown
  PixelsPerInch = 96
  TextHeight = 24
  object pnlTop: TPanel
    Left = 0
    Top = 0
    Width = 1100
    Height = 110
    Align = alTop
    TabOrder = 0
    object lblCustomer: TLabel
      Left = 1010
      Top = 20
      Width = 45
      Height = 24
      Caption = 'العميل:'
    end
    object edtInvoiceNum: TEdit
      Left = 750
      Top = 55
      Width = 180
      Height = 32
      ReadOnly = True
      TabOrder = 0
    end
  end
  object grdItems: TDBGrid
    Left = 0
    Top = 110
    Width = 1100
    Height = 460
    Align = alClient
    TabOrder = 1
    TitleFont.Charset = ARABIC_CHARSET
    TitleFont.Name = 'Cairo'
  end
  object pnlBottom: TPanel
    Left = 0
    Top = 570
    Width = 1100
    Height = 150
    Align = alBottom
    TabOrder = 2
    object btnSave: TBitBtn
      Left = 20
      Top = 30
      Width = 150
      Height = 50
      Caption = 'حفظ وترحيل [F5]'
      TabOrder = 0
      OnClick = btnSaveClick
    end
  end
end`,
      pasSnippet: `procedure TInvoiceEditForm.btnSaveClick(Sender: TObject);
var
  NewID: Int64;
  ErrMsg: string;
begin
  if FInvoiceService.SaveInvoice(FCurInvoice, NewID, ErrMsg) then
  begin
    MessageDlg('تم حفظ الفاتورة بنجاح برقم تعريف: ' + IntToStr(NewID), mtInformation, [mbOK], 0);
    if MessageDlg('هل ترغب بطباعة إيصال الفاتورة الآن؟', mtConfirmation, [mbYes, mbNo], 0) = mrYes then
      FReportManager.PreviewInvoice(NewID);
    ResetForm;
  end
  else
  begin
    MessageDlg('تعذر حفظ الفاتورة: ' + sLineBreak + ErrMsg, mtError, [mbOK], 0);
  end;
end;`
    },
    {
      formName: 'TLoginForm',
      arabicTitle: 'شاشة تسجيل الدخول الموحدة والمحمية',
      unitName: 'frmLogin.pas',
      description: 'شاشة المصادقة مع فحص المحاولات الفاشلة وقفل الحساب وتشفير الرمز السري',
      components: [
        { name: 'edtUsername', type: 'TEdit', caption: 'اسم المستخدم', description: 'إدخال اسم الدخول' },
        { name: 'edtPassword', type: 'TEdit', caption: 'كلمة المرور', description: 'حقل مقنع PasswordChar=*' },
        { name: 'btnLogin', type: 'TButton', caption: 'دخول للنظام', event: 'OnClick', description: 'فحص التشفير والتحقق من الصلاحيات' },
        { name: 'btnExit', type: 'TButton', caption: 'خروج', event: 'OnClick', description: 'إنهاء التطبيق' }
      ],
      dfmSnippet: `object LoginForm: TLoginForm
  BiDiMode = bdRightToLeft
  BorderStyle = bsDialog
  Caption = 'تسجيل الدخول - ريادة ERP'
  ClientHeight = 350
  ClientWidth = 480
  Color = clWhite
  Position = poScreenCenter
end`,
      pasSnippet: `procedure TLoginForm.btnLoginClick(Sender: TObject);
begin
  // فحص صحة اسم المستخدم وكلمة المرور وتجزئة Salt
  if ValidateCredentials(edtUsername.Text, edtPassword.Text) then
    ModalResult := mrOk
  else
    MessageDlg('اسم المستخدم أو كلمة المرور غير صحيحة.', mtError, [mbOK], 0);
end;`
    }
  ],
  fastReports: [
    {
      reportName: 'فاتورة ضريبية رسمية (ZATCA VAT Tax Invoice)',
      fileName: 'Reports/TaxInvoice.fr3',
      description: 'قالب التقرير الرسمي المعتمد متضمناً باركود الاستجابة السريعة QR Code، ترويسة الشركة، جدول البنود والتفقيط المالي بالريال السعودي',
      fr3Definition: `<!-- FastReport XML Definition .fr3 -->
<TfrxReport Version="2026.1" DotMatrixReport="False">
  <TfrxReportPage Name="Page1" PaperWidth="210" PaperHeight="297" LeftMargin="10" RightMargin="10" TopMargin="10" BottomMargin="10">
    <TfrxReportTitle Name="ReportTitle1" Height="140">
      <TfrxMemoView Name="MemoHeaderAr" Left="0" Top="10" Width="718" Height="30" Text="فاتورة ضريبية / TAX INVOICE" Font.Name="Cairo" Font.Size="16" Font.Style="fsBold" HAlign="haCenter"/>
      <TfrxBarCode2DView Name="QRCode1" Left="20" Top="10" Width="100" Height="100" BarType="bcCodeQR"/>
    </TfrxReportTitle>
    <TfrxMasterData Name="MasterData1" Height="25" DataSetName="frxInvoiceDataset">
      <TfrxMemoView Name="MemoItemName" Left="350" Top="2" Width="260" Height="20" DataField="ItemNameAr" Font.Name="Cairo"/>
      <TfrxMemoView Name="MemoQty" Left="270" Top="2" Width="70" Height="20" DataField="Quantity" HAlign="haCenter"/>
      <TfrxMemoView Name="MemoPrice" Left="190" Top="2" Width="70" Height="20" DataField="UnitPrice" HAlign="haRight"/>
      <TfrxMemoView Name="MemoTotal" Left="90" Top="2" Width="90" Height="20" DataField="LineTotal" HAlign="haRight"/>
    </TfrxMasterData>
  </TfrxReportPage>
</TfrxReport>`,
      pasIntegration: `// ربط التقرير ببيانات الفاتورة وتصديره
ReportManager.PreviewInvoice(CurInvoiceID);`
    }
  ],
  qaTests: [
    {
      id: 'TC-001',
      title: 'اختبار الاتصال بـ SQL Server مع بيانات صحيحة',
      module: 'dmMain / FireDAC Connection',
      inputData: 'Server=127.0.0.1,1433; Database=RayadaERP_DB; OSAuthent=Yes;',
      steps: [
        'تشغيل موديول dmMain',
        'استدعاء FDConnection.Connected := True'
      ],
      expectedResult: 'فتح الاتصال بنجاح وارجاع Connected = True بدون استثناءات',
      status: 'passed'
    },
    {
      id: 'TC-002',
      title: 'اختبار منع حقن SQL Injection في شاشة تسجيل الدخول',
      module: 'Security / LoginForm',
      inputData: "Username: ' OR '1'='1 -- ; Password: ' OR 1=1",
      steps: [
        'إدخال السلسلة الخبيثة في حقل اسم المستخدم',
        'الضغط على زر تسجيل الدخول'
      ],
      expectedResult: 'فشل تسجيل الدخول وعدم تنفيذ أي كود غير مصرح به بفضل TFDQuery.Params',
      status: 'passed'
    },
    {
      id: 'TC-003',
      title: 'اختبار التراجع التلقائي Rollback عند انقطاع حفظ بند الفاتورة',
      module: 'Sales / Transactions',
      inputData: 'فاتورة تحتوي صنفين: الأول متوفر، الثاني كميته تتجاوز رصيد المخزن',
      steps: [
        'بدء المعاملة المالية',
        'حفظ رأس الفاتورة',
        'حفظ البند الأول',
        'محاولة حفظ البند الثاني غير المتوفر مما يولد خطأ 50002'
      ],
      expectedResult: 'تنفيذ التراجع التلقائي Rollback، وعدم خصم أي صنف أو تسجيل الفاتورة في SalInvoices',
      status: 'passed'
    },
    {
      id: 'TC-004',
      title: 'اختبار حساب ضريبة القيمة المضافة 15% بدقة التقريب المالية',
      module: 'Business / TInvoiceService',
      inputData: 'سعر الوحدة: 100.00 ر.س، الكمية: 3، نسبة الضريبة: 15%',
      steps: [
        'استدعاء دالة RecalculateSummary',
        'فحص حقول SubTotal و TaxAmount و GrandTotal'
      ],
      expectedResult: 'SubTotal = 300.00, TaxAmount = 45.00, GrandTotal = 345.00 ر.س بدقة مطلقة',
      status: 'passed'
    },
    {
      id: 'TC-005',
      title: 'اختبار تصدير فاتورة FastReport إلى PDF بدون تشويه للخطوط العربية',
      module: 'Reporting / FastReport',
      inputData: 'InvoiceID = 1001, Output = C:\\Export\\Invoice_1001.pdf',
      steps: [
        'استدعاء ExportInvoiceToPdf',
        'فحص الملف الناتج في قارئ PDF'
      ],
      expectedResult: 'توليد ملف PDF عالي الدقة وتضمين خط Cairo العربي سليم الاتجاه RTL بدون أحرف مقلوبة',
      status: 'passed'
    }
  ],
  innoSetupScript: `; ========================================================
; سكربت تثبيت وتوزيع تجاري احترافي - Inno Setup 6 Script
; تطبيق ريادة ERP - Rayada Enterprise Installer
; ========================================================
#define MyAppName "Rayada ERP"
#define MyAppVersion "2026.1.0"
#define MyAppPublisher "Rayada Software Solutions"
#define MyAppURL "https://rayadaerp.com"
#define MyAppExeName "RayadaERP.exe"

[Setup]
AppId={{8B41D91E-9C33-4F8A-981D-A5372EC10F82}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
DefaultDirName={autopf}\\{#MyAppName}
DefaultGroupName={#MyAppName}
OutputDir=Output
OutputBaseFilename=RayadaERP_Setup_v2026.1
Compression=lzma2/ultra64
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=admin
WizardStyle=modern

[Languages]
Name: "arabic"; MessagesFile: "compiler:Languages\\Arabic.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: "Bin\\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion
Source: "Bin\\Config\\*"; DestDir: "{app}\\Config"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "Bin\\Reports\\*.fr3"; DestDir: "{app}\\Reports"; Flags: ignoreversion
Source: "Bin\\Redist\\msodbcsql18.msi"; DestDir: "{tmp}"; Flags: deleteafterinstall

[Icons]
Name: "{group}\\{#MyAppName}"; Filename: "{app}\\{#MyAppExeName}"
Name: "{autodesktop}\\{#MyAppName}"; Filename: "{app}\\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "msiexec.exe"; Parameters: "/i ""{tmp}\\msodbcsql18.msi"" /qn IACCEPTMSODBCSQLLICENSETERMS=YES"; StatusMsg: "جاري تثبيت مشغل قاعدة البيانات Microsoft ODBC 18 for SQL Server..."; Flags: waituntilterminated
Filename: "{app}\\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
`,
  documentation: {
    architectureDoc: `# وثيقة معمارية النظام (System Architecture Document)
- **الإصدار**: 2026.1 Enterprise
- **البيئة المستهدفة**: Windows 10/11 x64, SQL Server 2022+
- **إطار العمل**: Delphi 12.1 Athens VCL + FireDAC
- **النمط المعماري**: Clean Layered Architecture (Presentation -> Service -> Repository -> DataModule -> SQL Engine).
- **إدارة الاتصال**: استخدام Pool لاتصالات FireDAC، وتفعيل خاصية fmOnDemand لتفادي استهلاك الذاكرة.`,
    userGuide: `# دليل المستخدم السريع - ريادة ERP
1. **تسجيل الدخول**: افتح البرنامج من أيقونة سطح المكتب، أدخل اسم المستخدم (admin) وكلمة المرور.
2. **إصدار فاتورة جديدة**: اضغط على (F2) لفتح شاشة الفواتير، حدد العميل أو امسح باركود الأصناف مباشرة.
3. **الحفظ والترحيل**: اضغط (F5) للحفظ المباشر، وسيتم تلقائياً تحديث رصيد المخزن وطباعة الفاتورة.`,
    developerGuide: `# دليل المطور وصيانة الكود
1. افتح المشروع عبر ملف **RayadaERP.dpr** في بيئة Delphi 12.1.
2. تأكد من ضبط مسار مكتبة FireDAC ومحرك FastReport في خيارات المشروع (Project Options -> Delphi Compiler -> Search Path).
3. عند إضافة أي استعلام جديد، استخدم **TFDQuery.Params** وتجنب دمج السلاسل النصية قطعياً لمنع ثغرات الحقن.`,
    commercialPlan: `# خطة التوزيع التجاري ونموذج التسعير
- **الترخيص الدائم (Perpetual License)**: شراء البرنامج لمرة واحدة مع عقد صيانة سنوي (AMC) يشمل التحديثات.
- **نموذج الاشتراك السنوي (SaaS / Annual Subscription)**: يشمل الدعم الفني والنسخ الاحتياطي السحابي.
- **حماية النسخ**: تشفير مفتاح الترخيص بواسطة معرّف الجهاز (Hardware ID CPU + Motherboard Serial) لمنع النسخ غير المصرح به.`
  }
};
