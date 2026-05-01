/* ================================================================
   SCROLL ANIMATIONS
   assets/js/scroll-animations.js
================================================================ */

const ScrollAnimations = {
  // Setup reveal on scroll using IntersectionObserver
  initRevealOnScroll() {
    const revealElements = document.querySelectorAll('[data-reveal], .reveal, .animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.getAttribute('data-delay') || 0;
          const duration = element.getAttribute('data-duration') || 600;
          
          setTimeout(() => {
            element.classList.add('revealed');
            element.style.animationDuration = duration + 'ms';
          }, parseInt(delay));
          
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
  },
  
  // Stagger animation for list items
  initStaggerAnimation() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('[data-stagger-item], li, .item, .card');
      const staggerDelay = parseInt(container.getAttribute('data-stagger-delay')) || 100;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((item, index) => {
              item.style.animationDelay = (index * staggerDelay) + 'ms';
              item.classList.add('revealed');
            });
            observer.unobserve(container);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(container);
    });
  },
  
  // Parallax effect for elements
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        const speed = element.getAttribute('data-parallax') || 0.5;
        
        element.style.transform = `translateY(${distance * speed}px)`;
      });
    });
  },
  
  // Fade in on scroll
  initFadeInOnScroll() {
    const fadeElements = document.querySelectorAll('[data-fade-in]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
  },
  
  // Slide in animation
  initSlideInAnimation() {
    const slideElements = document.querySelectorAll('[data-slide]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const direction = entry.target.getAttribute('data-slide') || 'left';
          entry.target.classList.add(`slide-in-${direction}`);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    slideElements.forEach(el => observer.observe(el));
  },
  
  // Scale animation on scroll
  initScaleAnimation() {
    const scaleElements = document.querySelectorAll('[data-scale]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scale-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    scaleElements.forEach(el => observer.observe(el));
  },
  
  // Rotate animation
  initRotateAnimation() {
    const rotateElements = document.querySelectorAll('[data-rotate]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rotation = entry.target.getAttribute('data-rotate') || 360;
          entry.target.style.setProperty('--rotate-amount', rotation + 'deg');
          entry.target.classList.add('rotate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    rotateElements.forEach(el => observer.observe(el));
  },
  
  // Typing effect for text
  initTypingEffect() {
    const textElements = document.querySelectorAll('[data-typing]');
    
    textElements.forEach(element => {
      const text = element.textContent;
      const speed = element.getAttribute('data-typing') || 50;
      
      element.textContent = '';
      let index = 0;
      
      const type = () => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        }
      };
      
      // Start typing on scroll into view
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && element.textContent === '') {
          type();
          observer.unobserve(element);
        }
      }, { threshold: 0.5 });
      
      observer.observe(element);
    });
  },
  
  // Counter animation (alternative method)
  initCounterAnimation() {
    const counterElements = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          const target = parseInt(entry.target.getAttribute('data-counter'));
          const duration = parseInt(entry.target.getAttribute('data-counter-duration')) || 1000;
          const increment = target / (duration / 16);
          let current = 0;
          
          entry.target.classList.add('animated');
          
          const updateCount = () => {
            current += increment;
            if (current < target) {
              entry.target.textContent = Math.floor(current);
              requestAnimationFrame(updateCount);
            } else {
              entry.target.textContent = target;
            }
          };
          
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => observer.observe(el));
  },
  
  // Blur background on scroll
  initBlurBackground() {
    const blurElements = document.querySelectorAll('[data-blur-bg]');
    
    window.addEventListener('scroll', () => {
      blurElements.forEach(element => {
        const scrolled = window.scrollY;
        const blur = Math.min(scrolled / 100, 10);
        element.style.backdropFilter = `blur(${blur}px)`;
      });
    });
  },
  
  // Light beam effect
  initLightBeam() {
    const beamContainer = document.querySelector('[data-light-beam]');
    if (!beamContainer) return;
    
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      beamContainer.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(34, 136, 94, 0.1) 0%, transparent 50%)`;
    });
  },
  
  // Initialize all scroll animations
  init() {
    this.initRevealOnScroll();
    this.initStaggerAnimation();
    this.initParallax();
    this.initFadeInOnScroll();
    this.initSlideInAnimation();
    this.initScaleAnimation();
    this.initRotateAnimation();
    this.initTypingEffect();
    this.initCounterAnimation();
    this.initBlurBackground();
    this.initLightBeam();
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ScrollAnimations.init());
} else {
  ScrollAnimations.init();
}
