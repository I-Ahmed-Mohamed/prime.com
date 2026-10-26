import { Injectable } from '@angular/core';
import { Project, ClientPartner, ServiceItem, SkillCategory, PricingTier, PaymentChannel } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {

  readonly developerInfo = {
    name: 'أحمد محمد',
    nameEn: 'Ahmed Mohamed',
    title: 'مهندس برمجيات وتطبيقات ويب متكاملة (Full-Stack Engineer)',
    titleEn: 'Senior Full-Stack Software Engineer (.NET & Angular)',
    specialty: 'متخصص في بناء النظم المؤسسية السحابية، معمارية .NET Clean Architecture، وتطبيقات Angular المتطورة.',
    specialtyEn: 'Specializing in Enterprise Cloud Systems, .NET Clean Architecture, and High-Performance Angular Applications.',
    phone: '01094547599',
    phoneFormatted: '+20 109 454 7599',
    email: 'ahmed.mohamed.dev2030@gmail.com',
    location: 'مصر (متاح للمشاريع العالمية عن بُعد)',
    locationEn: 'Egypt (Available for Global Remote Projects)',
    whatsappUrl: 'https://wa.me/201094547599',
    facebookUrl: 'https://www.facebook.com/profile.php?id=100084534187063',
    tiktokUrl: 'https://www.tiktok.com/@ahmedmohameddev',
    githubUrl: 'https://github.com/ahmedmohamed2030',
    experienceYears: '5+',
    completedProjects: '45+',
    satisfiedClients: '28+',
    cvPath: 'assets/img/certificatesPath.pdf',
    profileImg: 'assets/img/profile/3.jpg'
  };

  readonly projects: Project[] = [
    {
      id: 'olympic-erp',
      title: 'Olympic Printing ERP System',
      titleAr: 'نظام إدارة مطابع أوليمبيك المتكامل (Olympic ERP)',
      subtitle: 'Complete Print Order & Production Workflow System',
      subtitleAr: 'منظومة سحابية متكاملة لإدارة دورات الطباعة والطلبيات والعملاء',
      description: 'An enterprise-scale management platform designed specifically for Olympic Printing to track commercial print jobs, material inventory, client accounts, invoice generation, and live delivery updates.',
      descriptionAr: 'منظومة مؤسسية صُممت خصيصاً لمطابع أوليمبيك لمتابعة أوامر التشغيل والطباعة، مراقبة مخزون الخامات والورق، فواتير العملاء، وتحديثات التسليم اللحظية بدقة متناهية.',
      category: 'enterprise',
      tags: ['.NET 9', 'Clean Architecture', 'Angular 19', 'SQL Server', 'EF Core', 'SignalR'],
      backendStack: ['ASP.NET Core Web API', 'Clean Architecture', 'CQRS with MediatR', 'SQL Server 2022', 'EF Core 9'],
      frontendStack: ['Angular 19 Standalone', 'TypeScript', 'Angular Signals', 'Custom SCSS', 'Reactive Forms'],
      architecture: 'Clean Architecture with Domain-Driven Design (DDD), CQRS, and Event-Driven Notifications via SignalR.',
      image: 'assets/img/olympic/3.jpg',
      client: 'Olympic Printing Agency',
      clientAr: 'مطابع أوليمبيك',
      demoUrl: 'https://www.facebook.com/share/1dEwTVm8rG/?mibextid=wwXIfr',
      featured: true,
      metrics: [
        { label: 'Efficiency Boost', labelAr: 'زيادة كفاءة التشغيل', value: '+45%' },
        { label: 'Paper Waste Cut', labelAr: 'تقليل هادر الخامات', value: '-30%' },
        { label: 'Active Daily Orders', labelAr: 'أمر طباعة يومي', value: '250+' }
      ]
    },
    {
      id: 'ecommerce-superapp',
      title: 'HyperMarket Multi-Vendor Cloud E-Commerce',
      titleAr: 'منصة التجارة الإلكترونية السحابية متعددة التجار',
      subtitle: 'High-Volume Online Store with Real-time Checkout & Wallets',
      subtitleAr: 'متجر سحابي فائق السرعة يدعم المحافظ الإلكترونية والدفع الفوري',
      description: 'Scalable e-commerce engine with multi-currency checkout, automated shipping fee calculation, dynamic inventory reservation using Redis locks, and instant SMS / WhatsApp order confirmations.',
      descriptionAr: 'منصة متجر إلكتروني عالية التحمل تدعم السداد عبر فودافون كاش، انستاباي، والبطاقات البنكية، مع إدارة فورية للمخزون ومنع التعارض باستخدام Redis.',
      category: 'fullstack',
      tags: ['.NET Core API', 'Angular', 'Redis Cache', 'SQL Server', 'Payment Gateways'],
      backendStack: ['ASP.NET Core 8 Web API', 'SQL Server', 'Redis Distributed Caching', 'Stripe & Vodafone Cash Webhooks'],
      frontendStack: ['Angular Standalone', 'RxJS State Store', 'Optimized Image Pipeline', 'RTL/LTR Multi-language'],
      architecture: 'Microservices-ready modular architecture with distributed caching and idempotency-protected payment webhooks.',
      image: 'assets/img/projects/ecom.png',
      featured: true,
      metrics: [
        { label: 'Response Time', labelAr: 'زمن الاستجابة', value: '< 65ms' },
        { label: 'Transaction Uptime', labelAr: 'استقرار العمليات', value: '99.99%' },
        { label: 'Cart Conversion', labelAr: 'معدل إتمام الشراء', value: '+28%' }
      ]
    },
    {
      id: 'ai-copilot-platform',
      title: 'Prime Copilot AI Studio',
      titleAr: 'منصة Prime Copilot للذكاء الاصطناعي المؤسسي',
      subtitle: 'LLM Orchestration & Document Retrieval System',
      subtitleAr: 'منظومة مساعدة ذكية للمؤسسات مع محرك استرجاع البيانات الذكي',
      description: 'An AI-powered workspace enabling corporate teams to query internal company knowledge bases, auto-generate business reports, and interact with specialized conversational agents.',
      descriptionAr: 'منصة ذكاء اصطناعي تفاعلية تتيح للشركات استرجاع وتلخيص البيانات الداخلية، صياغة عروض الأسعار آلياً، والتواصل مع مساعدين أذكياء مخصصين.',
      category: 'fullstack',
      tags: ['.NET 9', 'Angular 19', 'AI Integration', 'Vector DB', 'SSE Streaming'],
      backendStack: ['ASP.NET Core Web API', 'Semantic Kernel', 'PostgreSQL pgvector', 'Server-Sent Events (SSE)'],
      frontendStack: ['Angular 19', 'Signals', 'Markdown KaTeX Renderer', 'Dark Mode UI'],
      architecture: 'Hybrid .NET orchestrator integrating LLMs with local vectorized business repositories.',
      image: 'assets/img/projects/ai-hub.png',
      featured: true,
      metrics: [
        { label: 'Query Precision', labelAr: 'دقة استرجاع البيانات', value: '96.4%' },
        { label: 'Streaming Latency', labelAr: 'زمن بدء البث الذكي', value: '180ms' }
      ]
    },
    {
      id: 'medical-cloud-erp',
      title: 'MediCare Cloud Clinic Management System',
      titleAr: 'منظومة MediCare السحابية لإدارة العيادات والمراكز الطبية',
      subtitle: 'Multi-Doctor Scheduling, E-Prescriptions & Billing',
      subtitleAr: 'إدارة المواعيد الطبية والروشتات الإلكترونية والحسابات',
      description: 'A cloud-based medical suite for hospitals and clinics featuring electronic patient records (EMR), automated appointment reminders via WhatsApp, and revenue accounting.',
      descriptionAr: 'حل طبي سحابي متكامل يخدم العيادات والمستشفيات مع ملف إلكتروني شامل لكل مريض، تنبيهات مواعيد عبر واتساب، وتقارير أرباح يومية.',
      category: 'enterprise',
      tags: ['.NET Core', 'Angular', 'Clean Architecture', 'SQL Server', 'Role-Based Auth'],
      backendStack: ['ASP.NET Core 8 Web API', 'Clean Architecture', 'SQL Server 2022', 'JWT Bearer Roles'],
      frontendStack: ['Angular', 'Angular Material / Custom UI', 'Interactive Calendar', 'Charts Dashboard'],
      architecture: 'N-Tier Clean Architecture with Strict HIPAA-compliant data segregation and audit logging.',
      image: 'assets/img/projects/med.png',
      featured: false
    },
    {
      id: 'fleet-logistics',
      title: 'Global Logistics & Fleet Real-Time Tracker',
      titleAr: 'نظام التتبع اللحظي للشاحنات والأسطول اللوجستي',
      subtitle: 'Live GPS Telemetry & Automated Dispatch Hub',
      subtitleAr: 'متابعة حركة الشاحنات والشحنات لحظياً عبر خرائط تفاعلية',
      description: 'High-throughput tracking platform processing vehicle GPS streams, calculating optimal routes, and notifying dispatchers of route deviations and delays.',
      descriptionAr: 'منصة عالية الأداء لمعالجة بيانات الـ GPS اللحظية للشاحنات، واحتساب المسارات الأسرع، وإرسال تنبيهات فورية بالانحرافات أو التأخير.',
      category: 'backend',
      tags: ['.NET Core API', 'SignalR Hubs', 'Angular', 'Docker', 'GIS Maps'],
      backendStack: ['ASP.NET Core 8', 'SignalR WebSockets', 'PostGIS', 'Redis Pub/Sub', 'Docker'],
      frontendStack: ['Angular Standalone', 'Leaflet / Mapbox GIS', 'WebSockets Streaming', 'Telemetry Cards'],
      architecture: 'Event-driven streaming pipeline utilizing Redis Pub/Sub and persistent WebSocket backplanes.',
      image: 'assets/img/projects/logistics.png',
      featured: false
    },
    {
      id: 'creative-brand-showcase',
      title: 'Creative Brand & Design Systems',
      titleAr: 'أعمال الهوية البصرية والتصميم الإعلاني',
      subtitle: 'Commercial Brand Identities & Corporate Collateral',
      subtitleAr: 'باقة من الهويات البصرية والحملات الإعلانية لكبرى العلامات',
      description: 'Visual identity creation, corporate brochures, social media marketing campaigns, and packaging design delivered for established local and regional businesses.',
      descriptionAr: 'تصميم هويات بصرية متكاملة، مطبوعات دعائية فاخرة، وتصاميم سوشيال ميديا مدروسة لزيادة الوعي بالعلامة التجارية ومضاعفة المبيعات.',
      category: 'angular',
      tags: ['Branding', 'Advertising', 'Packaging', 'Social Media', 'UI/UX'],
      backendStack: ['Brand Strategy', 'Visual Identity Systems'],
      frontendStack: ['Interactive Gallery', 'Figma', 'Adobe Photoshop', 'Illustrator'],
      architecture: 'Unified visual guidelines and brand kits ready for digital and print execution.',
      image: 'assets/img/design-works/1.jpg',
      featured: false
    }
  ];

  readonly clients: ClientPartner[] = [
    {
      id: 'olympic',
      name: 'Olympic Printing Agency',
      nameAr: 'مطابع أوليمبيك للطباعة والإعلان',
      category: 'Printing & Packaging Industry',
      categoryAr: 'قطاع الطباعة والتغليف والإعلان التجاري',
      logo: 'assets/img/olympic/3.jpg',
      description: 'One of the leading commercial printing agencies. We built their custom operations ERP and digital communication solutions.',
      descriptionAr: 'واحدة من كبرى مطابع ووكالات الدعاية والطباعة التجارية. قمنا بهندسة نظام إدارة المطابع المخصص وحلول التسويق الإلكتروني.',
      deliverables: ['Custom Print ERP System', 'Order Tracking Portal', 'Facebook & Marketing Integrations'],
      deliverablesAr: ['نظام ERP لإدارة أوامر الطباعة', 'بوابة تتبع الطلبيات للعملاء', 'ربط الحملات التسويقية'],
      facebookUrl: 'https://www.facebook.com/share/1dEwTVm8rG/?mibextid=wwXIfr',
      badge: 'شريك استراتيجي رائد'
    },
    {
      id: 'oval',
      name: 'Oval Technologies',
      nameAr: 'شركة أوفال للتكنولوجيا',
      category: 'Tech Solutions & Hardware',
      categoryAr: 'حلول التكنولوجيا والأنظمة الذكية',
      logo: 'assets/img/oval/1.jpg',
      description: 'Technology solutions company with integrated business dashboards and inventory tracking.',
      descriptionAr: 'شركة متخصصة في الحلول التقنية وأنظمة الهاردوير، قمنا بتنفيذ لوحات تحكم وإدارة عمليات التوزيع.',
      deliverables: ['Inventory Dashboard', 'Customer CRM System', 'Technical Support Platform'],
      deliverablesAr: ['لوحة تحكم المخزون', 'منظومة إدارة العملاء CRM', 'منصة الدعم الفني'],
      badge: 'شريك تقني معتمد'
    },
    {
      id: 'alshark',
      name: 'Al-Sharq Modern Group',
      nameAr: 'مجموعة الشرق الحديثة',
      category: 'Retail & Distribution',
      categoryAr: 'التجارة والتوزيع وسلاسل الإمداد',
      logo: 'assets/img/alshark/1.jpg',
      description: 'Commercial trading and distribution enterprise utilizing our point-of-sale and financial tracking solutions.',
      descriptionAr: 'مؤسسة تجارية وتوزيع رائدة، تم تزويدها بحلول إدارة نقاط البيع ومتابعة التقارير المالية الدقيقة.',
      deliverables: ['Point of Sale (POS)', 'Supplier Ledger System', 'Analytics & Profit Reports'],
      deliverablesAr: ['نظام نقاط البيع POS', 'دفاتر حسابات الموردين', 'تقارير أرباح تفصيلية'],
      badge: 'شريك تجاري'
    }
  ];

  readonly services: ServiceItem[] = [
    {
      id: 'fullstack-dev',
      icon: 'bi-layers-fill',
      title: 'Full-Stack Web Development',
      titleAr: 'تطوير المنصات والتطبيقات المتكاملة (Full-Stack)',
      description: 'End-to-end web applications combining powerful .NET backend microservices with ultra-fast, reactive Angular client interfaces.',
      descriptionAr: 'بناء تطبيقات ومنصات ويب متكاملة من الصفر، تجمع بين قوة وسرعة الباك إند (.NET) وانسيابية واجهات أنجولار التفاعلية الحديثة.',
      features: [
        'Single Page Applications (SPA) with Angular',
        'Robust RESTful Web APIs with ASP.NET Core',
        'Relational Databases with SQL Server & EF Core',
        'State Management with Signals & RxJS',
        'Real-time Data Sync with WebSockets / SignalR'
      ],
      featuresAr: [
        'تطبيقات الصفحة الواحدة (SPA) بتقنيات أنجولار الحديثة',
        'واجهات برمجية آمنة وسريعة باستخدام ASP.NET Core Web API',
        'قواعد بيانات علائقية سريعة مع SQL Server و EF Core',
        'إدارة دقيقة للحالة والبيانات عبر Angular Signals',
        'مزامنة البيانات لحظياً عبر SignalR والويب سوكت'
      ],
      techStack: ['.NET 9', 'Angular 19', 'C#', 'SQL Server', 'TypeScript', 'SCSS']
    },
    {
      id: 'backend-clean-arch',
      icon: 'bi-cpu-fill',
      title: 'Enterprise .NET Backend Architecture',
      titleAr: 'هندسة الأنظمة الخلفية المؤسسية (.NET Clean Architecture)',
      description: 'Clean Architecture with DDD principles, CQRS pattern, secure token authentication, and distributed Redis caching for rock-solid stability.',
      descriptionAr: 'تصميم وهندسة خوادم وأنظمة معقدة تتبع أعلى معايير Clean Architecture و CQRS لضمان سهولة التطوير والصيانة وقابلية التوسع.',
      features: [
        'Domain-Driven Design (DDD) Core Structure',
        'CQRS Implementation with MediatR',
        'JWT Bearer Authentication & Policy Authorization',
        'High-Speed Caching with Redis Distributed Cache',
        'Automated Unit & Integration Testing'
      ],
      featuresAr: [
        'معمارية Clean Architecture مفصولة الطبقات بالكامل',
        'تطبيق نمط CQRS مع مكتبة MediatR للفصل بين القراءة والكتابة',
        'أمان عالي عبر JWT Tokens وصلاحيات المستخدمين التفصيلية',
        'تسريع الاستعلامات بالذاكرة المؤقتة Redis Caching',
        'اختبارات برمجية آلية تضمن جودة الكود واستقراره'
      ],
      techStack: ['C# 13', '.NET 9', 'MediatR', 'FluentValidation', 'Redis', 'Docker']
    },
    {
      id: 'erp-business-solutions',
      icon: 'bi-buildings-fill',
      title: 'Custom ERP & Business Platforms',
      titleAr: 'أنظمة إدارة المؤسسات والشركات (Custom ERP)',
      description: 'Tailored enterprise resource planning solutions designed to digitize manufacturing, warehouse inventory, sales invoices, and customer management.',
      descriptionAr: 'أنظمة سحابية متخصصة ومصممة وفقاً لدورة عمل شركتك، تشمل إدارة المخازن، الفواتير الإلكترونية، الحسابات، ومتابعة الموظفين والعملاء.',
      features: [
        'Custom Business Process Automation',
        'Multi-Warehouse Inventory Tracking',
        'Invoicing, Taxation & Financial Ledgers',
        'Granular Role-Based Access Control (RBAC)',
        'Printable Reports & PDF/Excel Exporting'
      ],
      featuresAr: [
        'أتمتة دورات العمل التشغيلية بالكامل للشركة',
        'إدارة المخازن المتعددة وجرد البضائع والخامات',
        'فواتير ضريبية وحسابات عملاء وموردين دقيقة',
        'نظام صلاحيات متقدم لكل موظف وقسم في المنظومة',
        'تقارير تفصيلية قابلة للطباعة والتصدير بصيغ PDF و Excel'
      ],
      techStack: ['ASP.NET Core', 'Angular', 'SQL Server', 'Crystal/QuestPDF', 'ClosedXML']
    },
    {
      id: 'payment-integration',
      icon: 'bi-credit-card-2-front-fill',
      title: 'Payment Gateway & FinTech Integration',
      titleAr: 'ربط بوابات الدفع الإلكتروني والمحافظ الذكية',
      description: 'Seamless integration of local and international payment methods including InstaPay, Vodafone Cash, Fawry, Paymob, and Stripe with automated callback verification.',
      descriptionAr: 'ربط متاجرك وأنظمتك بأشهر بوابات الدفع والمحافظ الإلكترونية (انستاباي، فودافون كاش، باي موب، فوري، سترايب) مع تأكيد العمليات لحظياً.',
      features: [
        'InstaPay & Mobile Wallets Webhook Handling',
        'Credit/Debit Card (Visa / Mastercard) Gateways',
        'Automated Reconciliation & Payment Status Verification',
        'Idempotency Keys to Prevent Duplicate Charges',
        'Instant WhatsApp / SMS Payment Confirmation'
      ],
      featuresAr: [
        'ربط فوري مع محفظة فودافون كاش وتأكيد انستاباي',
        'بوابات الدفع بالبطاقات البنكية فيزا وماستركارد',
        'التحقق التلقائي من نجاح المعاملات عبر Webhooks آمنة',
        'حماية ضد تكرار الخصم ومعالجة الأخطاء بأمان',
        'إرسال إشعار فوري للعميل عبر واتساب والرسائل القصيرة'
      ],
      techStack: ['InstaPay API', 'Paymob', 'Fawry', 'Vodafone Cash', 'Stripe', 'HMAC Security']
    }
  ];

  readonly pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'باقة واجهة الأعمال الاحترافية',
      nameAr: 'باقة واجهة الأعمال الاحترافية (Modern Showcase)',
      badge: 'انطلاقة سريعة',
      badgeAr: 'انطلاقة سريعة للشركات',
      priceEgp: '4,500',
      priceUsd: '150',
      deliveryTime: '3 - 5 Days',
      deliveryTimeAr: '3 - 5 أيام عمل',
      description: 'Ideal for startups, personal branding, doctors, and businesses needing a stunning, high-converting presence.',
      descriptionAr: 'مثالية للشركات الناشئة، الشخصيات العامة، العيادات، والمكاتب التي تبحث عن واجهة حديثة فائقة السرعة تزيد من المبيعات والعملاء.',
      features: [
        'Ultra-fast Single Page Web App (Angular)',
        'Fully Responsive & Mobile-Optimized',
        'Bilingual Support (Arabic RTL & English LTR)',
        'Dark & High-Contrast Light Mode Support',
        'Direct WhatsApp & Call Click-to-Chat',
        'Google SEO & Social Media Meta Optimization',
        '1 Month Free Technical Support'
      ],
      featuresAr: [
        'موقع ويب فائق السرعة مبني بأحدث تقنيات أنجولار',
        'متوافق 100% مع كافة الشاشات والموبايل والتابلت',
        'دعم كامل للغتين (عربي بنظام RTL وإنجليزي LTR)',
        'دعم الوضعين الداكن والفاتح عالي التباين',
        'ربط مباشر بزر المحادثة الفورية عبر واتساب والاتصال',
        'تهيئة الموقع لمحركات البحث (SEO) والسوشيال ميديا',
        'شهر دعم فني وصيانة مجانية بعد التسليم'
      ],
      popular: false,
      actionText: 'احجز هذه الباقة الآن',
      actionTextAr: 'احجز هذه الباقة الآن',
      whatsappMessage: 'مرحباً مهندس أحمد، أود الاستفسار وحجز باقة واجهة الأعمال الاحترافية (Modern Showcase).'
    },
    {
      id: 'business-fullstack',
      name: 'باقة المنصات المتكاملة (Full-Stack)',
      nameAr: 'باقة المنظومة المتكاملة (Full-Stack Platform)',
      badge: 'الأكثر طلباً',
      badgeAr: 'الأكثر طلباً والأفضل قيمة',
      priceEgp: '12,500',
      priceUsd: '390',
      deliveryTime: '10 - 15 Days',
      deliveryTimeAr: '10 - 15 يوم عمل',
      description: 'Complete web application backed by .NET Core API, SQL Server database, secure admin panel, and payment gateway.',
      descriptionAr: 'نظام متكامل يجمع بين سيرفر قوي (.NET Core API)، قاعدة بيانات SQL Server، لوحة تحكم ذكية للإدارة، وربط بوابات الدفع الإلكتروني.',
      features: [
        'High-Performance .NET 9 Backend API',
        'Interactive Angular 19 Dashboard & Client Portal',
        'SQL Server Database with Entity Framework Core',
        'Secure Authentication with JWT & Role-Based Permissions',
        'Payment Integration (InstaPay, Vodafone Cash, Visa)',
        'Interactive Data Tables with Search, Filter & Excel Export',
        'Automated WhatsApp & Email Notifications',
        '3 Months Priority Technical Support & Hosting Setup'
      ],
      featuresAr: [
        'خادم باك إند فائق السرعة مبني بـ .NET 9 و C#',
        'لوحة تحكم تفاعلية للمدير والعملاء بأنظمة أنجولار الحديثة',
        'قاعدة بيانات SQL Server منظمة ومعززة بـ EF Core',
        'تسجيل دخول آمن وصلاحيات مستخدمين تفصيلية (Admin, Staff, Client)',
        'ربط بوابات الدفع الإلكتروني (انستاباي، فودافون كاش، وفيزا)',
        'جداول بيانات ذكية مع بحث فوري، فلترة، وتصدير إكسل',
        'إشعارات آلية عبر البريد الإلكتروني ورسائل الواتساب',
        '3 أشهر دعم فني فوري وإعداد السيرفر والاستضافة مجاناً'
      ],
      popular: true,
      actionText: 'ابدأ مشروعك المتكامل الآن',
      actionTextAr: 'ابدأ مشروعك المتكامل الآن',
      whatsappMessage: 'مرحباً مهندس أحمد، أود الاستفسار والتعاقد على باقة المنظومة المتكاملة (Full-Stack Platform).'
    },
    {
      id: 'enterprise-erp',
      name: 'باقة المؤسسات والـ ERP المخصص',
      nameAr: 'باقة الـ ERP المؤسسي المخصص (Custom ERP)',
      badge: 'للمؤسسات والشركات الكبرى',
      badgeAr: 'للشركات والمصانع والمؤسسات',
      priceEgp: '28,000+',
      priceUsd: '850+',
      deliveryTime: '20 - 35 Days',
      deliveryTimeAr: '20 - 35 يوم عمل',
      description: 'Enterprise Clean Architecture solution tailored for industrial production, inventory management, multi-branch operations, and real-time operations.',
      descriptionAr: 'منظومة سحابية خاصة مصممة طبقاً لمتطلبات مصنعك أو شركتك، معمارية Clean Architecture، دعم فروع متعددة، وربط الفواتير والمخازن.',
      features: [
        'Modular Clean Architecture with Domain-Driven Design (DDD)',
        'Multi-Branch & Multi-Warehouse Operations',
        'Real-time WebSocket / SignalR Notifications',
        'Invoicing, Electronic Receipts & Audit Logs',
        'Automated Daily Database Backups & Cloud Redundancy',
        'Comprehensive API Documentation (Swagger / OpenAPI)',
        'Dedicated On-Premise or Cloud Server Deployment (Docker/VPS)',
        '6 Months Dedicated Support & Staff Training'
      ],
      featuresAr: [
        'معمارية برمجية معيارية Clean Architecture تضمن أعلى موثوقية',
        'إدارة الفروع المتعددة والمخازن والتحويلات الداخلية بدقة',
        'تحديثات وإشعارات تشغيلية حية لحظة بلحظة عبر SignalR',
        'نظام فواتير، مقايسات، سجل تدقيق أمني لكافة العمليات',
        'نسخ احتياطي يومي آلي لقواعد البيانات وحماية البيانات',
        'توثيق برمجي كامل للـ APIs (Swagger / OpenAPI)',
        'تثبيت النظام على سيرفرات الشركة الخاصة أو السحابية (VPS/Docker)',
        '6 أشهر دعم فني مخصص وتدريب كامل لفريق العمل'
      ],
      popular: false,
      actionText: 'طلب استشارة ومقايسة مخصصة',
      actionTextAr: 'طلب استشارة ومقايسة مخصصة',
      whatsappMessage: 'مرحباً مهندس أحمد، أود ترتيب استشارة ومناقشة مقايسة نظام ERP مخصص لمؤسستنا.'
    }
  ];

  readonly paymentChannels: PaymentChannel[] = [
    {
      id: 'instapay',
      title: 'InstaPay Transfer',
      titleAr: 'التحويل الفوري عبر انستاباي (InstaPay)',
      subtitle: 'Instant Transfer via Mobile Number / IPA',
      subtitleAr: 'تحويل لحظي مباشر بدون أي رسوم عبر رقم الهاتف أو اسم المستخدم',
      icon: 'bi-lightning-charge-fill',
      accentColor: '#8b5cf6',
      instapayUsername: '01094547599',
      accountNumber: '01094547599',
      accountName: 'Ahmed Mohamed',
      badge: 'الخيار الأسرع والأنسب محلياً',
      badgeAr: 'الخيار الأسرع والأفضل داخل مصر',
      instructions: 'Open your InstaPay app, select "Send to Mobile Number", enter 01094547599, and share the transfer screenshot on WhatsApp.',
      instructionsAr: 'افتح تطبيق انستاباي واختر "إرسال إلى رقم هاتف"، ثم أدخل الرقم 01094547599 وأرسل صورة التحويل عبر واتساب لتأكيد الحجز فوراً.'
    },
    {
      id: 'vodafone-cash',
      title: 'Vodafone Cash & Mobile Wallets',
      titleAr: 'محفظة فودافون كاش ومحافظ المحمول',
      subtitle: 'Instant Mobile Wallet Payment',
      subtitleAr: 'تحويل مباشر من محفظتك الإلكترونية على فودافون كاش أو أورانج أو اتصالات كاش',
      icon: 'bi-phone-fill',
      accentColor: '#e11d48',
      accountNumber: '01094547599',
      accountName: 'Ahmed Mohamed',
      badge: 'متاح 24/7',
      badgeAr: 'متاح لحظياً 24/7',
      instructions: 'Transfer the amount to 01094547599 from your mobile wallet, then send the SMS confirmation to WhatsApp.',
      instructionsAr: 'حوّل المبلغ المطلوب على رقم المحفظة 01094547599 من أي محفظة إلكترونية، ثم أرسل لقطة شاشة لرسالة التأكيد عبر واتساب.'
    },
    {
      id: 'bank-transfer',
      title: 'Direct Bank Wire (IBAN)',
      titleAr: 'التحويل البنكي المباشر (حساب / IBAN)',
      subtitle: 'Official Corporate & Personal Bank Accounts',
      subtitleAr: 'للشركات والمشاريع الكبرى والتحويلات البنكية المباشرة من داخل وخارج مصر',
      icon: 'bi-bank2',
      accentColor: '#059669',
      bankName: 'National Bank of Egypt / CIB',
      bankNameAr: 'البنك الأهلي المصري / البنك التجاري الدولي CIB',
      accountNumber: 'تواصل معنا للحصول على رقم الحساب البنكي الرسمي والـ IBAN',
      accountName: 'Ahmed Mohamed',
      badge: 'معتمد للمؤسسات والشركات',
      badgeAr: 'معتمد رسمياً للمؤسسات والشركات',
      instructions: 'Contact us directly on WhatsApp or Email to receive full bank wire details and international SWIFT / IBAN numbers.',
      instructionsAr: 'تواصل معنا مباشرة عبر واتساب لتزويدك ببيانات الحساب البنكي الرسمي ورمز السويفت كود (SWIFT/IBAN) للمدفوعات المؤسسية.'
    },
    {
      id: 'visa-mastercard',
      title: 'Credit & Debit Cards (Online)',
      titleAr: 'الدفع الإلكتروني عبر بطاقات فيزا وماستركارد',
      subtitle: 'Secure Online Payment Links',
      subtitleAr: 'دفع آمن بالبطاقات الائتمانية عبر روابط دفع Paymob / Stripe معتمدة',
      icon: 'bi-credit-card-fill',
      accentColor: '#2563eb',
      badge: 'دفع عالمي آمن',
      badgeAr: 'دفع عالمي آمن ومشفر',
      instructions: 'Upon agreeing on project scope, we issue an encrypted, 3D-Secure payment link directly to your WhatsApp or Email.',
      instructionsAr: 'بعد الاتفاق على متطلبات المشروع، نرسل لك رابط دفع آمن ومشفر مشمول بحماية 3D-Secure لسداد الدفعة بكل راحة وأمان.'
    }
  ];

  readonly skillCategories: SkillCategory[] = [
    {
      title: 'Enterprise Backend Engineering',
      titleAr: 'هندسة الأنظمة الخلفية (.NET & Architecture)',
      icon: 'bi-hdd-network-fill',
      badge: 'الخبرة الجوهرية',
      skills: [
        { name: 'C# 13 & .NET 9', level: 95, experience: '5+ Years', icon: 'bi-code-slash', popular: true },
        { name: 'ASP.NET Core Web API', level: 95, experience: '5+ Years', icon: 'bi-cpu', popular: true },
        { name: 'Clean Architecture & DDD', level: 92, experience: '4+ Years', icon: 'bi-diagram-3', popular: true },
        { name: 'CQRS & MediatR Pattern', level: 90, experience: '3+ Years', icon: 'bi-shuffle' },
        { name: 'Entity Framework Core 9', level: 94, experience: '5+ Years', icon: 'bi-database' },
        { name: 'Microsoft SQL Server', level: 92, experience: '5+ Years', icon: 'bi-server', popular: true },
        { name: 'Redis Distributed Caching', level: 88, experience: '3+ Years', icon: 'bi-lightning' },
        { name: 'SignalR Real-Time Hubs', level: 90, experience: '3+ Years', icon: 'bi-broadcast' }
      ]
    },
    {
      title: 'Modern Reactive Frontend',
      titleAr: 'الواجهات التفاعلية الحديثة (Angular & Web)',
      icon: 'bi-display-fill',
      badge: 'واجهات فائقة السرعة',
      skills: [
        { name: 'Angular 19/22 Standalone', level: 94, experience: '4+ Years', icon: 'bi-terminal', popular: true },
        { name: 'TypeScript & JavaScript ESNext', level: 94, experience: '5+ Years', icon: 'bi-filetype-tsx', popular: true },
        { name: 'Angular Signals & State', level: 92, experience: '2+ Years', icon: 'bi-activity', popular: true },
        { name: 'RxJS Reactive Programming', level: 89, experience: '4+ Years', icon: 'bi-repeat' },
        { name: 'SCSS / Modern CSS Glassmorphism', level: 95, experience: '5+ Years', icon: 'bi-palette' },
        { name: 'HTML5 Semantic & SEO Ready', level: 98, experience: '5+ Years', icon: 'bi-globe' },
        { name: 'Progressive Web Apps (PWA)', level: 86, experience: '2+ Years', icon: 'bi-phone' }
      ]
    },
    {
      title: 'DevOps, Cloud & Architecture Tools',
      titleAr: 'أدوات السحاب والنشر وأمان الأنظمة',
      icon: 'bi-cloud-check-fill',
      badge: 'استقرار وجاهزية 99.9%',
      skills: [
        { name: 'Git & GitHub Collaboration', level: 95, experience: '5+ Years', icon: 'bi-git', popular: true },
        { name: 'Docker & Containerization', level: 87, experience: '3+ Years', icon: 'bi-box-seam' },
        { name: 'JWT & OAuth2 Security', level: 93, experience: '4+ Years', icon: 'bi-shield-lock', popular: true },
        { name: 'CI/CD Pipelines & Hosting', level: 85, experience: '3+ Years', icon: 'bi-cloud-upload' },
        { name: 'RESTful API & Swagger Docs', level: 96, experience: '5+ Years', icon: 'bi-file-earmark-code' },
        { name: 'Performance & SQL Optimization', level: 91, experience: '4+ Years', icon: 'bi-speedometer2' }
      ]
    }
  ];
}
