/* AHMED MOHAMED — PRIME 2029 AI ENGINE */
(function () {
  const state = {
    lang: localStorage.getItem('prime-lang') || 'en',
    theme: localStorage.getItem('prime-theme') || 'dark',
  };



  const ahmedPersona = {
    name: 'Ahmed Mohamed',
    phone1: '01094547599',
    phone2: '01044599911',
    email: 'ahmedcodteng@gmail.com',
    location: 'Egypt',
    roleAr: 'مهندس برمجيات ومصمم ومدير صفحات وصانع محتوى بالذكاء الاصطناعي',
    roleEn: 'software engineer, designer, page manager, and AI content creator',
    servicesAr: 'تصميم وبرمجة مواقع، داشبوردات وأنظمة إدارة، Angular وFull Stack .NET، تصميم بوستات، إدارة صفحات، فيديوهات AI، وأتمتة ذكية للشغل',
    servicesEn: 'websites, dashboards, management systems, Angular and Full Stack .NET, post design, page management, AI videos, and smart automation',
    toneAr: 'اتكلم بلساني كأحمد محمد: مصري، بسيط، واثق، محترم، وتسويقي من غير مبالغة',
    toneEn: 'Speak as Ahmed Mohamed: confident, friendly, direct, premium, and sales-aware without exaggeration',
    pricesAr: 'المواقع التعريفية تبدأ من 5000 جنيه حسب التفاصيل، وإدارة الصفحات الشهرية تبدأ من 2000 جنيه حسب المطلوب',
    pricesEn: 'landing websites start from 5000 EGP depending on scope, and monthly page management starts from 2000 EGP depending on requirements',
  };

  const pages = [
    { titleEn: 'Home', titleAr: 'الرئيسية', url: 'index.html', icon: 'bx bx-home-alt-2', tags: 'home main start hero' },
    { titleEn: 'About Ahmed', titleAr: 'من هو أحمد', url: 'About.html', icon: 'bx bx-user-voice', tags: 'about bio experience personal' },
    { titleEn: 'CV', titleAr: 'السي في', url: 'CV.html', icon: 'bx bx-id-card', tags: 'cv resume pdf work' },
    { titleEn: 'Skills', titleAr: 'المهارات', url: 'Skills.html', icon: 'bx bx-code-curly', tags: 'skills angular dotnet sql backend frontend' },
    { titleEn: 'Projects', titleAr: 'المشاريع', url: 'Projects.html', icon: 'bx bx-layer', tags: 'projects portfolio ecommerce dashboard website' },
    { titleEn: 'Designs', titleAr: 'التصميمات', url: 'Designs.html', icon: 'bx bx-palette', tags: 'designs photoshop posts social media' },
    { titleEn: 'Videos', titleAr: 'الفيديوهات', url: 'Videos.html', icon: 'bx bx-movie-play', tags: 'video reels ai motion' },
    { titleEn: 'Services', titleAr: 'الخدمات', url: 'Services.html', icon: 'bx bx-briefcase-alt-2', tags: 'services price web design management' },
    { titleEn: 'Contact', titleAr: 'التواصل', url: 'Contact.html', icon: 'bx bx-message-dots', tags: 'contact phone email whatsapp hire' },
  ];

  const i18n = {
    brandSub: { en: 'AI Software Engineer', ar: 'برمجة • تصميم • AI' },
    hireMe: { en: 'Start', ar: 'ابدأ' },
    heroKicker: { en: '2029 AI Portfolio', ar: 'بورتفوليو ذكي 2029' },
    heroTitle: { en: 'Tell me what you want to build.', ar: 'قولّي عاوز تبني إيه.' },
    heroText: { en: 'A clean AI-style entrance for websites, designs, pages, videos, and smart digital work.', ar: 'واجهة بسيطة بشكل AI للمواقع والتصميمات والصفحات والفيديوهات والشغل الديجيتال الذكي.' },
    exploreProjects: { en: 'Projects', ar: 'المشاريع' },
    viewServices: { en: 'Services', ar: 'الخدمات' },
    contactNow: { en: 'Contact', ar: 'تواصل' },
    askAI: { en: 'Open AI Studio', ar: 'افتح المساعد' },
    chip1T: { en: 'AI Guide', ar: 'مساعد ذكي' },
    chip1: { en: 'Answers visitors and opens the right section instantly.', ar: 'يرد على الزوار ويفتح القسم المناسب فورًا.' },
    chip2T: { en: 'Bilingual', ar: 'ترجمة فورية' },
    chip2: { en: 'Arabic / English interface saved automatically.', ar: 'واجهة عربي وإنجليزي وتتحفظ تلقائيًا.' },
    chip3T: { en: 'Adaptive Theme', ar: 'وضع متغير' },
    chip3: { en: 'Dark and light modes with premium glass styling.', ar: 'وضع ليلي ونهاري بتصميم زجاجي فاخر.' },
    marqueeBadge: { en: 'Endless Visual Journey', ar: 'رحلة بصرية لا نهائية' },
    marqueeTitle: { en: 'Creative Marquee 🚀', ar: 'شريط الإبداعات 🚀' },
    marqueeSubtitle: { en: 'Watch all my designs in a continuous stream of passion and limitless creativity.', ar: 'شاهد جميع تصميماتي في عرض مستمر يجسد الشغف والإبداع اللامحدود.' }
  };

  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem('prime-lang', lang);
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (i18n[key]) el.textContent = i18n[key][lang];
    });
    document.querySelectorAll('.prime-links .nav-link').forEach(link => {
      const span = link.querySelector('span');
      if (span) span.textContent = link.dataset[lang === 'ar' ? 'navAr' : 'navEn'];
    });
    document.querySelectorAll('.prime-mobile-tab').forEach(link => {
      const strong = link.querySelector('strong');
      if (strong) strong.textContent = link.dataset[lang === 'ar' ? 'mobileAr' : 'mobileEn'];
    });
    const langBtn = document.getElementById('prime-lang-toggle');
    if (langBtn) langBtn.textContent = lang === 'ar' ? 'EN' : 'ع';
    document.querySelectorAll('[data-auto-translate]').forEach(el => translateKnownText(el));
    document.querySelectorAll('.copilot-typing').forEach(el => {
      const val = lang === 'ar' ? el.dataset.typedAr : el.dataset.typedEn;
      if (val) el.textContent = val;
    });
    refreshSearchResults(document.getElementById('prime-search-input')?.value || '');
  }

  const dictionary = [
    ['My Projects', 'مشاريعي'], ['My Skills', 'مهاراتي'], ['Contact', 'التواصل'], ['About', 'من أنا'],
    ['Services', 'الخدمات'], ['Designs', 'التصميمات'], ['Videos', 'الفيديوهات'], ['Home', 'الرئيسية'],
    ['Skills', 'المهارات'], ['Projects', 'المشاريع'], ['Send Message', 'إرسال الرسالة'], ['Name', 'الاسم'],
    ['Email', 'البريد الإلكتروني'], ['Subject', 'العنوان'], ['Message', 'الرسالة'], ['Enter Phone', 'اكتب رقم الهاتف'],
    ['Your message has been sent. Thank you!', 'تم إرسال رسالتك. شكرًا لك!'], ['Loading', 'جاري التحميل'],
  ];
  function translateKnownText(root) {
    if (!root || root.children.length) return;
    const raw = root.textContent.trim();
    if (!raw || raw.length > 70) return;
    const pair = dictionary.find(([en, ar]) => raw.toLowerCase() === (state.lang === 'ar' ? en.toLowerCase() : ar.toLowerCase()));
    if (pair) root.textContent = state.lang === 'ar' ? pair[1] : pair[0];
  }

  function setTheme(theme) {
    state.theme = theme;
    localStorage.setItem('prime-theme', theme);
    document.documentElement.dataset.theme = theme;
    const icon = document.querySelector('#prime-theme-toggle i');
    if (icon) icon.className = `bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'}`;
  }

  function initNavControls() {
    document.getElementById('prime-theme-toggle')?.addEventListener('click', () => setTheme(state.theme === 'dark' ? 'light' : 'dark'));
    document.getElementById('prime-lang-toggle')?.addEventListener('click', () => setLang(state.lang === 'en' ? 'ar' : 'en'));
    document.getElementById('prime-menu-toggle')?.addEventListener('click', e => {
      const links = document.querySelector('.prime-links');
      links?.classList.toggle('open');
      e.currentTarget.setAttribute('aria-expanded', links?.classList.contains('open') ? 'true' : 'false');
    });
    document.querySelectorAll('.prime-links a').forEach(a => a.addEventListener('click', () => document.querySelector('.prime-links')?.classList.remove('open')));
  }

  function injectHomeHero() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    if (current !== 'index.html' || document.querySelector('.prime-smart-hero') || document.querySelector('.prime-copilot-hero')) return;
    const nav = document.getElementById('navbar-container');
    const hero = document.createElement('section');
    hero.className = 'prime-smart-hero';
    hero.innerHTML = `
      <span class="prime-kicker"><i class="bi bi-stars"></i><span data-i18n="heroKicker"></span></span>
      <h1 data-i18n="heroTitle"></h1>
      <p data-i18n="heroText"></p>
      <div class="prime-hero-actions">
        <a class="prime-btn-main" href="Projects.html"><i class="bi bi-rocket-takeoff"></i><span data-i18n="exploreProjects"></span></a>
        <button class="prime-btn-soft" id="open-ai-from-hero"><i class="bi bi-cpu"></i><span data-i18n="askAI"></span></button>
      </div>
      <div class="prime-ai-strip">
        <div class="prime-ai-chip"><b data-i18n="chip1T"></b><span data-i18n="chip1"></span></div>
        <div class="prime-ai-chip"><b data-i18n="chip2T"></b><span data-i18n="chip2"></span></div>
        <div class="prime-ai-chip"><b data-i18n="chip3T"></b><span data-i18n="chip3"></span></div>
      </div>
    `;
    nav?.after(hero);
    hero.querySelector('#open-ai-from-hero')?.addEventListener('click', () => window.location.href = 'AI-Guide.html');
  }

  function initSearch() {
    const panel = document.createElement('div');
    panel.className = 'prime-search-panel';
    panel.innerHTML = `
      <div class="prime-search-box">
        <div class="prime-search-head">
          <i class="bi bi-stars"></i>
          <input id="prime-search-input" type="search" placeholder="${state.lang === 'ar' ? 'دور بالذكاء الاصطناعي داخل الموقع...' : 'AI search inside the website...'}" />
          <button class="prime-action-btn" id="prime-search-close"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="prime-search-results" id="prime-search-results"></div>
      </div>`;
    document.body.appendChild(panel);
    document.getElementById('prime-search-open')?.addEventListener('click', () => openSearch());
    document.getElementById('prime-search-close')?.addEventListener('click', () => closeSearch());
    panel.addEventListener('click', e => { if (e.target === panel) closeSearch(); });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
      if (e.key === 'Escape') closeSearch();
    });
    document.getElementById('prime-search-input')?.addEventListener('input', e => refreshSearchResults(e.target.value));
    refreshSearchResults('');
  }
  function openSearch() { const panel = document.querySelector('.prime-search-panel'); panel?.classList.add('open'); setTimeout(() => document.getElementById('prime-search-input')?.focus(), 50); }
  function closeSearch() { document.querySelector('.prime-search-panel')?.classList.remove('open'); }
  function refreshSearchResults(q) {
    const box = document.getElementById('prime-search-results');
    if (!box) return;
    const query = (q || '').toLowerCase().trim();
    const results = pages.filter(p => !query || `${p.titleEn} ${p.titleAr} ${p.tags}`.toLowerCase().includes(query));
    box.innerHTML = results.map(p => `
      <a class="prime-result" href="${p.url}">
        <i class="${p.icon}"></i>
        <span><b>${state.lang === 'ar' ? p.titleAr : p.titleEn}</b><small style="display:block;margin-top:4px">${state.lang === 'ar' ? smartHintAr(p.url) : smartHintEn(p.url)}</small></span>
      </a>`).join('') || `<div class="prime-result"><i class="bi bi-info-circle"></i><span>${state.lang === 'ar' ? 'مفيش نتيجة، جرّب Projects أو Skills أو Contact' : 'No results. Try Projects, Skills, or Contact.'}</span></div>`;
  }
  function smartHintEn(url) {
    return ({'Projects.html':'View delivered work and demos','Skills.html':'Tech stack and tools','Contact.html':'Start a project or collaboration','Services.html':'Web, design and page management services'}[url] || 'Open this portfolio section');
  }
  function smartHintAr(url) {
    return ({'Projects.html':'شوف الشغل والديموهات','Skills.html':'اللغات والأدوات والخبرة','Contact.html':'ابدأ مشروع أو تواصل مباشر','Services.html':'خدمات مواقع وتصميم وإدارة صفحات'}[url] || 'افتح القسم ده من البورتفوليو');
  }

  function initAI() {
    document.querySelectorAll('#prime-ai-toggle, #prime-ai-window, #ai-assistant-container, #ai-chat-window, #ai-toggle-btn').forEach(el => el.remove());

    if ((window.location.pathname.split('/').pop() || 'index.html') === 'AI-Guide.html') {
      window.PrimeAI = { open: () => window.scrollTo({ top: 0, behavior: 'smooth' }), close: () => {}, ask: q => window.AhmedAIPage?.ask(q) };
      return;
    }

    const aiLink = document.createElement('a');
    aiLink.id = 'prime-ai-toggle';
    aiLink.href = 'AI-Guide.html';
    aiLink.title = state.lang === 'ar' ? 'افتح مساعد أحمد الذكي' : 'Open Ahmed AI assistant';
    aiLink.setAttribute('aria-label', aiLink.title);
    aiLink.innerHTML = '<i class="bi bi-stars"></i>';
    document.body.appendChild(aiLink);

    window.PrimeAI = {
      open: () => { window.location.href = 'AI-Guide.html'; },
      close: () => {},
      ask: q => { window.location.href = 'AI-Guide.html?q=' + encodeURIComponent(q || ''); }
    };
  }

  function escapeHTML(s) { return s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function isArabicText(s) { return /[\u0600-\u06FF]/.test(s) || state.lang === 'ar'; }
  function greeting() {
    return state.lang === 'ar'
      ? `أهلاً بيك 👋 أنا أحمد محمد. شغلي مواقع وداتشبوردات وتصميم وإدارة صفحات وفيديوهات AI. اسألني عن أي خدمة أو كلمني مباشر: <b>${ahmedPersona.phone1}</b> - <b>${ahmedPersona.phone2}</b>.`
      : `Hi 👋 I’m Ahmed Mohamed. I build websites, dashboards, designs, page systems, and AI content workflows. Ask me about any service or call: <b>${ahmedPersona.phone1}</b> - <b>${ahmedPersona.phone2}</b>.`;
  }
  function buildReply(q) {
    const ar = isArabicText(q);
    const t = q.toLowerCase();
    const contactLinks = ar
      ? `<br><br><b>تواصل مباشر:</b><br><a href="tel:+2${ahmedPersona.phone1}" style="color:var(--prime-accent);font-weight:900">${ahmedPersona.phone1}</a> - <a href="tel:+2${ahmedPersona.phone2}" style="color:var(--prime-accent);font-weight:900">${ahmedPersona.phone2}</a>`
      : `<br><br><b>Direct contact:</b><br><a href="tel:+2${ahmedPersona.phone1}" style="color:var(--prime-accent);font-weight:900">${ahmedPersona.phone1}</a> - <a href="tel:+2${ahmedPersona.phone2}" style="color:var(--prime-accent);font-weight:900">${ahmedPersona.phone2}</a>`;
    const go = (url, label) => `${ar ? 'تمام، افتح من هنا:' : 'Sure, open it here:'} <a href="${url}" style="color:var(--prime-accent);font-weight:900">${label}</a>`;

    if (/مين|انت مين|about|bio|profile|من انت|تعرف/.test(t)) return ar
      ? `أنا أحمد محمد، ${ahmedPersona.roleAr}. بساعدك تطلع شغلك بشكل احترافي من أول الموقع والبراند لحد المحتوى والذكاء الاصطناعي. <a href="About.html" style="color:var(--prime-accent);font-weight:900">افتح البروفايل</a>${contactLinks}`
      : `I’m Ahmed Mohamed, a ${ahmedPersona.roleEn}. I help brands look professional through websites, systems, design, content, and AI workflows. <a href="About.html" style="color:var(--prime-accent);font-weight:900">Open Profile</a>${contactLinks}`;
    if (/project|portfolio|مشاريع|المشاريع|شغل|اعمال|أعمال/.test(t)) return go('Projects.html', ar ? 'صفحة المشاريع' : 'Projects page');
    if (/skill|مهارات|لغات|angular|dotnet|\.net|sql|backend|frontend|برمجة/.test(t)) return ar
      ? `أنا شغال Full Stack .NET وAngular، وبشتغل HTML/CSS/JS/TypeScript وSQL Server وEntity Framework، وبعرف أبني UI منظم وأنظمة عملية للشركات. <a href="Skills.html" style="color:var(--prime-accent);font-weight:900">افتح المهارات</a>`
      : `I work with Full Stack .NET and Angular, plus HTML/CSS/JS/TypeScript, SQL Server, Entity Framework, clean UI, and practical business systems. <a href="Skills.html" style="color:var(--prime-accent);font-weight:900">Open Skills</a>`;
    if (/cv|resume|سي ?في|السيرة/.test(t)) return go('CV.html', ar ? 'السي في' : 'CV');
    if (/design|تصميم|بوست|photoshop|social|صفحات|سوشيال/.test(t)) return ar
      ? `بعمل تصميمات سوشيال ميديا وبوستات فوتوشوب وإدارة صفحات وكابشنات وأفكار إعلانات بشكل احترافي يناسب البراند. <a href="Designs.html" style="color:var(--prime-accent);font-weight:900">شوف التصميمات</a>${contactLinks}`
      : `I create social media designs, Photoshop posts, page management systems, captions, and campaign ideas that fit the brand. <a href="Designs.html" style="color:var(--prime-accent);font-weight:900">View Designs</a>${contactLinks}`;
    if (/video|فيديو|reel|motion|ai/.test(t)) return ar
      ? `أقدر أعمل أفكار فيديوهات AI وريels وبرومبتات قوية ومحتوى تسويقي يخلي البراند شكله أحدث وأقوى. <a href="Videos.html" style="color:var(--prime-accent);font-weight:900">افتح الفيديوهات</a>`
      : `I can create AI video ideas, reels, strong prompts, and marketing content that makes the brand feel modern and premium. <a href="Videos.html" style="color:var(--prime-accent);font-weight:900">Open Videos</a>`;
    if (/service|خدمة|خدمات|price|سعر|تكلفة|عرض|كام/.test(t)) return ar
      ? `الخدمات عندي: ${ahmedPersona.servicesAr}. ${ahmedPersona.pricesAr}. <a href="Services.html" style="color:var(--prime-accent);font-weight:900">افتح الخدمات</a>${contactLinks}`
      : `My services include ${ahmedPersona.servicesEn}. ${ahmedPersona.pricesEn}. <a href="Services.html" style="color:var(--prime-accent);font-weight:900">Open Services</a>${contactLinks}`;
    if (/contact|whatsapp|email|call|تواصل|رقم|واتساب|ايميل|اتصل/.test(t)) return ar
      ? `تقدر تتواصل معايا مباشرة على: <br><a href="tel:+2${ahmedPersona.phone1}" style="color:var(--prime-accent);font-weight:900">${ahmedPersona.phone1}</a><br><a href="tel:+2${ahmedPersona.phone2}" style="color:var(--prime-accent);font-weight:900">${ahmedPersona.phone2}</a><br>أو من صفحة التواصل: <a href="Contact.html" style="color:var(--prime-accent);font-weight:900">Contact</a>`
      : `You can contact me directly:<br><a href="tel:+2${ahmedPersona.phone1}" style="color:var(--prime-accent);font-weight:900">${ahmedPersona.phone1}</a><br><a href="tel:+2${ahmedPersona.phone2}" style="color:var(--prime-accent);font-weight:900">${ahmedPersona.phone2}</a><br>Or use the contact page: <a href="Contact.html" style="color:var(--prime-accent);font-weight:900">Contact</a>`;
    if (/dark|light|theme|ليلي|نهاري|الوضع/.test(t)) return ar ? 'بدّل الوضع الليلي والنهاري من زر الشمس/القمر فوق، واختيارك بيتحفظ تلقائيًا.' : 'Switch dark/light mode from the sun/moon button at the top. Your choice is saved automatically.';
    if (/arabic|english|translate|ترجم|عربي|انجليزي/.test(t)) return ar ? 'زر “EN / ع” فوق بيبدّل الواجهة بين العربي والإنجليزي ويحفظ اختيارك.' : 'Use the “EN / ع” button to switch Arabic/English and save your choice.';
    return ar
      ? `أنا أحمد محمد. أقدر أساعدك في مواقع، داشبوردات، تصميمات، إدارة صفحات، فيديوهات AI، أو أتمتة شغلك. اكتب مثلًا: عاوز موقع، أو شوف الخدمات.${contactLinks}`
      : `I’m Ahmed Mohamed. I can help with websites, dashboards, designs, page management, AI videos, or automation. Try: I need a website, or show services.${contactLinks}`;
  }

  function enhanceTextForTranslation() {
    document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,label,button,a span,small').forEach(el => {
      if (!el.closest('.prime-nav-2029') && !el.closest('#prime-ai-window') && !el.closest('.prime-smart-hero')) el.setAttribute('data-auto-translate', 'true');
    });
  }

  function initScrollProgress() {
    const update = () => {
      const pb = document.getElementById('progressBar');
      if (!pb) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      pb.style.width = `${max > 0 ? Math.min(100, (scrollY / max) * 100) : 0}%`;
    };
    addEventListener('scroll', update, { passive: true }); update();
  }

  function initReveal() {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('section, .portfolio-item, .skill-item, .resume-item, .profile-card').forEach((el, i) => {
      el.style.opacity = '0'; el.style.transform = 'translateY(18px)'; el.style.transition = `opacity .55s ease ${Math.min(i * 25, 250)}ms, transform .55s ease ${Math.min(i * 25, 250)}ms`;
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavControls();
    injectHomeHero();
    enhanceTextForTranslation();
    initSearch();
    initAI();
    initScrollProgress();
    initReveal();
    setTheme(state.theme);
    setLang(state.lang);
  });
})();
