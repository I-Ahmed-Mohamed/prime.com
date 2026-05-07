
(function () {
  const html = document.documentElement;
  const state = {
    theme: localStorage.getItem('ahmed-theme') || 'dark',
    lang: localStorage.getItem('ahmed-lang') || 'ar'
  };
  const current = (location.pathname.split('/').pop() || 'index.html');
  const translations = {
    ar: {
      navHome: 'الرئيسية', navAbout: 'معلوماتي', navSkills: 'المهارات', navServices: 'الخدمات', navProjects: 'المشاريع', navDesigns: 'التصميمات', navVideos: 'الفيديوهات', navAI: 'AI OS', navContact: 'تواصل', navCV: 'السي في',
      hireBtn: 'ابدأ مشروعك', footerRights: 'جميع الحقوق محفوظة', footerBuilt: 'تصميم وتجهيز أحمد محمد • 2070 Portfolio OS', aiGreeting: 'أهلاً بيك 👋 أنا أحمد محمد. اسألني عن المواقع، الأنظمة، التصميمات، إدارة الصفحات، الفيديوهات، أو الأتمتة بالذكاء الاصطناعي.',
      aiThinking: 'جاري الرد...', send: 'إرسال', placeholder: 'اكتب طلبك هنا... مثال: عاوز موقع لشركتي بشكل عالمي', openAI: 'افتح مساعد AI', searchPrompt: 'محتاج تطلع إيه؟'
    },
    en: {
      navHome: 'Home', navAbout: 'Profile', navSkills: 'Skills', navServices: 'Services', navProjects: 'Projects', navDesigns: 'Designs', navVideos: 'Videos', navAI: 'AI OS', navContact: 'Contact', navCV: 'CV',
      hireBtn: 'Start Project', footerRights: 'All rights reserved', footerBuilt: 'Designed and prepared by Ahmed Mohamed • 2070 Portfolio OS', aiGreeting: 'Hi 👋 I’m Ahmed Mohamed. Ask me about websites, systems, design, page management, video content, or AI automation.',
      aiThinking: 'Thinking...', send: 'Send', placeholder: 'Type your request... Example: I need a futuristic website for my company', openAI: 'Open AI Assistant', searchPrompt: 'What do you want to discover?'
    }
  };

  function applyTheme() {
    html.dataset.theme = state.theme;
    document.querySelectorAll('[data-theme-icon]').forEach(el => el.className = state.theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars');
  }
  function applyLang() {
    html.lang = state.lang;
    html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.innerHTML = state.lang === 'ar' ? el.dataset.ar : el.dataset.en;
    });
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.dataset.i18nKey;
      const val = translations[state.lang][key];
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const val = translations[state.lang][key];
      if (val) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-lang-toggle]').forEach(el => el.textContent = state.lang === 'ar' ? 'EN' : 'AR');
  }
  function saveState() {
    localStorage.setItem('ahmed-theme', state.theme);
    localStorage.setItem('ahmed-lang', state.lang);
  }

  function bindUI() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'; saveState(); applyTheme();
    }));
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => btn.addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar'; saveState(); applyLang();
    }));
    document.querySelectorAll('[data-menu-toggle]').forEach(btn => btn.addEventListener('click', () => {
      const nav = document.querySelector('.os-nav');
      if (!nav) return;
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.position = 'absolute';
      nav.style.top = '76px';
      nav.style.left = '12px';
      nav.style.right = '12px';
      nav.style.padding = '12px';
      nav.style.borderRadius = '22px';
      nav.style.background = 'var(--panel-2)';
      nav.style.border = '1px solid var(--line)';
      nav.style.boxShadow = 'var(--shadow)';
      nav.style.flexDirection = 'column';
      nav.style.alignItems = 'stretch';
      nav.style.zIndex = '999';
    }));
    window.addEventListener('resize', () => {
      const nav = document.querySelector('.os-nav');
      if (!nav) return;
      if (window.innerWidth > 1100) {
        nav.removeAttribute('style');
      }
    });

    document.querySelectorAll('[data-open-whatsapp]').forEach(btn => btn.addEventListener('click', e => {
      e.preventDefault();
      const phone = '201094547599';
      const msg = encodeURIComponent(state.lang === 'ar' ? 'السلام عليكم، عاوز أبدأ مشروع معاك.' : 'Hello Ahmed, I want to start a project with you.');
      window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
    }));

    const contactForm = document.getElementById('contactForm2070');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = new FormData(contactForm);
        const name = data.get('name') || '';
        const service = data.get('service') || '';
        const details = data.get('details') || '';
        const phone = data.get('phone') || '';
        const text = state.lang === 'ar'
          ? `الاسم: ${name}\nالخدمة: ${service}\nالرقم: ${phone}\nالتفاصيل: ${details}`
          : `Name: ${name}\nService: ${service}\nPhone: ${phone}\nDetails: ${details}`;
        window.open('https://wa.me/201094547599?text=' + encodeURIComponent(text), '_blank');
      });
    }
  }

  function initAIPage() {
    const messages = document.getElementById('aiMessages');
    const form = document.getElementById('aiForm2070');
    const input = document.getElementById('aiInput2070');
    if (!messages || !form || !input) return;
    const persona = {
      phone1: '01094547599', phone2: '01044599911', email: 'ahmedcodteng@gmail.com',
      servicesAr: 'مواقع، بورتفوليو، أنظمة إدارة، داشبوردات، تصميم سوشيال ميديا، إدارة صفحات، فيديوهات AI، أتمتة، وبرومبتات',
      servicesEn: 'websites, portfolios, admin systems, dashboards, social media design, page management, AI videos, automation, and prompts',
      stackAr: 'Full Stack .NET، Angular، HTML، CSS، JavaScript، SQL Server، Entity Framework، Photoshop، وأدوات الذكاء الاصطناعي',
      stackEn: 'Full Stack .NET, Angular, HTML, CSS, JavaScript, SQL Server, Entity Framework, Photoshop, and AI tools'
    };
    function add(text, type='bot') {
      const div = document.createElement('div');
      div.className = 'msg ' + type;
      div.innerHTML = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }
    function esc(s) { return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
    function reply(q) {
      const t = (q || '').toLowerCase();
      const ar = /[\u0600-\u06FF]/.test(q) || state.lang === 'ar';
      const direct = ar
        ? `<br><br><b>تواصل مباشر:</b><br><a href="tel:+201094547599">${persona.phone1}</a> - <a href="tel:+201044599911">${persona.phone2}</a>`
        : `<br><br><b>Direct contact:</b><br><a href="tel:+201094547599">${persona.phone1}</a> - <a href="tel:+201044599911">${persona.phone2}</a>`;
      if (/موقع|ويب|website|site|landing|شركة/.test(t)) return ar ? `أقدر أبني لك موقع شكله عالمي جدًا: UI حديث، أداء قوي، تجربة موبايل ممتازة، ترجمة، وضع ليلي ونهاري، ولو حابب نضيف AI داخل الموقع نعمله بشكل احترافي. <a href="Services.html">افتح الخدمات</a>${direct}` : `I can build a world-class website: modern UI, strong performance, excellent mobile UX, translation, dark/light mode, and integrated AI if needed. <a href="Services.html">Open services</a>${direct}`;
      if (/system|dashboard|erp|ادارة|إدارة|نظام|مخزن/.test(t)) return ar ? `أقدر أعملك نظام إدارة أو Dashboard عملي لشغلك، فيه تتبع، تقارير، تنظيم بيانات، وتجربة استخدام واضحة وسريعة. <a href="Projects.html">شوف المشاريع</a>` : `I can build a practical business system or dashboard with tracking, reports, clean data flow, and a fast user experience. <a href="Projects.html">See projects</a>`;
      if (/design|تصميم|بوست|social|pages|سوشيال|صفحات/.test(t)) return ar ? `في التصميم أقدر أظبط الهوية والبروفايل البصري بالكامل: بوستات، كابشنات، أفكار محتوى، إدارة صفحات، وطريقة عرض احترافية للبراند. <a href="Designs.html">شوف التصميمات</a>${direct}` : `For design, I can shape the full visual identity: posts, captions, content ideas, page management, and a premium brand presentation. <a href="Designs.html">View designs</a>${direct}`;
      if (/video|ريل|reel|motion|فيديو|ai/.test(t)) return ar ? `أقدر أطلع لك فيديوهات AI، أفكار ريلز، سكريبتات، برومبتات، ومشاهد تسويقية قوية جدًا. <a href="Videos.html">افتح الفيديوهات</a>` : `I can create AI videos, reel ideas, scripts, prompts, and high-impact marketing scenes. <a href="Videos.html">Open videos</a>`;
      if (/skill|stack|مهارات|angular|dotnet|sql|frontend|backend|برمجة/.test(t)) return ar ? `الستاك بتاعي: ${persona.stackAr}. <a href="Skills.html">افتح المهارات</a>` : `My stack: ${persona.stackEn}. <a href="Skills.html">Open skills</a>`;
      if (/سعر|كام|تكلفة|price|cost/.test(t)) return ar ? `الأسعار بتختلف حسب المطلوب، لكن كمبدأ: المواقع التعريفية تبدأ من 5000 جنيه، وإدارة الصفحات الشهرية تبدأ من 2000 جنيه. ${direct}` : `Pricing depends on scope, but as a baseline: informational websites start from 5000 EGP, and monthly page management starts from 2000 EGP. ${direct}`;
      if (/تواصل|رقم|واتساب|phone|contact|whatsapp/.test(t)) return ar ? `كلمني على <b>${persona.phone1}</b> أو <b>${persona.phone2}</b>، أو افتح صفحة <a href="Contact.html">التواصل</a>.` : `Reach me at <b>${persona.phone1}</b> or <b>${persona.phone2}</b>, or open the <a href="Contact.html">Contact</a> page.`;
      return ar ? `أنا أحمد محمد. أقدر أساعدك في ${persona.servicesAr}. اكتبلي طلبك بشكل مباشر وأنا هوجّهك لأفضل حل.${direct}` : `I’m Ahmed Mohamed. I can help with ${persona.servicesEn}. Tell me your exact goal and I’ll guide you to the best solution.${direct}`;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      add(esc(q), 'user');
      input.value = '';
      setTimeout(() => add(reply(q), 'bot'), 180);
    });
    document.querySelectorAll('[data-ai-prompt]').forEach(btn => btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-ai-prompt');
      add(esc(q), 'user');
      setTimeout(() => add(reply(q), 'bot'), 180);
    }));
    add(state.lang === 'ar' ? translations.ar.aiGreeting : translations.en.aiGreeting, 'bot');
    const q = new URLSearchParams(location.search).get('q');
    if (q) setTimeout(() => { add(esc(q), 'user'); add(reply(q), 'bot'); }, 200);
  }

  function initTypePrompts() {
    const el = document.querySelector('[data-rotate-prompts]');
    if (!el) return;
    const ar = ['عاوز موقع يخطف العين', 'عاوز نظام لشغلي', 'اعمللي تصميمات احترافية', 'محتاج فيديو AI عالمي'];
    const en = ['I need a premium website', 'Build a dashboard for my work', 'Create pro social designs', 'I need a powerful AI video'];
    let index = 0;
    setInterval(() => {
      const list = state.lang === 'ar' ? ar : en;
      index = (index + 1) % list.length;
      el.textContent = list[index];
    }, 2300);
  }

  function markActiveLinks() {
    document.querySelectorAll('.os-link, .mobile-dock a').forEach(a => {
      if ((a.getAttribute('href') || '') === current) a.classList.add('active');
    });
  }

  function init() {
    applyTheme();
    applyLang();
    bindUI();
    initAIPage();
    initTypePrompts();
    markActiveLinks();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
