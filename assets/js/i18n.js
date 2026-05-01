/* ================================================================
   INTERNATIONALIZATION SYSTEM (i18n)
   assets/js/i18n.js
================================================================ */

const I18n = {
  currentLang: 'en',
  supportedLangs: ['en', 'ar'],
  
  translations: {
    en: {
      nav_home: 'Home',
      nav_about: 'About',
      nav_skills: 'Skills',
      nav_projects: 'Projects',
      nav_services: 'Services',
      nav_contact: 'Contact',
      hire_me: 'Hire Me',
      
      available: 'Available for Work',
      hero_title: 'I Build Brands, Manage Pages & Create Powerful Websites',
      hero_subtitle: 'Frontend Developer • Backend Engineer • Digital Creator',
      view_work: 'View My Work',
      years_exp: 'Years Exp.',
      projects_done: 'Projects',
      clients: 'Happy Clients',
      
      about_me: 'About Me',
      tech_skills: 'Technical Skills',
      my_projects: 'My Projects',
      my_services: 'Services',
      get_in_touch: 'Get In Touch',
      
      // Additional common translations
      download: 'Download',
      contact_me: 'Contact Me',
      learn_more: 'Learn More',
      all: 'All',
      web_dev: 'Web Dev',
      design: 'Design',
      social_media: 'Social Media',
    },
    ar: {
      nav_home: 'الرئيسية',
      nav_about: 'عني',
      nav_skills: 'المهارات',
      nav_projects: 'المشاريع',
      nav_services: 'الخدمات',
      nav_contact: 'تواصل',
      hire_me: 'وظّفني',
      
      available: 'متاح للعمل',
      hero_title: 'أبني الأنظمة • أدير الصفحات • أطور المواقع القوية',
      hero_subtitle: 'مطور Frontend • مهندس Backend • مبدع رقمي',
      view_work: 'اعرض أعمالي',
      years_exp: 'سنوات خبرة',
      projects_done: 'مشروع',
      clients: 'عملاء راضون',
      
      about_me: 'عني',
      tech_skills: 'المهارات التقنية',
      my_projects: 'مشاريعي',
      my_services: 'الخدمات',
      get_in_touch: 'تواصل معي',
      
      download: 'حمّل',
      contact_me: 'تواصل معي',
      learn_more: 'اعرف أكثر',
      all: 'الكل',
      web_dev: 'تطوير ويب',
      design: 'تصميم',
      social_media: 'وسائل اجتماعية',
    }
  },
  
  // Initialize i18n
  init() {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.setLanguage(savedLang);
  },
  
  // Set language
  setLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) lang = 'en';
    
    this.currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
    
    // Update all i18n elements
    this.updatePage();
    
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  },
  
  // Update page content
  updatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text) el.textContent = text;
    });
  },
  
  // Get translation
  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key
      }
    }
    
    return value || key;
  },
  
  // Get current language
  getLang() {
    return this.currentLang;
  },
  
  // Toggle language
  toggleLang() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => I18n.init());
} else {
  I18n.init();
}
