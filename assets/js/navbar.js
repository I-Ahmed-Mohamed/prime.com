/* PRIME NAV 2029 — desktop glass nav + iPhone-style mobile tab bar */
(function () {
  const navItems = [
    { href: 'index.html', icon: 'bx bxs-home', en: 'Home', ar: 'الرئيسية', mobileEn: 'Home', mobileAr: 'الرئيسية' },
    { href: 'Projects.html', icon: 'bx bx-layer', en: 'Projects', ar: 'المشاريع', mobileEn: 'Projects', mobileAr: 'المشاريع' },
    { href: 'AI-Guide.html', icon: 'bx bx-bot', en: 'AI', ar: 'المساعد', mobileEn: 'AI', mobileAr: 'AI' },
    { href: 'Presentation.html', icon: 'bx bx-slideshow', en: 'Presentation', ar: 'عرض تقديمي', mobileEn: 'Presentation', mobileAr: 'بريزنتيشن' },
    { href: 'javascript:void(0)', icon: 'profile', en: 'About', ar: 'من أنا', mobileEn: 'Profile', mobileAr: 'بروفايل', id: 'open-profile-menu' },
  ];

  const desktopItems = [
    { href: 'index.html', icon: 'bx bx-home-alt-2', en: 'Home', ar: 'الرئيسية' },
    { href: 'About.html', icon: 'bx bx-user-voice', en: 'About', ar: 'من أنا' },
    { href: 'Skills.html', icon: 'bx bx-code-curly', en: 'Skills', ar: 'المهارات' },
    { href: 'Presentation.html', icon: 'bx bx-slideshow', en: 'Presentation', ar: 'عرض تقديمي' },
    { href: 'Projects.html', icon: 'bx bx-layer', en: 'Projects', ar: 'المشاريع' },
    { href: 'Designs.html', icon: 'bx bx-palette', en: 'Designs', ar: 'التصميمات' },
    { href: 'AI-Guide.html', icon: 'bx bx-bot', en: 'AI', ar: 'المساعد' },
    { href: 'Contact.html', icon: 'bx bx-message-dots', en: 'Contact', ar: 'تواصل' }
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
        <span class="brand-copy">
          <strong>Ahmed Mohamed</strong>
          <small data-i18n="brandSub">AI Software Engineer</small>
        </span>
        <span class="brand-orb">
          <img src="assets/img/profile/me.jpg" alt="Ahmed Mohamed" />
          <div class="orb-ring"></div>
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
        <a class="prime-hire-btn" href="Contact.html" data-i18n="hireMe">تواصل معي</a>
      </div>
    </header>

    <nav class="prime-mobile-tabs" aria-label="Mobile navigation">
      ${navItems.map(item => `
        <a href="${item.href}" ${item.id ? `id="${item.id}"` : ''} class="prime-mobile-tab ${item.href === currentPage ? 'active' : ''}" data-mobile-en="${item.mobileEn}" data-mobile-ar="${item.mobileAr}">
          <span class="tab-icon-wrap">
            ${item.icon === 'profile' ? '<img src="assets/img/profile/me.jpg" alt="Ahmed" />' : `<i class="${item.icon}"></i>`}
            ${item.badge ? `<em>${item.badge}</em>` : ''}
          </span>
          <strong>${mobileLabel(item)}</strong>
        </a>
      `).join('')}
    </nav>

    <!-- Fullscreen Profile Menu (WhatsApp Style) -->
    <div id="prime-fullscreen-menu" class="prime-fullscreen-menu">
      <div class="prime-fs-header">
        <div class="fs-header-info">
          <img src="assets/img/profile/me.jpg" alt="Ahmed" />
          <div>
            <h3 data-i18n="fsName">${savedLang === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed'}</h3>
            <p data-i18n="fsTitle">${savedLang === 'ar' ? 'مهندس برمجيات ذكاء اصطناعي' : 'AI Software Engineer'}</p>
          </div>
        </div>
        <button id="prime-fs-close" class="prime-fs-close"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="prime-fs-content">
        <div class="prime-fs-section">
          <h4 data-i18n="fsMain">${savedLang === 'ar' ? 'الصفحات الرئيسية' : 'Main Pages'}</h4>
          <a href="index.html"><i class="bx bx-home-alt-2"></i> <span data-i18n="fsHome">${savedLang === 'ar' ? 'الرئيسية' : 'Home'}</span></a>
          <a href="About.html"><i class="bx bx-user-voice"></i> <span data-i18n="fsAbout">${savedLang === 'ar' ? 'عني' : 'About'}</span></a>
          <a href="CV.html"><i class="bx bx-id-card"></i> <span data-i18n="fsCV">${savedLang === 'ar' ? 'السيرة الذاتية' : 'CV'}</span></a>
          <a href="Skills.html"><i class="bx bx-code-curly"></i> <span data-i18n="fsSkills">${savedLang === 'ar' ? 'المهارات' : 'Skills'}</span></a>
        </div>
        <div class="prime-fs-section">
          <h4 data-i18n="fsWork">${savedLang === 'ar' ? 'الأعمال والمشاريع' : 'Work & Portfolio'}</h4>
          <a href="Presentation.html"><i class="bx bx-slideshow"></i> <span data-i18n="fsPresentation">${savedLang === 'ar' ? 'عرض تقديمي' : 'Presentation'}</span></a>
          <a href="Projects.html"><i class="bx bx-layer"></i> <span data-i18n="fsProjects">${savedLang === 'ar' ? 'المشاريع' : 'Projects'}</span></a>
          <a href="Designs.html"><i class="bx bx-palette"></i> <span data-i18n="fsDesigns">${savedLang === 'ar' ? 'التصميمات' : 'Designs'}</span></a>
          <a href="Services.html"><i class="bx bx-briefcase-alt-2"></i> <span data-i18n="fsServices">${savedLang === 'ar' ? 'الخدمات' : 'Services'}</span></a>
        </div>
        <div class="prime-fs-section">
          <h4 data-i18n="fsConnect">${savedLang === 'ar' ? 'تواصل وإعدادات' : 'Connect & Settings'}</h4>
          <a href="AI-Guide.html"><i class="bx bx-bot"></i> <span data-i18n="fsAI">${savedLang === 'ar' ? 'مساعد الذكاء الاصطناعي' : 'AI Assistant'}</span></a>
          <a href="Contact.html"><i class="bx bx-message-dots"></i> <span data-i18n="fsContact">${savedLang === 'ar' ? 'تواصل معي' : 'Contact'}</span></a>
          <a href="#" id="fs-theme-toggle"><i class="bx bx-moon"></i> <span data-i18n="fsTheme">${savedLang === 'ar' ? 'الوضع المظلم/المضيء' : 'Toggle Theme'}</span></a>
          <a href="#" id="fs-lang-toggle"><i class="bx bx-globe"></i> <span data-i18n="fsLang">${savedLang === 'ar' ? 'English' : 'عربي'}</span></a>
        </div>
      </div>
    </div>
  `;

  const holder = document.getElementById('navbar-container');
  if (holder) {
    holder.innerHTML = navHTML;

    // Fullscreen menu logic
    const profileBtn = document.getElementById('open-profile-menu');
    const menu = document.getElementById('prime-fullscreen-menu');

    if (profileBtn && menu) {
      profileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        menu.classList.add('active');
      });

      menu.querySelector('.prime-fs-close').addEventListener('click', () => {
        menu.classList.remove('active');
      });
    }

    // Toggle logic inside fullscreen menu
    const fsThemeToggle = document.getElementById('fs-theme-toggle');
    const fsLangToggle = document.getElementById('fs-lang-toggle');
    if (fsThemeToggle) {
      fsThemeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = document.getElementById('prime-theme-toggle');
        if (btn) btn.click();
      });
    }
    if (fsLangToggle) {
      fsLangToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = document.getElementById('prime-lang-toggle');
        if (btn) btn.click();
      });
    }
  }

  window.PrimeNav = { navItems, desktopItems };
})();

/* Ultimate Preloader Logic */
const preloader = document.getElementById('prime-preloader');
if (preloader) {
  if (sessionStorage.getItem('primePreloaderShown')) {
    // Hide instantly if already shown in this session
    preloader.style.display = 'none';
    preloader.remove();
  } else {
    // First time visit in this session: Wait for load and animate
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 800);
      }, 2000); // Wait 2 seconds so the loading bar animation fully finishes
      sessionStorage.setItem('primePreloaderShown', 'true');
    });
  }
}





/* =========================
   MAGIC INDICATOR & SWIPE LOGIC
   ========================= */
setTimeout(() => {
  const mobileNav = document.querySelector('.prime-mobile-tabs');
  if (mobileNav) {
    // 1. Add Indicator
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    mobileNav.appendChild(indicator);

    function updateIndicator() {
      const activeTab = document.querySelector('.prime-mobile-tab.active');
      if (activeTab && window.innerWidth <= 760) {
        // Calculate center of active tab
        const offsetLeft = activeTab.offsetLeft;
        const width = activeTab.offsetWidth;
        const indicatorWidth = 64; // from CSS
        const targetLeft = offsetLeft + (width / 2) - (indicatorWidth / 2);
        indicator.style.transform = `translateX(${targetLeft}px)`;
      }
    }

    window.addEventListener('resize', updateIndicator);
    setTimeout(updateIndicator, 50);

    // 2. Swipe to Navigate
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      // Swipe distance threshold
      const SWIPE_THRESHOLD = 80;
      const diffX = touchEndX - touchStartX;
      
      // We only care about large horizontal swipes
      if (Math.abs(diffX) < SWIPE_THRESHOLD) return;
      
      // Avoid swiping if user is interacting with a swiper slider (like Presentation.html)
      if (document.querySelector('.swiper-slide-active')) {
        // Just a precaution, but let's allow it if we want global nav. 
        // Actually, presentation slider uses swiper, which swallows events or fights with this.
        // Let's ensure we only swipe if we are NOT inside a horizontal swiper.
      }

      // Check active index
      const navItems = window.PrimeNav.navItems;
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      let currentIndex = navItems.findIndex(item => item.href === currentPage);
      if (currentIndex === -1) currentIndex = 0;

      const isRTL = document.documentElement.dir === 'rtl';

      if (diffX > 0) {
        // Swiped Right -> in RTL, this means go to "Previous" visual element (which is rightwards)
        // Visually, RTL items are ordered [RightToLeft], so index 0 is on the right.
        // Swiping right means panning left, bringing the right element into view. 
        // So we decrease the index.
        const nextIndex = isRTL ? currentIndex - 1 : currentIndex - 1;
        if (nextIndex >= 0 && nextIndex < navItems.length && !navItems[nextIndex].href.includes('javascript')) {
          window.location.href = navItems[nextIndex].href;
        }
      } else {
        // Swiped Left
        const nextIndex = isRTL ? currentIndex + 1 : currentIndex + 1;
        if (nextIndex >= 0 && nextIndex < navItems.length && !navItems[nextIndex].href.includes('javascript')) {
          window.location.href = navItems[nextIndex].href;
        }
      }
    }
    
    // 3. Smooth wave transition on click before navigating
    const tabs = document.querySelectorAll('.prime-mobile-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && !href.includes('javascript')) {
          e.preventDefault();
          // Remove active from all
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          updateIndicator();
          // Delay navigation to let animation play
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    });
  }
}, 500);
