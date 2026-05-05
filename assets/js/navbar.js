/* PRIME NAV 2029 — floating glass navbar + language/theme controls */
(function () {
  const navItems = [
    { href: 'index.html', icon: 'bx bx-home-alt-2', en: 'Home', ar: 'الرئيسية' },
    { href: 'About.html', icon: 'bx bx-user-voice', en: 'About', ar: 'من أنا' },
    { href: 'CV.html', icon: 'bx bx-id-card', en: 'CV', ar: 'السي في' },
    { href: 'Skills.html', icon: 'bx bx-code-curly', en: 'Skills', ar: 'المهارات' },
    { href: 'Projects.html', icon: 'bx bx-layer', en: 'Projects', ar: 'المشاريع' },
    { href: 'Designs.html', icon: 'bx bx-palette', en: 'Designs', ar: 'التصميمات' },
    { href: 'Videos.html', icon: 'bx bx-movie-play', en: 'Videos', ar: 'الفيديوهات' },
    { href: 'Services.html', icon: 'bx bx-briefcase-alt-2', en: 'Services', ar: 'الخدمات' },
    { href: 'Contact.html', icon: 'bx bx-message-dots', en: 'Contact', ar: 'تواصل' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const savedTheme = localStorage.getItem('prime-theme') || 'dark';
  const savedLang = localStorage.getItem('prime-lang') || 'en';
  document.documentElement.dataset.theme = savedTheme;
  document.documentElement.dataset.lang = savedLang;
  document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = savedLang;

  const navHTML = `
    <header id="prime-nav-2029" class="prime-nav-2029" aria-label="Primary navigation">
      <a class="prime-brand" href="index.html" aria-label="Ahmed Mohamed Home">
        <span class="brand-orb"><i class="bi bi-cpu"></i></span>
        <span class="brand-copy">
          <strong>Ahmed Mohamed</strong>
          <small data-i18n="brandSub">AI Software Engineer</small>
        </span>
      </a>

      <button class="prime-menu-toggle" id="prime-menu-toggle" aria-label="Open Menu" aria-expanded="false">
        <i class="bi bi-list"></i>
      </button>

      <nav id="navbar" class="prime-links">
        ${navItems.map(item => `
          <a href="${item.href}" class="nav-link ${item.href === currentPage ? 'active' : ''}" data-nav-en="${item.en}" data-nav-ar="${item.ar}">
            <i class="${item.icon}"></i>
            <span>${savedLang === 'ar' ? item.ar : item.en}</span>
          </a>
        `).join('')}
      </nav>

      <div class="prime-actions">
        <button class="prime-action-btn" id="prime-search-open" title="AI Search"><i class="bi bi-search"></i></button>
        <button class="prime-action-btn" id="prime-lang-toggle" title="Translate">${savedLang === 'ar' ? 'EN' : 'ع'}</button>
        <button class="prime-action-btn" id="prime-theme-toggle" title="Theme"><i class="bi ${savedTheme === 'light' ? 'bi-moon-stars' : 'bi-sun'}"></i></button>
        <a class="prime-hire-btn" href="Contact.html" data-i18n="hireMe">Hire Me</a>
      </div>
    </header>
  `;

  const holder = document.getElementById('navbar-container');
  if (holder) holder.innerHTML = navHTML;

  window.PrimeNav = { navItems };
})();
