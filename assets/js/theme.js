/* ================================================================
   THEME SYSTEM (Dark/Light Mode)
   assets/js/theme.js
================================================================ */

const ThemeManager = {
  DEFAULT_THEME: 'dark',
  STORAGE_KEY: 'theme',
  
  // Initialize theme
  init() {
    const savedTheme = this.getSavedTheme();
    this.setTheme(savedTheme);
    this.attachListeners();
  },
  
  // Get saved theme
  getSavedTheme() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved && ['dark', 'light'].includes(saved)) return saved;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return this.DEFAULT_THEME;
  },
  
  // Set theme
  setTheme(theme) {
    if (!['dark', 'light'].includes(theme)) theme = this.DEFAULT_THEME;
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    // Update button icon
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      const icon = btn.querySelector('[id*="icon"]') || btn;
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  },
  
  // Toggle theme
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || this.DEFAULT_THEME;
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },
  
  // Get current theme
  getTheme() {
    return document.documentElement.getAttribute('data-theme') || this.DEFAULT_THEME;
  },
  
  // Attach event listeners
  attachListeners() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.setTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  },
  
  // Detect if using dark theme
  isDark() {
    return this.getTheme() === 'dark';
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}
