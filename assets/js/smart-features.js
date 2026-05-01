/* ================================================================
   SMART FEATURES MANAGER
   assets/js/smart-features.js
================================================================ */

const SmartFeatures = {
  // Animate skill bars when they come into view
  initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width') || '80';
          const fill = bar.querySelector('.skill-fill');
          
          if (fill) {
            setTimeout(() => {
              fill.style.width = width + '%';
            }, 100);
          }
          
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
  },
  
  // Animate stat counters
  initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target')) || 100;
          const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          counter.classList.add('counted');
          
          const tick = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(tick);
            } else {
              counter.textContent = target;
            }
          };
          
          tick();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  },
  
  // Initialize section indicator dots
  initSectionIndicators() {
    const indicators = document.getElementById('prime-indicators');
    if (!indicators) return;
    
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const dot = document.createElement('button');
      dot.className = 'indicator-dot';
      dot.setAttribute('data-section', section.id);
      dot.setAttribute('aria-label', `Go to ${section.id}`);
      
      dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth' });
      });
      
      indicators.appendChild(dot);
    });
    
    // Update active indicator on scroll
    this.updateIndicators(indicators);
  },
  
  // Update active indicator dot
  updateIndicators(indicators) {
    const dots = indicators.querySelectorAll('.indicator-dot');
    
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
          current = section.getAttribute('id');
        }
      });
      
      dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current) {
          dot.classList.add('active');
        }
      });
    });
  },
  
  // Add tooltips to interactive elements
  initTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(element => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = element.getAttribute('data-tooltip');
      
      element.addEventListener('mouseenter', () => {
        document.body.appendChild(tooltip);
        const rect = element.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.classList.add('show');
      });
      
      element.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
        tooltip.remove();
      });
    });
  },
  
  // Initialize filter system for portfolio/projects
  initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        filterItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('show'), 10);
          } else {
            item.classList.remove('show');
            setTimeout(() => item.style.display = 'none', 300);
          }
        });
      });
    });
  },
  
  // Floating AI Robot movement
  initFloatingRobot() {
    const robot = document.querySelector('.ai-robot');
    if (!robot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let robotX = 0;
    let robotY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    const animateRobot = () => {
      const dx = mouseX - robotX;
      const dy = mouseY - robotY;
      
      robotX += dx * 0.02;
      robotY += dy * 0.02;
      
      // Keep robot in viewport
      robotX = Math.max(0, Math.min(window.innerWidth - 60, robotX));
      robotY = Math.max(0, Math.min(window.innerHeight - 60, robotY));
      
      robot.style.transform = `translate(${robotX}px, ${robotY}px)`;
      requestAnimationFrame(animateRobot);
    };
    
    animateRobot();
  },
  
  // Back to top button
  initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
  
  // Scroll progress indicator
  initScrollProgress() {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progress.style.width = scrolled + '%';
    });
  },
  
  // Initialize all features
  init() {
    this.initSkillBars();
    this.initCounters();
    this.initSectionIndicators();
    this.initTooltips();
    this.initFilters();
    this.initFloatingRobot();
    this.initBackToTop();
    this.initScrollProgress();
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SmartFeatures.init());
} else {
  SmartFeatures.init();
}
