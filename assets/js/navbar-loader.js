/* ================================================================
   NAVBAR LOADER
   assets/js/navbar-loader.js
================================================================ */

const NavbarLoader = {
  // Load navbar HTML and inject into page
  async loadNavbar() {
    try {
      const response = await fetch('assets/components/navbar.html');
      if (!response.ok) {
        console.error('Failed to load navbar:', response.status);
        return;
      }
      
      const navbarHTML = await response.text();
      const navbarContainer = document.getElementById('prime-nav');
      
      if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
        
        // Initialize navbar functionality after loading
        this.initializeNavbar();
      }
    } catch (error) {
      console.error('Error loading navbar:', error);
    }
  },
  
  // Initialize navbar components after loading
  initializeNavbar() {
    // Initialize language toggle
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
      languageToggle.addEventListener('click', () => {
        if (window.I18n) {
          window.I18n.toggleLang();
        }
      });
    }
    
    // Initialize theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        if (window.ThemeManager) {
          window.ThemeManager.toggle();
        }
      });
    }
    
    // Update language toggle text
    this.updateLanguageToggle();
    
    // Update theme toggle icon
    this.updateThemeToggle();
    
    // Listen for language changes
    document.addEventListener('languageChanged', () => {
      this.updateLanguageToggle();
    });
    
    // Listen for theme changes
    document.addEventListener('themeChanged', () => {
      this.updateThemeToggle();
    });
  },
  
  // Update language toggle display
  updateLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle && window.I18n) {
      const currentLang = window.I18n.getLang();
      const langText = languageToggle.querySelector('.lang-text');
      if (langText) {
        langText.textContent = currentLang.toUpperCase();
      }
    }
  },
  
  // Update theme toggle icon
  updateThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle && window.ThemeManager) {
      const isDark = window.ThemeManager.isDark();
      const themeIcon = themeToggle.querySelector('.theme-icon');
      if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
      }
    }
  },
  
  // Initialize on load
  init() {
    // Load navbar immediately
    this.loadNavbar();
  }
};

// Initialize navbar loader
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => NavbarLoader.init());
} else {
  NavbarLoader.init();
}
