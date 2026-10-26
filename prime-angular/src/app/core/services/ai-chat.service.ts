import { Injectable, signal } from '@angular/core';
import { ChatMessage } from '../models/portfolio.models';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  readonly isOpen = signal<boolean>(false);
  readonly messages = signal<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'أهلاً بك! أنا المساعد الذكي للمهندس أحمد محمد (Prime Copilot). كيف يمكنني مساعدتك اليوم بخصوص تفاصيل الأنظمة البرمجية، الباك إند (.NET)، الباقات، أو حجز استشارة تقنية لمشروعك؟',
      timestamp: new Date(),
      suggestions: [
        'ما هي أسعار وباقات المشاريع؟',
        'ما هي طرق الدفع المتاحة؟',
        'حدثني عن مشروع مطابع أوليمبيك',
        'ما هي معمارية الباك إند (.NET) التي تستخدمها؟',
        'كيف أتواصل مع المهندس أحمد مباشرة؟'
      ]
    }
  ]);

  constructor(private langService: LanguageService) {}

  toggleChat(): void {
    this.isOpen.update(open => !open);
  }

  openChat(): void {
    this.isOpen.set(true);
  }

  closeChat(): void {
    this.isOpen.set(false);
  }

  sendMessage(userQuery: string): void {
    const trimmed = userQuery.trim();
    if (!trimmed) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date()
    };
    this.messages.update(msgs => [...msgs, userMsg]);

    // Generate intelligent contextual response
    setTimeout(() => {
      const response = this.generateResponse(trimmed);
      this.messages.update(msgs => [...msgs, response]);
    }, 600);
  }

  private generateResponse(query: string): ChatMessage {
    const q = query.toLowerCase();
    const isAr = this.langService.lang() === 'ar';

    // Pricing & cost queries
    if (q.includes('سعر') || q.includes('اسعار') || q.includes('تكلفة') || q.includes('باقة') || q.includes('باقات') || q.includes('price') || q.includes('cost')) {
      return {
        id: 'a_' + Date.now(),
        sender: 'assistant',
        text: isAr
          ? 'يوفر المهندس أحمد 3 باقات رئيسية شفافة ومرنة:\n1️⃣ باقة واجهة الأعمال الاحترافية (Modern Showcase): تبدأ من 4,500 ج.م (تسليم خلال 3-5 أيام).\n2️⃣ باقة المنظومة المتكاملة (Full-Stack .NET + Angular): 12,500 ج.م مع سيرفر وقاعدة بيانات ولوحة تحكم.\n3️⃣ باقة الـ ERP والمؤسسات المخصصة: تبدأ من 28,000 ج.م بمعمارية Clean Architecture مخصصة بالكامل.'
          : 'Engineer Ahmed offers 3 transparent pricing tiers:\n1️⃣ Starter Showcase: Starting from 4,500 EGP (3-5 days delivery).\n2️⃣ Full-Stack Platform (.NET + Angular): 12,500 EGP with API, SQL Server & Admin Panel.\n3️⃣ Custom Enterprise ERP: Starting from 28,000 EGP with tailored Clean Architecture.',
        timestamp: new Date(),
        suggestions: ['ما هي طرق الدفع المتاحة؟', 'أريد حجز باقة Full-Stack', 'تواصل عبر واتساب']
      };
    }

    // Payment methods queries
    if (q.includes('دفع') || q.includes('كاش') || q.includes('انستاباي') || q.includes('فيزا') || q.includes('بنك') || q.includes('فودافون') || q.includes('payment') || q.includes('instapay') || q.includes('vodafone')) {
      return {
        id: 'a_' + Date.now(),
        sender: 'assistant',
        text: isAr
          ? 'طرق الدفع المعتمدة والآمنة:\n⚡ انستاباي (InstaPay): تحويل فوري على الرقم 01094547599.\n📱 فودافون كاش ومحافظ المحمول: على الرقم 01094547599.\n🏦 تحويل بنكي مباشر (CIB / البنك الأهلي): متوفر للشركات مع تزويدك بـ IBAN رسمي.\n💳 بطاقات الائتمان (فيزا / ماستركارد): عبر روابط دفع Paymob مشفرة ومحمية 3D-Secure.'
          : 'Accepted and verified payment channels:\n⚡ InstaPay: Instant transfer to 01094547599.\n📱 Vodafone Cash: Mobile wallet transfer to 01094547599.\n🏦 Bank Wire (IBAN): Official corporate transfer.\n💳 Credit Cards (Visa / Mastercard): Secure 3D-Secure online link.',
        timestamp: new Date(),
        suggestions: ['نسخ رقم فودافون كاش', 'عرض قسم الأسعار وطرق الدفع', 'تواصل عبر واتساب']
      };
    }

    // Olympic Printing
    if (q.includes('اوليمبيك') || q.includes('أوليمبيك') || q.includes('olympic') || q.includes('مطابع')) {
      return {
        id: 'a_' + Date.now(),
        sender: 'assistant',
        text: isAr
          ? 'مطابع أوليمبيك (Olympic Printing) هي أحد أهم شركاء النجاح. قمنا بهندسة نظام إدارة المطابع المخصص (ERP) وتتبع أوامر التشغيل لحظياً، بالإضافة لربط الحملات التسويقية. يمكنك زيارة صفحتهم الرسمية على فيسبوك من خلال الرابط أدناه:'
          : 'Olympic Printing is a premier client partner. We engineered their custom print order ERP system and digital workflow. You can visit their official Facebook page here:',
        timestamp: new Date(),
        actionLink: {
          text: isAr ? 'زيارة صفحة مطابع أوليمبيك على فيسبوك' : 'Visit Olympic Printing Facebook Page',
          url: 'https://www.facebook.com/share/1dEwTVm8rG/?mibextid=wwXIfr'
        },
        suggestions: ['عرض تفاصيل نظام أوليمبيك البرمجية', 'ما هي خدمات أحمد الأخرى؟']
      };
    }

    // Backend & Architecture queries
    if (q.includes('باك') || q.includes('دوت نت') || q.includes('net') || q.includes('backend') || q.includes('معمارية') || q.includes('architecture') || q.includes('clean') || q.includes('c#')) {
      return {
        id: 'a_' + Date.now(),
        sender: 'assistant',
        text: isAr
          ? 'يبني المهندس أحمد الأنظمة الخلفية وفق معايير Clean Architecture الصارمة:\n• Core Domain: كيانات العمل وقواعد الأعمال الصرفة.\n• Application Layer: تطبيق نمط CQRS مع مكتبة MediatR و FluentValidation.\n• Infrastructure: Entity Framework Core 9 مع SQL Server و Redis Caching.\n• Presentation: ASP.NET Core Web API فائقة السرعة مع SignalR للبث الحي و Swagger.'
          : 'Engineer Ahmed designs backends adhering to strict Clean Architecture principles:\n• Core Domain: Enterprise business rules and pure entities.\n• Application Layer: CQRS pattern with MediatR & FluentValidation.\n• Infrastructure: EF Core 9 with SQL Server & Redis Distributed Cache.\n• Presentation: Blazing-fast ASP.NET Core Web API with SignalR and Swagger.',
        timestamp: new Date(),
        suggestions: ['هل يدعم Angular بالكامل؟', 'عرض المشاريع السابقة', 'طلب استشارة هندسية']
      };
    }

    // Contact queries
    if (q.includes('تواصل') || q.includes('رقم') || q.includes('واتس') || q.includes('فون') || q.includes('اتصال') || q.includes('contact') || q.includes('phone') || q.includes('whatsapp')) {
      return {
        id: 'a_' + Date.now(),
        sender: 'assistant',
        text: isAr
          ? 'يمكنك التواصل المباشر مع المهندس أحمد محمد فوراً عبر:\n📞 هاتف / واتساب: 01094547599\n✉️ بريد إلكتروني: ahmed.mohamed.dev2030@gmail.com\n💬 أو من خلال زر الواتساب المباشر في الموقع.'
          : 'You can reach Engineer Ahmed Mohamed directly via:\n📞 Phone / WhatsApp: +20 109 454 7599\n✉️ Email: ahmed.mohamed.dev2030@gmail.com\n💬 Or via the direct WhatsApp button on screen.',
        timestamp: new Date(),
        actionLink: {
          text: isAr ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp Chat',
          url: 'https://wa.me/201094547599'
        },
        suggestions: ['ما هي أسعار وباقات المشاريع؟', 'تحميل السيرة الذاتية (CV)']
      };
    }

    // General fallback
    return {
      id: 'a_' + Date.now(),
      sender: 'assistant',
      text: isAr
        ? `يسعدني استفسارك بخصوص "${query}". المهندس أحمد متخصص في تطوير الأنظمة السحابية المتكاملة (.NET 9 & Angular 19) وبناء أنظمة الـ ERP المخصصة وبوابات الدفع. هل ترغب في مناقشة متطلبات مشروعك، أم تود معرفة تفاصيل إحدى الباقات؟`
        : `Thank you for asking about "${query}". Engineer Ahmed specializes in enterprise cloud platforms (.NET 9 & Angular 19), custom ERP solutions, and FinTech integrations. Would you like to discuss your project requirements or review our pricing packages?`,
      timestamp: new Date(),
      suggestions: [
        'عرض باقات الأسعار وطرق الدفع',
        'الهندسة المعمارية للباك إند',
        'تواصل مع أحمد عبر واتساب'
      ]
    };
  }
}
