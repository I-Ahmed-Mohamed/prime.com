// ===========================
// Designs Portfolio JavaScript
// ===========================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  const companySections = document.querySelectorAll(".company-section");
  const designCards = document.querySelectorAll(".design-card");

  // Add click event to filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter designs
      filterDesigns(filterValue);
    });
  });

  /**
   * Filter designs based on company selection
   * @param {string} filterValue - The filter value (company or 'all')
   */
  function filterDesigns(filterValue) {
    companySections.forEach((section, index) => {
      const sectionCompany = section.getAttribute("data-company");

      if (filterValue === "all" || filterValue === sectionCompany) {
        // Show section with animation
        section.classList.remove("hidden");
        section.style.display = "block";
        section.style.opacity = "0";
        section.style.animation = `slideInUp 0.6s ease forwards`;
        section.style.animationDelay = `${index * 100}ms`;

        // Show all design cards in this section
        section.querySelectorAll(".design-card").forEach((card, cardIndex) => {
          card.classList.remove("hidden");
          card.style.display = "block";
          card.style.animation = `slideInUp 0.6s ease forwards`;
          card.style.animationDelay = `${index * 100 + cardIndex * 50}ms`;
        });
      } else {
        // Hide section
        section.classList.add("hidden");
        section.style.display = "none";
      }
    });
  }

  // Add hover effect to design cards with enhanced animation
  designCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add glow effect on hover
  designCards.forEach((card) => {
    const overlay = card.querySelector(".design-overlay");
    card.addEventListener("mouseenter", function () {
      if (overlay) {
        overlay.style.background =
          "linear-gradient(135deg, rgba(0, 212, 255, 0.95), rgba(255, 27, 109, 0.95))";
      }
    });
  });

  // Initialize lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.hasAttribute("data-src")) {
              img.src = img.getAttribute("data-src");
              img.removeAttribute("data-src");
            }
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px",
      },
    );

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Keyboard navigation for filters
  filterButtons.forEach((button, index) => {
    button.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (index + 1) % filterButtons.length;
        filterButtons[nextIndex].focus();
        filterButtons[nextIndex].click();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex =
          (index - 1 + filterButtons.length) % filterButtons.length;
        filterButtons[prevIndex].focus();
        filterButtons[prevIndex].click();
      }
    });
  });

  // Add favorites functionality
  const designLinks = document.querySelectorAll(".design-link");
  designLinks.forEach((link) => {
    link.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      const card = this.closest(".design-card");
      const title = card.querySelector(".design-info h4").textContent;

      if (card.classList.contains("favorite")) {
        card.classList.remove("favorite");
        showNotification(`Removed "${title}" from favorites`);
      } else {
        card.classList.add("favorite");
        showNotification(`Added "${title}" to favorites`);
      }
    });
  });

  // Initialize tooltip functionality
  const toolBadges = document.querySelectorAll(".tool-badge");
  toolBadges.forEach((badge) => {
    badge.setAttribute("title", `Tool: ${badge.textContent}`);
  });

  // Add parallax effect to badges
  document.addEventListener("mousemove", function (e) {
    const badges = document.querySelectorAll(".company-badge");
    badges.forEach((badge) => {
      const rect = badge.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) * 0.05;
      const rotateY = (centerX - x) * 0.05;

      badge.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });

  console.log("✨ Designs Portfolio initialized successfully");
});

/**
 * Show notification toast
 * @param {string} message - Message to display
 */
function showNotification(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #00d4ff, #ff1b6d);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInUp 0.4s ease;
        box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
        backdrop-filter: blur(10px);
    `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Handle window resize for responsive behavior
window.addEventListener(
  "resize",
  debounce(function () {
    const designsGrid = document.querySelectorAll(".designs-grid");
    designsGrid.forEach((grid) => {
      grid.style.display = "grid";
    });
  }, 250),
);

/**
 * Debounce function to prevent excessive function calls
 * @param {function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add ripple effect on button click
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.6)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple-animation 0.6s ease-out";
    ripple.style.pointerEvents = "none";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Scroll animations
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".company-section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      section.style.opacity = "1";
    }
  });
});

// Export functions for external use
window.DesignsPortfolio = {
  filterDesigns: function (filterValue) {
    const filterBtn = document.querySelector(`[data-filter="${filterValue}"]`);
    if (filterBtn) {
      filterBtn.click();
    }
  },
  addDesignToFavorites: function (cardElement) {
    cardElement.classList.add("favorite");
  },
  removeDesignFromFavorites: function (cardElement) {
    cardElement.classList.remove("favorite");
  },
};
