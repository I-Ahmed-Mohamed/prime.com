/* ================================================================
   TOP NAVBAR MANAGER
   assets/js/prime-navbar.js
================================================================ */

const PrimeNavbar = {
  navbar: null,
  mobileMenu: null,
  hamburger: null,
  links: null,
  
  init() {
    this.navbar = document.getElementById('prime-nav');
    this.mobileMenu = document.querySelector('.prime-mobile-menu');
    this.hamburger = document.querySelector('.prime-hamburger');
    this.links = document.querySelectorAll('.prime-links a, .prime-mobile-menu a');
    
    if (!this.navbar) return; // Navbar not found
    
    this.attachScrollListener();
    this.attachLinkListeners();
    this.attachHamburgerListener();
    this.setupSectionTracking();
    this.setActiveLink();
  },
  
  // Handle scroll effects
  attachScrollListener() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });
  },
  
  // Handle link clicks
  attachLinkListeners() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Close mobile menu if open
        if (this.mobileMenu && this.mobileMenu.classList.contains('open')) {
          this.closeMobileMenu();
        }
        
        // Set active state
        this.links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  },
  
  // Handle hamburger menu
  attachHamburgerListener() {
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => {
        if (this.mobileMenu.classList.contains('open')) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu();
        }
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.mobileMenu && this.mobileMenu.classList.contains('open')) {
        if (!e.target.closest('.prime-mobile-menu') && !e.target.closest('.prime-hamburger')) {
          this.closeMobileMenu();
        }
      }
    });
  },
  
  // Open mobile menu
  openMobileMenu() {
    if (!this.mobileMenu) return;
    this.mobileMenu.classList.add('open');
    if (this.hamburger) this.hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  
  // Close mobile menu
  closeMobileMenu() {
    if (!this.mobileMenu) return;
    this.mobileMenu.classList.remove('open');
    if (this.hamburger) this.hamburger.classList.remove('open');
    document.body.style.overflow = '';
  },
  
  // Setup section tracking (highlight active section)
  setupSectionTracking() {
    window.addEventListener('scroll', () => {
      this.updateActiveLink();
    });
  },
  
  // Update active link based on scroll position
  updateActiveLink() {
    const sections = document.querySelectorAll('section[id], div[id*="section"]');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    
    this.links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  },
  
  // Set active link on page load
  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    this.links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.includes(currentPage) || 
          (currentPage === '' && href.includes('index.html')) ||
          (currentPage === 'index.html' && href.includes('index.html')))) {
        link.classList.add('active');
      }
    });
  },
  
  // Get current section
  getCurrentSection() {
    return document.querySelector('.prime-links a.active')?.getAttribute('href') || '#';
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PrimeNavbar.init());
} else {
  PrimeNavbar.init();
}
