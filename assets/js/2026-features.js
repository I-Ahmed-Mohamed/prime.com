/**
 * 2026 Advanced JavaScript Features
 * Modern interactions and effects
 */

// Cursor Trail Effect
class CursorTrail {
  constructor() {
    this.trails = [];
    this.maxTrails = 10;
    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.createTrail(e.clientX, e.clientY);
    });
  }

  createTrail(x, y) {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.left = x + "px";
    trail.style.top = y + "px";
    document.body.appendChild(trail);

    this.trails.push(trail);

    if (this.trails.length > this.maxTrails) {
      const oldTrail = this.trails.shift();
      oldTrail.remove();
    }

    setTimeout(() => {
      trail.remove();
      this.trails = this.trails.filter((t) => t !== trail);
    }, 500);
  }
}

// Particle Background
class ParticleBackground {
  constructor() {
    this.container = null;
    this.particles = [];
    this.particleCount = 50;
    this.init();
  }

  init() {
    this.container = document.createElement("div");
    this.container.className = "particle-bg";
    document.body.appendChild(this.container);

    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 5 + 2;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = startX + "px";
    particle.style.animationDuration = duration + "s";
    particle.style.animationDelay = delay + "s";

    this.container.appendChild(particle);
    this.particles.push(particle);
  }
}

// Magnetic Buttons
class MagneticButtons {
  constructor() {
    this.buttons = [];
    this.init();
  }

  init() {
    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      this.addMagneticEffect(btn);
    });
  }

  addMagneticEffect(element) {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate(0, 0) scale(1)";
    });
  }
}

// Parallax Effect
class ParallaxEffect {
  constructor() {
    this.layers = [];
    this.init();
  }

  init() {
    this.layers = document.querySelectorAll(".parallax-layer");

    window.addEventListener("scroll", () => {
      this.update();
    });

    window.addEventListener("mousemove", (e) => {
      this.updateMouse(e);
    });
  }

  update() {
    const scrolled = window.pageYOffset;

    this.layers.forEach((layer, index) => {
      const speed = layer.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });
  }

  updateMouse(e) {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    this.layers.forEach((layer, index) => {
      const depth = layer.dataset.depth || 1;
      layer.style.transform = `rotateY(${xAxis * depth}deg) rotateX(${yAxis * depth}deg)`;
    });
  }
}

// Smooth Scroll
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// Intersection Observer for Animations
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Trigger AOS animation if available
          if (typeof AOS !== "undefined") {
            entry.target.classList.add("aos-animate");
          }
        }
      });
    }, options);

    // Observe all elements with data-animate attribute
    document.querySelectorAll("[data-animate]").forEach((el) => {
      this.observer.observe(el);
    });
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.lastTime = performance.now();
    this.frames = 0;
    this.init();
  }

  init() {
    this.measure();
  }

  measure() {
    const currentTime = performance.now();
    this.frames++;

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round(
        (this.frames * 1000) / (currentTime - this.lastTime),
      );
      this.frames = 0;
      this.lastTime = currentTime;

      // Log performance if FPS is low
      if (this.fps < 30) {
        console.warn("Low FPS detected:", this.fps);
      }
    }

    requestAnimationFrame(() => this.measure());
  }

  getFPS() {
    return this.fps;
  }
}

// Lazy Loading Images
class LazyLoader {
  constructor() {
    this.images = [];
    this.observer = null;
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        this.observer.observe(img);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll("img[data-src]").forEach((img) => {
        this.loadImage(img);
      });
    }
  }

  loadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) return;

    img.src = src;
    img.removeAttribute("data-src");
    img.classList.add("loaded");
  }
}

// Theme Switcher with Persistence
// Toast Notifications
class ToastNotification {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    this.container = document.createElement("div");
    this.container.className = "toast-container";
    this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
    document.body.appendChild(this.container);
  }

  show(message, type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
            padding: 15px 20px;
            background: ${this.getColor(type)};
            color: white;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
            min-width: 250px;
        `;
    toast.textContent = message;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  getColor(type) {
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    };
    return colors[type] || colors.info;
  }
}

// Form Validation
class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener("submit", (e) => {
      if (!this.validate()) {
        e.preventDefault();
      }
    });

    // Real-time validation
    this.form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("blur", () => {
        this.validateField(field);
      });
    });
  }

  validate() {
    let isValid = true;
    this.form
      .querySelectorAll("input[required], textarea[required]")
      .forEach((field) => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = "";

    if (field.hasAttribute("required") && !value) {
      isValid = false;
      message = "This field is required";
    } else if (field.type === "email" && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        isValid = false;
        message = "Please enter a valid email";
      }
    }

    this.showFieldError(field, isValid, message);
    return isValid;
  }

  showFieldError(field, isValid, message) {
    const existing = field.parentElement.querySelector(".field-error");
    if (existing) existing.remove();

    if (!isValid) {
      const error = document.createElement("span");
      error.className = "field-error";
      error.style.cssText =
        "color: #ef4444; font-size: 12px; margin-top: 5px; display: block;";
      error.textContent = message;
      field.parentElement.appendChild(error);
      field.style.borderColor = "#ef4444";
    } else {
      field.style.borderColor = "";
    }
  }
}

// Initialize all features when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize features
  // CursorTrail removed - no mouse trail effect
  new ParticleBackground();
  new MagneticButtons();
  new ParallaxEffect();
  new SmoothScroll();
  new ScrollAnimations();
  new PerformanceMonitor();
  new LazyLoader();
  // ThemeManager removed - no dark/light mode toggle

  // Global toast notification instance
  window.toast = new ToastNotification();

  // Form validation for contact form
  new FormValidator("#form");

  // Add animation classes to elements
  document.querySelectorAll(".section-title").forEach((el) => {
    el.setAttribute("data-animate", "true");
  });

  // Log initialization
  console.log(
    "%c✨ 2026 Features Loaded Successfully!",
    "color: #667eea; font-size: 16px; font-weight: bold;",
  );
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CursorTrail,
    ParticleBackground,
    MagneticButtons,
    ParallaxEffect,
    SmoothScroll,
    ScrollAnimations,
    PerformanceMonitor,
    LazyLoader,
    ToastNotification,
    FormValidator,
  };
}
