/* AHMED MOHAMED — PRIME 2029 AI ENGINE */
(function () {
  const state = {
    lang: localStorage.getItem('prime-lang') || 'en',
    theme: localStorage.getItem('prime-theme') || 'dark',
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
    brandSub: { en: 'AI Software Engineer', ar: 'مهندس برمجيات وذكاء اصطناعي' },
    hireMe: { en: 'Hire Me', ar: 'ابدأ مشروعك' },
    heroKicker: { en: '2029 AI Portfolio System', ar: 'نظام بورتفوليو ذكي 2029' },
    heroTitle: { en: 'Software, design, and AI experiences built like a global brand.', ar: 'برمجة وتصميم وتجارب ذكاء اصطناعي بشكل براند عالمي.' },
    heroText: { en: 'Explore Ahmed Mohamed’s work through a smart bilingual interface, instant AI guide, dark/light mode, and a futuristic 2029 navigation system.', ar: 'اتفرج على شغل أحمد محمد من خلال واجهة ذكية عربي وإنجليزي، مساعد AI فوري، وضع ليلي ونهاري، وناف بار مستقبلي 2029.' },
    exploreProjects: { en: 'Explore Projects', ar: 'شوف المشاريع' },
    askAI: { en: 'Ask PRIME AI', ar: 'اسأل المساعد الذكي' },
    chip1T: { en: 'AI Guide', ar: 'مساعد ذكي' },
    chip1: { en: 'Answers visitors and opens the right section instantly.', ar: 'يرد على الزوار ويفتح القسم المناسب فورًا.' },
    chip2T: { en: 'Bilingual', ar: 'ترجمة فورية' },
    chip2: { en: 'Arabic / English interface saved automatically.', ar: 'واجهة عربي وإنجليزي وتتحفظ تلقائيًا.' },
    chip3T: { en: 'Adaptive Theme', ar: 'وضع متغير' },
    chip3: { en: 'Dark and light modes with premium glass styling.', ar: 'وضع ليلي ونهاري بتصميم زجاجي فاخر.' },
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
    const langBtn = document.getElementById('prime-lang-toggle');
    if (langBtn) langBtn.textContent = lang === 'ar' ? 'EN' : 'ع';
    document.querySelectorAll('[data-auto-translate]').forEach(el => translateKnownText(el));
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
    if (current !== 'index.html' || document.querySelector('.prime-smart-hero')) return;
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
    hero.querySelector('#open-ai-from-hero')?.addEventListener('click', () => window.PrimeAI?.open());
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
    document.querySelectorAll('#ai-assistant-container, #ai-chat-window, #ai-toggle-btn').forEach(el => el.remove());
    const ui = document.createElement('div');
    ui.innerHTML = `
      <button id="prime-ai-toggle" title="PRIME AI"><i class="bi bi-stars"></i></button>
      <section id="prime-ai-window" aria-label="PRIME AI Assistant">
        <div class="prime-ai-head">
          <div class="prime-ai-avatar"><i class="bi bi-cpu"></i></div>
          <div><strong>PRIME AI</strong><small>${state.lang === 'ar' ? 'متصل — مساعد داخلي ذكي' : 'Online — smart local assistant'}</small></div>
          <button class="prime-ai-close" id="prime-ai-close"><i class="bi bi-x"></i></button>
        </div>
        <div class="prime-ai-messages" id="prime-ai-messages"></div>
        <div class="prime-ai-quick">
          <button data-q="skills">${state.lang === 'ar' ? 'المهارات' : 'Skills'}</button>
          <button data-q="projects">${state.lang === 'ar' ? 'المشاريع' : 'Projects'}</button>
          <button data-q="price">${state.lang === 'ar' ? 'تقدير سعر' : 'Price estimate'}</button>
          <button data-q="contact">${state.lang === 'ar' ? 'التواصل' : 'Contact'}</button>
        </div>
        <form class="prime-ai-form" id="prime-ai-form">
          <textarea id="prime-ai-input" rows="1" placeholder="${state.lang === 'ar' ? 'اسأل عن أحمد أو اطلب فتح قسم...' : 'Ask about Ahmed or open a section...'}"></textarea>
          <button type="submit"><i class="bi bi-send-fill"></i></button>
        </form>
      </section>`;
    document.body.appendChild(ui);
    const win = document.getElementById('prime-ai-window');
    const messages = document.getElementById('prime-ai-messages');
    const input = document.getElementById('prime-ai-input');
    function add(text, type = 'bot') {
      const m = document.createElement('div');
      m.className = `prime-msg ${type}`;
      m.innerHTML = text;
      messages.appendChild(m);
      messages.scrollTop = messages.scrollHeight;
    }
    function open() {
      win.classList.add('open');
      if (!messages.children.length) add(greeting());
      setTimeout(() => input.focus(), 80);
    }
    function close() { win.classList.remove('open'); }
    window.PrimeAI = { open, close, ask: q => answer(q) };
    document.getElementById('prime-ai-toggle').addEventListener('click', () => win.classList.contains('open') ? close() : open());
    document.getElementById('prime-ai-close').addEventListener('click', close);
    document.getElementById('prime-ai-form').addEventListener('submit', e => { e.preventDefault(); answer(input.value); input.value = ''; input.style.height = 'auto'; });
    input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 110) + 'px'; });
    document.querySelectorAll('.prime-ai-quick button').forEach(b => b.addEventListener('click', () => answer(b.dataset.q)));

    function answer(q) {
      const text = (q || '').trim();
      if (!text) return;
      open();
      add(escapeHTML(text), 'user');
      setTimeout(() => add(buildReply(text), 'bot'), 250);
    }
  }

  function escapeHTML(s) { return s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function isArabicText(s) { return /[\u0600-\u06FF]/.test(s) || state.lang === 'ar'; }
  function greeting() {
    return state.lang === 'ar'
      ? 'أهلاً 👋 أنا مساعد PRIME AI. أقدر أعرّفك على مهارات أحمد، مشاريعه، خدماته، أو أفتحلك أي قسم فورًا. جرّب تكتب: افتح المشاريع.'
      : 'Hi 👋 I’m PRIME AI. I can guide visitors through Ahmed’s skills, projects, services, CV, and contact section. Try: open projects.';
  }
  function buildReply(q) {
    const ar = isArabicText(q);
    const t = q.toLowerCase();
    const go = (url, label) => `${ar ? 'تمام، افتح من هنا:' : 'Sure, open it here:'} <a href="${url}" style="color:var(--prime-accent);font-weight:900">${label}</a>`;
    if (/project|portfolio|مشاريع|المشاريع|شغل|اعمال/.test(t)) return go('Projects.html', ar ? 'صفحة المشاريع' : 'Projects page');
    if (/skill|مهارات|لغات|angular|dotnet|\.net|sql|backend|frontend/.test(t)) return ar
      ? 'أحمد شغال Full Stack .NET وAngular، وعنده خبرة في HTML/CSS/JS/TypeScript/SQL Server/Entity Framework وواجهات حديثة. <a href="Skills.html" style="color:var(--prime-accent);font-weight:900">افتح المهارات</a>'
      : 'Ahmed works with Full Stack .NET and Angular, plus HTML/CSS/JS/TypeScript/SQL Server/Entity Framework and modern UI systems. <a href="Skills.html" style="color:var(--prime-accent);font-weight:900">Open Skills</a>';
    if (/cv|resume|سي ?في|السيرة/.test(t)) return go('CV.html', ar ? 'السي في' : 'CV');
    if (/design|تصميم|بوست|photoshop|social/.test(t)) return go('Designs.html', ar ? 'التصميمات' : 'Designs');
    if (/video|فيديو|reel|motion/.test(t)) return go('Videos.html', ar ? 'الفيديوهات' : 'Videos');
    if (/service|خدمة|خدمات|price|سعر|تكلفة|عرض/.test(t)) return ar
      ? 'الخدمات الأساسية: تصميم مواقع، تطوير Frontend/Backend، داشبوردات، إدارة صفحات، وتصميم بوستات. تقدير سريع: صفحة تعريفية تبدأ من 5000، وإدارة صفحة شهرية تبدأ من 2000 حسب المطلوب. <a href="Services.html" style="color:var(--prime-accent);font-weight:900">افتح الخدمات</a>'
      : 'Core services: websites, frontend/backend development, dashboards, page management, and post design. Quick estimate: landing websites from 5000 and monthly page management from 2000 depending on scope. <a href="Services.html" style="color:var(--prime-accent);font-weight:900">Open Services</a>';
    if (/contact|whatsapp|email|call|تواصل|رقم|واتساب|ايميل/.test(t)) return go('Contact.html', ar ? 'صفحة التواصل' : 'Contact page');
    if (/dark|light|theme|ليلي|نهاري|الوضع/.test(t)) return ar ? 'تقدر تبدّل بين الوضع الليلي والنهاري من زر الشمس/القمر فوق في الناف بار، واختيارك بيتحفظ تلقائيًا.' : 'Use the sun/moon button in the top navbar to switch dark/light mode. Your choice is saved automatically.';
    if (/arabic|english|translate|ترجم|عربي|انجليزي/.test(t)) return ar ? 'زر “EN / ع” فوق بيبدّل الواجهة بين العربي والإنجليزي ويحفظ اللغة تلقائيًا.' : 'Use the “EN / ع” button in the navbar to switch Arabic/English. The selected language is saved.';
    return ar
      ? 'أقدر أساعدك في: المشاريع، المهارات، الخدمات، التصميمات، الفيديوهات، السي في، أو التواصل. اكتب مثلًا: افتح الخدمات.'
      : 'I can help with projects, skills, services, designs, videos, CV, or contact. For example, type: open services.';
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
