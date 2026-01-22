/**
 * AI Assistant Configuration File
 * تكوين المساعد الذكي
 * 
 * استخدم هذا الملف لتخصيص إعدادات المساعد الذكي
 */

const AI_CONFIG = {
    // ========== إعدادات عامة / General Settings ==========
    enabled: true,                    // تفعيل/تعطيل المساعد
    autoStart: false,                 // فتح المساعد تلقائياً عند تحميل الصفحة
    position: 'bottom-right',         // الموضع: bottom-right, bottom-left, top-right, top-left
    
    // ========== إعدادات اللغة / Language Settings ==========
    language: {
        default: 'auto',              // اللغة الافتراضية: auto, ar, en, fr, es, de, zh, ja, ru, hi, pt
        autoDetect: true,             // كشف اللغة تلقائياً
        supportedLanguages: [
            'ar',  // العربية
            'en',  // English
            'fr',  // Français
            'es',  // Español
            'de',  // Deutsch
            'zh',  // 中文
            'ja',  // 日本語
            'ru',  // Русский
            'hi',  // हिन्दी
            'pt'   // Português
        ]
    },

    // ========== إعدادات الصوت / Voice Settings ==========
    voice: {
        enabled: true,                // تفعيل الميزات الصوتية
        recognition: true,            // تفعيل التعرف الصوتي
        synthesis: true,              // تفعيل النطق الصوتي
        speed: 1.0,                   // سرعة الصوت: 0.5 - 2.0
        pitch: 1.0,                   // نبرة الصوت: 0 - 2
        volume: 1.0,                  // مستوى الصوت: 0 - 1
        autoPlay: true,               // تشغيل الردود الصوتية تلقائياً
        voiceLanguageMap: {
            'ar': 'ar-SA',
            'en': 'en-US',
            'fr': 'fr-FR',
            'es': 'es-ES',
            'de': 'de-DE',
            'zh': 'zh-CN',
            'ja': 'ja-JP',
            'ru': 'ru-RU',
            'hi': 'hi-IN',
            'pt': 'pt-PT'
        }
    },

    // ========== إعدادات الشخصية / Personality Settings ==========
    personality: {
        type: 'professional',         // professional, friendly, casual, technical
        tone: 'helpful',              // helpful, formal, informal, enthusiastic
        emoji: true,                  // استخدام الإيموجي في الردود
        greeting: {
            ar: 'مرحباً! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
            en: 'Hello! 👋 I\'m your AI assistant. How can I help you today?',
            fr: 'Bonjour! 👋 Je suis votre assistant IA. Comment puis-je vous aider?',
            es: '¡Hola! 👋 Soy tu asistente de IA. ¿Cómo puedo ayudarte?',
            de: 'Hallo! 👋 Ich bin dein KI-Assistent. Wie kann ich dir helfen?'
        }
    },

    // ========== إعدادات AI API ==========
    api: {
        provider: 'local',            // local, openai, gemini, claude, custom
        
        // OpenAI Settings
        openai: {
            apiKey: '',               // أدخل مفتاح OpenAI API الخاص بك
            model: 'gpt-4',           // gpt-4, gpt-3.5-turbo
            temperature: 0.7,         // 0 - 2 (الإبداع)
            maxTokens: 500,
            endpoint: 'https://api.openai.com/v1/chat/completions'
        },

        // Google Gemini Settings
        gemini: {
            apiKey: '',               // أدخل مفتاح Gemini API الخاص بك
            model: 'gemini-pro',
            temperature: 0.7,
            endpoint: 'https://generativelanguage.googleapis.com/v1/models'
        },

        // Custom API Settings
        custom: {
            apiKey: '',
            endpoint: '',
            headers: {},
            method: 'POST'
        }
    },

    // ========== إعدادات الواجهة / UI Settings ==========
    ui: {
        theme: 'auto',                // auto, light, dark
        accentColor: '#667eea',       // اللون الأساسي
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 24,             // نصف قطر الحواف
        showAvatar: true,             // إظهار الصورة الرمزية
        showTimestamp: true,          // إظهار الوقت
        showTypingIndicator: true,    // إظهار مؤشر الكتابة
        animationSpeed: 300,          // سرعة الحركة (ميلي ثانية)
        position: {
            bottom: '30px',
            right: '30px',
            left: 'auto',
            top: 'auto'
        }
    },

    // ========== إعدادات السلوك / Behavior Settings ==========
    behavior: {
        saveHistory: true,            // حفظ المحادثات
        maxHistoryItems: 100,         // أقصى عدد للرسائل المحفوظة
        autoSuggestions: true,        // عرض الاقتراحات التلقائية
        quickActions: true,           // إظهار الأزرار السريعة
        closeOnNavigate: false,       // إغلاق المساعد عند الانتقال لصفحة أخرى
        minimizeOnOutsideClick: false, // تصغير عند النقر خارج النافذة
        responseDelay: 1000,          // تأخير الرد (ميلي ثانية)
        typingSpeed: 50               // سرعة الكتابة (ميلي ثانية لكل حرف)
    },

    // ========== الأزرار السريعة / Quick Actions ==========
    quickActions: [
        {
            icon: 'bi-briefcase',
            label: 'Portfolio',
            action: 'portfolio',
            url: 'Projects.html'
        },
        {
            icon: 'bi-code-slash',
            label: 'Skills',
            action: 'skills',
            url: 'Skills.html'
        },
        {
            icon: 'bi-envelope',
            label: 'Contact',
            action: 'contact',
            url: 'Contact.html'
        },
        {
            icon: 'bi-file-earmark-text',
            label: 'CV',
            action: 'cv',
            url: 'CV.html'
        }
    ],

    // ========== الاقتراحات التلقائية / Auto Suggestions ==========
    suggestions: {
        ar: [
            'اعرض لي أعمالك',
            'ما هي مهاراتك؟',
            'كيف أتواصل معك؟',
            'تحميل السيرة الذاتية',
            'أخبرني المزيد عن مشاريعك'
        ],
        en: [
            'Show me your portfolio',
            'What are your skills?',
            'How can I contact you?',
            'Download CV',
            'Tell me about your projects'
        ],
        fr: [
            'Montrez-moi votre portfolio',
            'Quelles sont vos compétences?',
            'Comment vous contacter?',
            'Télécharger le CV'
        ],
        es: [
            'Muéstrame tu portafolio',
            '¿Cuáles son tus habilidades?',
            '¿Cómo contactarte?',
            'Descargar CV'
        ]
    },

    // ========== الردود المحلية / Local Responses ==========
    localResponses: {
        ar: {
            greeting: ['مرحباً! كيف يمكنني مساعدتك؟', 'أهلاً بك! 😊'],
            portfolio: 'يمكنك الاطلاع على أعمالي في قسم المشاريع. هل تريد أن أوجهك إليه؟',
            skills: 'أمتلك خبرة واسعة في تطوير الويب، البرمجة، وتطوير التطبيقات. ما الذي يهمك بالتحديد؟',
            contact: 'يمكنك التواصل معي عبر نموذج الاتصال أو البريد الإلكتروني. هل تريد المساعدة؟',
            cv: 'يمكنك تحميل السيرة الذاتية من القسم المخصص. هل تريد الذهاب إليه الآن؟',
            thanks: 'على الرحب والسعة! 😊 هل تحتاج لمساعدة أخرى؟',
            goodbye: 'وداعاً! سعدت بمساعدتك. 👋',
            error: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
            notUnderstood: 'عذراً، لم أفهم سؤالك. هل يمكنك إعادة صياغته؟'
        },
        en: {
            greeting: ['Hello! How can I help you?', 'Welcome! 😊'],
            portfolio: 'You can check out my work in the Projects section. Would you like me to guide you there?',
            skills: 'I have extensive experience in web development, programming, and app development. What specifically interests you?',
            contact: 'You can reach me through the contact form or email. Need help with that?',
            cv: 'You can download my CV from the dedicated section. Would you like to go there now?',
            thanks: 'You\'re welcome! 😊 Need anything else?',
            goodbye: 'Goodbye! Happy to help. 👋',
            error: 'Sorry, an error occurred. Please try again.',
            notUnderstood: 'Sorry, I didn\'t understand your question. Can you rephrase it?'
        }
    },

    // ========== التحليلات / Analytics ==========
    analytics: {
        enabled: false,               // تفعيل التحليلات
        trackEvents: true,            // تتبع الأحداث
        trackMessages: false,         // تتبع الرسائل (احترم الخصوصية)
        provider: 'google',           // google, custom
        googleAnalyticsId: ''         // معرف Google Analytics
    },

    // ========== الإشعارات / Notifications ==========
    notifications: {
        enabled: true,                // تفعيل الإشعارات
        sound: false,                 // صوت الإشعار
        desktop: false,               // إشعارات سطح المكتب
        showOnNewMessage: true        // إظهار إشعار عند وصول رسالة جديدة
    },

    // ========== الأمان / Security ==========
    security: {
        sanitizeInput: true,          // تنظيف المدخلات
        preventXSS: true,             // الحماية من XSS
        rateLimit: {
            enabled: true,
            maxRequests: 10,          // أقصى عدد من الطلبات
            timeWindow: 60000         // الفترة الزمنية (ميلي ثانية)
        }
    },

    // ========== التطوير / Development ==========
    development: {
        debug: false,                 // وضع التطوير
        logMessages: false,           // طباعة الرسائل في Console
        showErrors: false,            // إظهار الأخطاء
        mockAPI: false                // استخدام API وهمي للاختبار
    }
};

// ========== دوال مساعدة / Helper Functions ==========

/**
 * الحصول على التكوين المخصص
 */
function getAIConfig() {
    return AI_CONFIG;
}

/**
 * تحديث التكوين
 */
function updateAIConfig(updates) {
    Object.assign(AI_CONFIG, updates);
    
    // إعادة تهيئة المساعد
    if (window.aiAssistant) {
        window.aiAssistant.init(AI_CONFIG);
    }
}

/**
 * إعادة تعيين التكوين للإعدادات الافتراضية
 */
function resetAIConfig() {
    localStorage.removeItem('ai-config');
    location.reload();
}

/**
 * حفظ التكوين في LocalStorage
 */
function saveAIConfig() {
    localStorage.setItem('ai-config', JSON.stringify(AI_CONFIG));
}

/**
 * تحميل التكوين من LocalStorage
 */
function loadAIConfig() {
    const saved = localStorage.getItem('ai-config');
    if (saved) {
        try {
            Object.assign(AI_CONFIG, JSON.parse(saved));
        } catch (e) {
            console.error('Failed to load AI config:', e);
        }
    }
}

// تحميل التكوين المحفوظ عند بدء التشغيل
loadAIConfig();

// تصدير التكوين للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AI_CONFIG;
}
