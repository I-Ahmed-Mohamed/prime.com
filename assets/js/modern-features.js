/**
 * ===============================================
 * 🚀 Modern Professional Features JavaScript
 * Created: 2026
 * ===============================================
 */

(function () {
  "use strict";

  // ===== Page Load Handler =====
  window.addEventListener("load", function () {
    // Trigger fade-in animations for page elements
    document.body.classList.add("loaded");
    animateOnScroll();
  });

  // ===== Scroll Progress Bar =====
  const updateScrollProgress = () => {
    const progressBar = document.getElementById("progressBar");
    if (!progressBar) return;

    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;

    progressBar.style.width = scrolled + "%";
  };

  window.addEventListener("scroll", updateScrollProgress);
  window.addEventListener("resize", updateScrollProgress);

  // ===== Back to Top Button =====
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 100) {
        backToTop.classList.add("active");
      } else {
        backToTop.classList.remove("active");
      }
    };

    window.addEventListener("scroll", toggleBackToTop);

    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ===== Smooth Scroll for All Links =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#" && href !== "#!") {
        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // ===== Animate Elements on Scroll =====
  const animateOnScroll = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections and cards
    document
      .querySelectorAll("section, .glass-card, .profile-container")
      .forEach((el) => {
        observer.observe(el);
      });
  };

  // ===== Enhanced Particle Background =====
  const initParticles = () => {
    const canvas = document.getElementById("spider");
    if (!canvas) return;

    // Check if it's already a canvas
    if (canvas.tagName !== "CANVAS") {
      const newCanvas = document.createElement("canvas");
      newCanvas.id = "spider";
      canvas.parentNode.replaceChild(newCanvas, canvas);
      return initParticles(); // Retry with new canvas
    }

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 217, 255, 0.5)";
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(3, 126, 184, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  // ===== Parallax Effect =====
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll(".parallax");

    window.addEventListener("scroll", () => {
      parallaxElements.forEach((el) => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  };

  // ===== Enhanced Typing Effect =====
  const enhanceTypingEffect = () => {
    const terminalOutput = document.getElementById("terminal-output");
    if (terminalOutput) {
      terminalOutput.style.opacity = "0";

      setTimeout(() => {
        terminalOutput.style.transition = "opacity 1s ease";
        terminalOutput.style.opacity = "1";
      }, 1000);
    }
  };

  // ===== Mouse Trail Effect =====
  const initMouseTrail = () => {
    const trail = [];
    const trailLength = 20;

    document.addEventListener("mousemove", (e) => {
      trail.push({ x: e.clientX, y: e.clientY, opacity: 1 });

      if (trail.length > trailLength) {
        trail.shift();
      }

      // Create trail elements (optional - can be resource intensive)
      // Uncomment if you want visible mouse trail
      /*
      trail.forEach((point, index) => {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.left = point.x + 'px';
        dot.style.top = point.y + 'px';
        dot.style.opacity = point.opacity * (index / trailLength);
        document.body.appendChild(dot);
        
        setTimeout(() => dot.remove(), 500);
      });
      */
    });
  };

  // ===== Lazy Loading Images =====
  const initLazyLoading = () => {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  };

  // ===== Performance Monitoring =====
  const monitorPerformance = () => {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(
              "Long task detected:",
              entry.name,
              entry.duration + "ms",
            );
          }
        }
      });

      observer.observe({ entryTypes: ["measure"] });
    }
  };

  // ===== Initialize All Features =====
  const init = () => {
    // Convert spider div to canvas for particles
    const spiderDiv = document.getElementById("spider");
    if (spiderDiv && spiderDiv.tagName === "DIV") {
      const canvas = document.createElement("canvas");
      canvas.id = "spider";
      spiderDiv.parentNode.replaceChild(canvas, spiderDiv);
    }

    initParticles();
    initParallax();
    enhanceTypingEffect();
    initLazyLoading();

    // Optional features
    // initMouseTrail();
    // monitorPerformance();
  };

  // Run initialization when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ===== Easter Egg: Konami Code =====
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;

      if (konamiIndex === konamiCode.length) {
        // Easter egg activated!
        document.body.style.animation = "rainbow 2s infinite";
        setTimeout(() => {
          document.body.style.animation = "";
        }, 5000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Add rainbow animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();

// ===== Console Art =====
console.log(
  `
%c
╔═══════════════════════════════════════╗
║                                       ║
║   🚀 Portfolio Enhanced by AI         ║
║   👨‍💻 Ahmed Mohamed                    ║
║   📅 2026                              ║
║                                       ║
╚═══════════════════════════════════════╝
`,
  "color: #00d9ff; font-size: 12px; font-family: monospace;",
);
