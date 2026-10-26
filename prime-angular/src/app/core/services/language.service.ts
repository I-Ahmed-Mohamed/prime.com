import { Injectable, signal, computed, effect } from '@angular/core';

export type LanguageCode = 'ar' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'prime-portfolio-lang';
  readonly lang = signal<LanguageCode>(this.getInitialLang());
  readonly isRtl = computed(() => this.lang() === 'ar');

  private readonly translations: Record<LanguageCode, Record<string, string>> = {
    ar: {
      'brand.name': 'أحمد محمد',
      'brand.role': 'مهندس برمجيات وتطبيقات ويب متكاملة',
      'brand.specialty': 'متخصص دوت نت (.NET 9) وأنجولار (Angular 19)',
      
      'nav.home': 'الرئيسية',
      'nav.about': 'نبذة عني',
      'nav.architecture': 'الهندسة المعمارية (.NET)',
      'nav.projects': 'أعمالي ومشاريعي',
      'nav.clients': 'عملاء وشركاء النجاح',
      'nav.services': 'الخدمات والباقات',
      'nav.pricing': 'الأسعار وطرق الدفع',
      'nav.skills': 'المهارات والتقنيات',
      'nav.contact': 'تواصل معي',
      'nav.cv': 'تحميل السيرة الذاتية',
      'nav.copilot': 'المساعد الذكي (AI)',
      
      'hero.badge': 'متاح للتعاقد والمشاريع ذات الأثر العالي',
      'hero.title_pre': 'أبني منصات برمجية سحابية',
      'hero.title_highlight': 'عالمية المستوى فائقة الأداء',
      'hero.subtitle': 'مهندس برمجيات متكامل (Full-Stack Engineer) متخصص في هندسة النظم المعقدة (.NET Core, C#, Clean Architecture) وواجهات المستخدم التفاعلية المتطورة (Angular, Signals, TypeScript).',
      'hero.cta_project': 'ابدأ مشروعك الآن',
      'hero.cta_arch': 'استكشف البنية البرمجية',
      'hero.cta_whatsapp': 'تواصل عبر واتساب',
      
      'copilot.input_placeholder': 'اسأل المساعد الذكي عن خدمات أحمد، خبراته، أو تكلفة مشروعك...',
      'copilot.send_btn': 'إرسال',
      'copilot.chip_1': 'ما هي الخدمات التي يقدمها أحمد؟',
      'copilot.chip_2': 'كيف تنفذ الباك اند باستخدام .NET؟',
      'copilot.chip_3': 'ما هي طرق الدفع المتاحة؟',
      'copilot.chip_4': 'أريد نظام ERP لمؤسستي',
      
      'stats.experience': 'سنوات خبرة برمجية',
      'stats.projects': 'مشروع معتمد تم تسليمه',
      'stats.clients': 'شريك نجاح وعميل راضٍ',
      'stats.uptime': 'معايير أمان وأداء عالي',
      
      'arch.badge': 'الهندسة العميقة للأنظمة',
      'arch.title': 'هندسة الباك إند النظيفة (.NET Clean Architecture)',
      'arch.desc': 'نعتمد أعلى معايير التصميم البرمجي المؤسسي (Enterprise Patterns) لضمان قابلية التوسع والصيانة الفائقة.',
      'arch.domain': 'طبقة النطاق (Domain Layer)',
      'arch.domain_desc': 'الكيانات الأساسية وقواعد العمل (Entities, Value Objects, Domain Events) دون أي تبعيات خارجية.',
      'arch.application': 'طبقة التطبيق (Application Layer)',
      'arch.application_desc': 'إدارة حالات الاستخدام عبر CQRS (MediatR), DTOs, FluentValidation, و Pipeline Behaviors.',
      'arch.infrastructure': 'طبقة البنية التحتية (Infrastructure)',
      'arch.infrastructure_desc': 'Entity Framework Core 9, SQL Server, Redis Cache, JWT Security, وتكامل بوابات الدفع.',
      'arch.api': 'واجهات برمجة التطبيقات (Web API & UI)',
      'arch.api_desc': 'RESTful APIs عالية السرعة، توثيق OpenAPI/Swagger، SignalR للبث الحي، وتكامل كامل مع Angular.',
      
      'projects.badge': 'سابقة الأعمال',
      'projects.title': 'مشاريع واقعية وحلول مخصصة',
      'projects.desc': 'استكشف باقة من أقوى الأنظمة والتطبيقات البرمجية المصممة لخدمة الشركات والمؤسسات.',
      'projects.filter_all': 'الكل',
      'projects.filter_fullstack': 'أنظمة متكاملة (Full-Stack)',
      'projects.filter_backend': 'باك إند وواجهات (.NET API)',
      'projects.filter_angular': 'تطبيقات أنجولار (Angular)',
      'projects.filter_enterprise': 'حلول ERP ومؤسسات',
      'projects.view_demo': 'معاينة المشروع',
      'projects.view_arch': 'تفاصيل المعمارية',
      
      'clients.badge': 'شركاء النجاح',
      'clients.title': 'عملاء وضعوا ثقتهم في حلولنا',
      'clients.desc': 'نفخر بالعمل مع مؤسسات رائدة وتقديم أنظمة تشغيلية وإدارية ساهمت في نمو أعمالهم.',
      'clients.olympic_badge': 'شريك استراتيجي رائد',
      'clients.olympic_name': 'مطابع أوليمبيك (Olympic Printing)',
      'clients.olympic_desc': 'تطوير نظام إدارة مطابع وطلبيات متكامل وحلول تسويق رقمي عززت المبيعات وتتبع العمليات لحظياً.',
      'clients.olympic_fb': 'زيارة صفحة فيسبوك الرسمية',
      
      'pricing.badge': 'الأسعار وطرق الدفع',
      'pricing.title': 'باقات مرنة وتسهيلات دفع ذكية',
      'pricing.desc': 'شفافية كاملة في التسعير مع دعم كافة وسائل الدفع المحلية والإقليمية والدولية.',
      'pricing.currency': 'جنيه مصري',
      'pricing.order_now': 'طلب هذه الباقة',
      'pricing.payment_methods_title': 'طرق وقنوات الدفع المعتمدة',
      'pricing.payment_methods_desc': 'يمكنك سداد الدفعات ومستحقات المشاريع بسهولة عبر القنوات التالية:',
      'pricing.copy': 'نسخ الرقم',
      'pricing.copied': 'تم النسخ بنجاح!',
      
      'skills.badge': 'الترسانة التقنية',
      'skills.title': 'تقنيات نتقنها لبناء المستقبل',
      'skills.desc': 'مزيج فريد من أحدث أطر عمل الواجهات الأمامية والأنظمة الخلفية وقواعد البيانات السحابية.',
      
      'contact.badge': 'تواصل فوري',
      'contact.title': 'دعنا نحول فكرتك إلى واقع تقني',
      'contact.desc': 'جاهز لمناقشة فكرة مشروعك وتقديم استشارة تقنية مجانية لتحديد متطلبات النظام الأنسب لك.',
      'contact.phone_title': 'الهاتف المباشر وواتساب',
      'contact.phone_val': '01094547599',
      'contact.email_title': 'البريد الإلكتروني',
      'contact.email_val': 'ahmed.mohamed.dev2030@gmail.com',
      'contact.address_title': 'المقر والعمل',
      'contact.address_val': 'مصر (متاح للعمل عن بُعد وللمشاريع الحرة عالمياً)',
      'contact.form_name': 'الاسم بالكامل',
      'contact.form_email': 'البريد الإلكتروني',
      'contact.form_phone': 'رقم الهاتف / واتساب',
      'contact.form_service': 'نوع الخدمة المطلوبة',
      'contact.form_message': 'تفاصيل المشروع والمتطلبات...',
      'contact.form_submit': 'إرسال الطلب الآن',
      'contact.form_success': 'تم إرسال طلبك بنجاح! سيتواصل معك المهندس أحمد خلال وقت قصير.',
      
      'footer.rights': 'جميع الحقوق محفوظة © 2026 المهندس أحمد محمد | مطور Full-Stack .NET & Angular',
      'footer.status': 'الخوادم تعمل بكفاءة 100% | جاهز لاستقبال المشاريع'
    },
    en: {
      'brand.name': 'Ahmed Mohamed',
      'brand.role': 'Full-Stack Software Engineer',
      'brand.specialty': 'Specialized in .NET 9 & Angular 19 Systems',
      
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.architecture': '.NET Architecture',
      'nav.projects': 'Projects',
      'nav.clients': 'Clients & Partners',
      'nav.services': 'Services',
      'nav.pricing': 'Pricing & Payment',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',
      'nav.cv': 'Download CV',
      'nav.copilot': 'AI Copilot',
      
      'hero.badge': 'Available for High-Impact Projects',
      'hero.title_pre': 'Architecting Enterprise-Grade',
      'hero.title_highlight': 'High-Performance Web Platforms',
      'hero.subtitle': 'Full-Stack Software Engineer specializing in scalable enterprise backend (.NET Core, C#, Clean Architecture) and next-generation reactive client applications (Angular, Signals, TypeScript).',
      'hero.cta_project': 'Start Your Project',
      'hero.cta_arch': 'Explore Architecture',
      'hero.cta_whatsapp': 'WhatsApp Chat',
      
      'copilot.input_placeholder': 'Ask AI Copilot about Ahmed\'s services, tech stack, or project estimates...',
      'copilot.send_btn': 'Send',
      'copilot.chip_1': 'What services does Ahmed offer?',
      'copilot.chip_2': 'How do you build .NET backends?',
      'copilot.chip_3': 'What payment methods are supported?',
      'copilot.chip_4': 'I need a custom ERP system',
      
      'stats.experience': 'Years of Experience',
      'stats.projects': 'Production Systems Delivered',
      'stats.clients': 'Satisfied Enterprise Clients',
      'stats.uptime': 'High Availability Standard',
      
      'arch.badge': 'Deep System Architecture',
      'arch.title': '.NET Clean Architecture & Design Patterns',
      'arch.desc': 'Implementing robust enterprise software patterns to guarantee maximum scalability, testability, and decoupled maintainability.',
      'arch.domain': 'Domain Layer (Core)',
      'arch.domain_desc': 'Pure business rules, domain entities, value objects, and domain events with zero external dependencies.',
      'arch.application': 'Application Layer',
      'arch.application_desc': 'CQRS with MediatR, input validation with FluentValidation, DTOs, and pipeline behaviors.',
      'arch.infrastructure': 'Infrastructure Layer',
      'arch.infrastructure_desc': 'Entity Framework Core 9, SQL Server, Redis Cache, JWT Security, and payment gateways.',
      'arch.api': 'Web API & Angular Client',
      'arch.api_desc': 'High-throughput RESTful APIs, OpenAPI/Swagger docs, SignalR real-time hubs, and Angular integration.',
      
      'projects.badge': 'Portfolio Showcase',
      'projects.title': 'Featured Real-World Systems',
      'projects.desc': 'A curated selection of mission-critical web applications, enterprise ERPs, and backend platforms.',
      'projects.filter_all': 'All',
      'projects.filter_fullstack': 'Full-Stack Systems',
      'projects.filter_backend': '.NET APIs & Backend',
      'projects.filter_angular': 'Angular Applications',
      'projects.filter_enterprise': 'Enterprise & ERP',
      'projects.view_demo': 'Live Preview',
      'projects.view_arch': 'Architecture Specs',
      
      'clients.badge': 'Client Partners',
      'clients.title': 'Trusted by Growing Businesses',
      'clients.desc': 'Proudly collaborating with visionary brands to build digital platforms that drive real commercial growth.',
      'clients.olympic_badge': 'Featured Strategic Partner',
      'clients.olympic_name': 'Olympic Printing Agency',
      'clients.olympic_desc': 'Engineered a full printing management ERP system and digital campaign integrations to track live orders.',
      'clients.olympic_fb': 'Visit Official Facebook Page',
      
      'pricing.badge': 'Pricing & Payments',
      'pricing.title': 'Flexible Plans & Secure Payment Channels',
      'pricing.desc': 'Transparent pricing tiers with effortless local and international payment support.',
      'pricing.currency': 'EGP',
      'pricing.order_now': 'Select Plan',
      'pricing.payment_methods_title': 'Verified Payment Channels',
      'pricing.payment_methods_desc': 'Conveniently settle project milestones via any of our supported direct payment options:',
      'pricing.copy': 'Copy Number',
      'pricing.copied': 'Copied to Clipboard!',
      
      'skills.badge': 'Technical Arsenal',
      'skills.title': 'Technologies Engineered for High Performance',
      'skills.desc': 'A refined combination of enterprise backend technologies, modern reactive frontend frameworks, and cloud tooling.',
      
      'contact.badge': 'Get in Touch',
      'contact.title': 'Let\'s Build Your Vision Together',
      'contact.desc': 'Available for enterprise development, architectural consulting, and full-stack project execution.',
      'contact.phone_title': 'Direct Call & WhatsApp',
      'contact.phone_val': '01094547599',
      'contact.email_title': 'Email Address',
      'contact.email_val': 'ahmed.mohamed.dev2030@gmail.com',
      'contact.address_title': 'Location & Availability',
      'contact.address_val': 'Egypt (Available for Worldwide Remote Contracts)',
      'contact.form_name': 'Full Name',
      'contact.form_email': 'Email Address',
      'contact.form_phone': 'Phone / WhatsApp',
      'contact.form_service': 'Requested Service',
      'contact.form_message': 'Project details & requirements...',
      'contact.form_submit': 'Send Inquiry',
      'contact.form_success': 'Your message has been sent successfully! Engineer Ahmed will reach out shortly.',
      
      'footer.rights': 'All Rights Reserved © 2026 Ahmed Mohamed | Full-Stack .NET & Angular Software Engineer',
      'footer.status': 'Systems 100% Operational | Open for High-Impact Projects'
    }
  };

  constructor() {
    this.applyLang(this.lang());

    effect(() => {
      const current = this.lang();
      this.applyLang(current);
      try {
        localStorage.setItem(this.storageKey, current);
      } catch (e) {
        // Handle storage error
      }
    });
  }

  toggleLang(): void {
    this.lang.update(current => (current === 'ar' ? 'en' : 'ar'));
  }

  setLang(l: LanguageCode): void {
    this.lang.set(l);
  }

  t(key: string): string {
    const currentLang = this.lang();
    return this.translations[currentLang]?.[key] ?? this.translations['ar']?.[key] ?? key;
  }

  private getInitialLang(): LanguageCode {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      // Ignore error
    }
    return 'ar'; // Default to Arabic as requested by user
  }

  private applyLang(code: LanguageCode): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.lang = code;
      root.dir = code === 'ar' ? 'rtl' : 'ltr';
    }
  }
}
