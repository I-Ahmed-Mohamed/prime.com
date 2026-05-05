/* PRIME NAV 2029 — desktop glass nav + iPhone-style mobile tab bar */
(function () {
  const navItems = [
    { href: 'index.html', icon: 'bx bxs-home', en: 'Home', ar: 'الرئيسية', mobileEn: 'Home', mobileAr: 'الرئيسية' },
    { href: 'Videos.html', icon: 'bx bx-movie-play', en: 'Videos', ar: 'الفيديوهات', mobileEn: 'Reels', mobileAr: 'ريلز' },
    { href: 'AI-Guide.html', icon: 'bx bx-bot', en: 'AI', ar: 'المساعد', mobileEn: 'AI', mobileAr: 'AI' },
    { href: 'Projects.html', icon: 'bx bx-layer', en: 'Projects', ar: 'المشاريع', mobileEn: 'Projects', mobileAr: 'المشاريع' },
    { href: 'Designs.html', icon: 'bx bx-palette', en: 'Designs', ar: 'التصميمات', mobileEn: 'Designs', mobileAr: 'ديزاين' },
    { href: 'Contact.html', icon: 'bx bx-bell', en: 'Contact', ar: 'تواصل', mobileEn: 'Contact', mobileAr: 'تواصل', badge: '2' },
    { href: 'About.html', icon: 'profile', en: 'About', ar: 'من أنا', mobileEn: 'Profile', mobileAr: 'بروفايل' },
  ];

  const desktopItems = [
    { href: 'index.html', icon: 'bx bx-home-alt-2', en: 'Home', ar: 'الرئيسية' },
    { href: 'About.html', icon: 'bx bx-user-voice', en: 'About', ar: 'من أنا' },
    { href: 'CV.html', icon: 'bx bx-id-card', en: 'CV', ar: 'السي في' },
    { href: 'Skills.html', icon: 'bx bx-code-curly', en: 'Skills', ar: 'المهارات' },
    { href: 'Projects.html', icon: 'bx bx-layer', en: 'Projects', ar: 'المشاريع' },
    { href: 'Designs.html', icon: 'bx bx-palette', en: 'Designs', ar: 'التصميمات' },
    { href: 'Videos.html', icon: 'bx bx-movie-play', en: 'Videos', ar: 'الفيديوهات' },
    { href: 'Services.html', icon: 'bx bx-briefcase-alt-2', en: 'Services', ar: 'الخدمات' },
    { href: 'AI-Guide.html', icon: 'bx bx-bot', en: 'AI', ar: 'المساعد' },
    { href: 'Contact.html', icon: 'bx bx-message-dots', en: 'Contact', ar: 'تواصل' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const savedTheme = localStorage.getItem('prime-theme') || 'dark';
  const savedLang = localStorage.getItem('prime-lang') || 'en';
  document.documentElement.dataset.theme = savedTheme;
  document.documentElement.dataset.lang = savedLang;
  document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = savedLang;

  const label = (item) => savedLang === 'ar' ? item.ar : item.en;
  const mobileLabel = (item) => savedLang === 'ar' ? item.mobileAr : item.mobileEn;

  const navHTML = `
    <header id="prime-nav-2029" class="prime-nav-2029" aria-label="Primary navigation">
      <a class="prime-brand" href="index.html" aria-label="Ahmed Mohamed Home">
        <span class="brand-orb"><img src="assets/img/me.jpg" alt="Ahmed Mohamed" /></span>
        <span class="brand-copy">
          <strong>Ahmed Mohamed</strong>
          <small data-i18n="brandSub">AI Software Engineer</small>
        </span>
      </a>

      <button class="prime-menu-toggle" id="prime-menu-toggle" aria-label="Open Menu" aria-expanded="false">
        <i class="bi bi-list"></i>
      </button>

      <nav id="navbar" class="prime-links">
        ${desktopItems.map(item => `
          <a href="${item.href}" class="nav-link ${item.href === currentPage ? 'active' : ''}" data-nav-en="${item.en}" data-nav-ar="${item.ar}">
            <i class="${item.icon}"></i>
            <span>${label(item)}</span>
          </a>
        `).join('')}
      </nav>

      <div class="prime-actions">
        <button class="prime-action-btn" id="prime-search-open" title="AI Search"><i class="bi bi-search"></i></button>
        <button class="prime-action-btn" id="prime-lang-toggle" title="Translate">${savedLang === 'ar' ? 'EN' : 'ع'}</button>
        <button class="prime-action-btn" id="prime-theme-toggle" title="Theme"><i class="bi ${savedTheme === 'light' ? 'bi-moon-stars' : 'bi-sun'}"></i></button>
        <a class="prime-hire-btn" href="Contact.html" data-i18n="hireMe">Start</a>
      </div>
    </header>

    <nav class="prime-mobile-tabs" aria-label="Mobile navigation">
      ${navItems.map(item => `
        <a href="${item.href}" class="prime-mobile-tab ${item.href === currentPage ? 'active' : ''}" data-mobile-en="${item.mobileEn}" data-mobile-ar="${item.mobileAr}">
          <span class="tab-icon-wrap">
            ${item.icon === 'profile' ? '<img src="assets/img/me.jpg" alt="Ahmed" />' : `<i class="${item.icon}"></i>`}
            ${item.badge ? `<em>${item.badge}</em>` : ''}
          </span>
          <strong>${mobileLabel(item)}</strong>
        </a>
      `).join('')}
    </nav>
  `;

  const holder = document.getElementById('navbar-container');
  if (holder) holder.innerHTML = navHTML;

  window.PrimeNav = { navItems, desktopItems };
})();
