/**
 * Advanced 3D Interactive Effects
 * Enhances the portfolio with dynamic 3D transforms based on mouse position
 */

(function() {
  'use strict';

  // Initialize 3D effects
  const init3DEffects = () => {
    enableMouseTracker();
    enableScrollParallax();
    enhanceHoverEffects();
    addGlowEffects();
  };

  /**
   * Mouse tracker - creates parallax effect based on mouse movement
   */
  const enableMouseTracker = () => {
    const elements = document.querySelectorAll('.hero-card, .code-window, .service-card, .info-card, .avatar-2070');
    
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate rotation based on mouse position
      const rotateX = (clientY / innerHeight - 0.5) * 5;
      const rotateY = (clientX / innerWidth - 0.5) * 5;
      
      elements.forEach(el => {
        // Only apply to non-mobile viewports
        if (window.innerWidth > 768) {
          const rect = el.getBoundingClientRect();
          const elCenterX = rect.left + rect.width / 2;
          const elCenterY = rect.top + rect.height / 2;
          
          const distX = clientX - elCenterX;
          const distY = clientY - elCenterY;
          
          const angle = Math.atan2(distY, distX) * (180 / Math.PI);
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          // Only apply effect if mouse is reasonably close
          if (distance < 500) {
            const intensity = 1 - (distance / 500);
            const moveX = (distX / distance) * intensity * 5;
            const moveY = (distY / distance) * intensity * 5;
            
            el.style.transform = `perspective(1200px) 
              rotateX(${-moveY * 0.5}deg) 
              rotateY(${moveX * 0.5}deg) 
              translateZ(${intensity * 10}px)`;
          }
        }
      });
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      elements.forEach(el => {
        el.style.transform = '';
      });
    });
  };

  /**
   * Scroll parallax effect
   */
  const enableScrollParallax = () => {
    const parallaxElements = document.querySelectorAll('.service-card, .info-card, .project-card');
    
    const updateParallax = () => {
      parallaxElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        
        if (scrollProgress > 0 && scrollProgress < 1) {
          const translateY = (scrollProgress - 0.5) * 20;
          const rotateX = (scrollProgress - 0.5) * 3;
          
          el.style.transform = `perspective(1200px) 
            rotateX(${rotateX}deg) 
            translateY(${translateY}px) 
            translateZ(0px)`;
        }
      });
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateParallax);
    }, { passive: true });

    // Initial update
    updateParallax();
  };

  /**
   * Enhanced hover effects with depth
   */
  const enhanceHoverEffects = () => {
    const hoverElements = document.querySelectorAll(
      '.cta-btn, .ghost-btn, .metric, .badge-neo, .list-item'
    );

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', function() {
        this.style.willChange = 'transform, box-shadow';
      });

      el.addEventListener('mouseleave', function() {
        this.style.willChange = 'auto';
      });

      el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;

        if (window.innerWidth > 768) {
          this.style.transform = `perspective(1000px) 
            rotateX(${angleX}deg) 
            rotateY(${angleY}deg) 
            scale(1.02)`;
        }
      });

      el.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  };

  /**
   * Add dynamic glow effects based on proximity
   */
  const addGlowEffects = () => {
    const glowElements = document.querySelectorAll('.service-card, .info-card, .hero-card, .code-window');

    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;

      glowElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;

        const distX = clientX - elX;
        const distY = clientY - elY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 400 && window.innerWidth > 768) {
          const intensity = 1 - (distance / 400);
          const hue = Math.atan2(distY, distX) * (180 / Math.PI);

          el.style.boxShadow = `
            0 ${10 + intensity * 40}px ${40 + intensity * 40}px rgba(0, 0, 0, ${0.3 + intensity * 0.2}),
            0 0 ${30 + intensity * 30}px rgba(110, 231, 255, ${intensity * 0.4}),
            inset 0 1px 0 rgba(255, 255, 255, ${0.08 + intensity * 0.07})
          `;
        }
      });
    });

    document.addEventListener('mouseleave', () => {
      glowElements.forEach(el => {
        el.style.boxShadow = '';
      });
    });
  };

  /**
   * Smooth scroll behavior enhancement
   */
  const enhanceSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  /**
   * Intersection Observer for lazy loading and scroll animations
   */
  const initIntersectionObserver = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) rotateX(0deg)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.service-card, .info-card, .project-card, .metric').forEach(el => {
      el.style.opacity = '0.8';
      el.style.transform = 'translateY(10px) rotateX(2deg)';
      observer.observe(el);
    });
  };

  /**
   * Performance optimization - use RAF for smooth animations
   */
  const optimizePerformance = () => {
    // Disable animations on low-end devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }

    // Use requestAnimationFrame for smooth updates
    let animationFrameId;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        // Re-initialize on resize
      });
    });
  };

  /**
   * Add touch support for mobile 3D effects
   */
  const addTouchSupport = () => {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
      if (window.innerWidth <= 768) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;

        const elements = document.querySelectorAll('.hero-card, .code-window');
        elements.forEach(el => {
          if (Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {
            el.style.transform = `perspective(600px) 
              rotateX(${deltaY * 0.1}deg) 
              rotateY(${deltaX * 0.1}deg) 
              translateZ(5px)`;
          }
        });
      }
    });

    document.addEventListener('touchend', () => {
      const elements = document.querySelectorAll('.hero-card, .code-window');
      elements.forEach(el => {
        el.style.transform = '';
      });
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DEffects);
  } else {
    init3DEffects();
  }

  // Additional initialization functions
  enhanceSmoothScroll();
  initIntersectionObserver();
  optimizePerformance();
  addTouchSupport();

  // Expose some functions globally for debugging
  window.Effects3D = {
    init: init3DEffects,
    refresh: () => {
      window.location.reload();
    }
  };
})();
