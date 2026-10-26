const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Update navbar.js with Zero-Refresh SPA Router
const navbarPath = path.join(rootDir, 'assets', 'js', 'navbar.js');
let navbarContent = fs.readFileSync(navbarPath, 'utf8');

const spaRouterCode = `
/* ==========================================================================
   PRIME 2030 ZERO-REFRESH SPA CLIENT ROUTER
   ========================================================================== */
(function() {
  const pageCache = new Map();

  async function loadPage(url, pushState = true) {
    const mainEl = document.querySelector('main#main') || document.querySelector('main') || document.querySelector('#main-content');
    if (!mainEl) {
      window.location.href = url;
      return;
    }

    // Micro-fade out
    mainEl.style.transition = 'opacity 0.12s ease, transform 0.12s ease';
    mainEl.style.opacity = '0';
    mainEl.style.transform = 'translateY(6px)';

    try {
      let htmlText = pageCache.get(url);
      if (!htmlText) {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch failed');
        htmlText = await res.text();
        pageCache.set(url, htmlText);
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const newMain = doc.querySelector('main#main') || doc.querySelector('main') || doc.querySelector('#main-content');

      if (!newMain) {
        window.location.href = url;
        return;
      }

      if (doc.title) {
        document.title = doc.title;
      }

      // Swap content
      mainEl.innerHTML = newMain.innerHTML;

      if (pushState) {
        history.pushState({ url }, '', url);
      }

      // Update active links
      const targetPage = url.split('/').pop() || 'index.html';
      document.querySelectorAll('#prime-nav-2029 .nav-link, #prime-nav-2029 .dropdown-link, .prime-mobile-tab').forEach(link => {
        const href = link.getAttribute('href');
        if (href === targetPage || (targetPage === 'index.html' && href === '/')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Close fullscreen menu if open
      const menu = document.getElementById('prime-fullscreen-menu');
      if (menu) menu.classList.remove('active');

      // Refresh AOS
      if (window.AOS && typeof window.AOS.refresh === 'function') {
        window.AOS.refresh();
      }

      // Micro-fade in
      setTimeout(() => {
        mainEl.style.opacity = '1';
        mainEl.style.transform = 'translateY(0)';
      }, 30);

    } catch (err) {
      // Fallback
      window.location.href = url;
    }
  }

  // Intercept all internal navigation clicks
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://')) {
      return;
    }

    if (href.endsWith('.html') || href === '/' || !href.includes(':')) {
      e.preventDefault();
      loadPage(href, true);
    }
  });

  window.addEventListener('popstate', function () {
    const targetUrl = window.location.pathname.split('/').pop() || 'index.html';
    loadPage(targetUrl, false);
  });
})();
`;

// Replace preloader logic
navbarContent = navbarContent.replace(/\/\* Ultimate Preloader Logic \*\/[\s\S]*$/, `/* Instant Preloader */
const preloader = document.getElementById('prime-preloader');
if (preloader) {
  preloader.classList.add('loaded');
  setTimeout(() => preloader.remove(), 150);
}

${spaRouterCode}
`);

fs.writeFileSync(navbarPath, navbarContent, 'utf8');
console.log('✓ Successfully updated navbar.js with Zero-Refresh SPA Router!');

// 2. Update Skills.html with AI skills
const skillsPath = path.join(rootDir, 'Skills.html');
let skillsContent = fs.readFileSync(skillsPath, 'utf8');

const aiSkillsHTML = `          <!-- Artificial Intelligence, LLMs & Agents -->
          <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <h3 style="font-weight: 800; margin: 0; color: #0284c7;">
              <i class="bi bi-robot me-2"></i> Artificial Intelligence & LLMs (الذكاء الاصطناعي وهندسة النماذج)
            </h3>
            <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #0284c7; border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 9999px; padding: 0.4rem 0.9rem; font-weight: 700;">
              2030 AI Core Expertise
            </span>
          </div>
          <div class="prime-skills-grid mb-5">
            <div class="skill-item animated-item">
              <i class="bi bi-stars" style="font-size: 2.2rem; color: #10a37f; margin-bottom: 0.5rem; display: block;"></i>
              <p>OpenAI GPT-4o</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-cpu-fill" style="font-size: 2.2rem; color: #2563eb; margin-bottom: 0.5rem; display: block;"></i>
              <p>Semantic Kernel (.NET)</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-database-fill-gear" style="font-size: 2.2rem; color: #8b5cf6; margin-bottom: 0.5rem; display: block;"></i>
              <p>RAG & pgvector</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-diagram-3-fill" style="font-size: 2.2rem; color: #f59e0b; margin-bottom: 0.5rem; display: block;"></i>
              <p>Multi-Agent Swarms</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-lightning-charge-fill" style="font-size: 2.2rem; color: #d97706; margin-bottom: 0.5rem; display: block;"></i>
              <p>Claude 3.5 Sonnet</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-gem" style="font-size: 2.2rem; color: #0284c7; margin-bottom: 0.5rem; display: block;"></i>
              <p>Google Gemini</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-hdd-stack-fill" style="font-size: 2.2rem; color: #64748b; margin-bottom: 0.5rem; display: block;"></i>
              <p>Local Ollama & Llama 3</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-file-earmark-text-fill" style="font-size: 2.2rem; color: #059669; margin-bottom: 0.5rem; display: block;"></i>
              <p>OCR Invoice Extraction</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-speedometer2" style="font-size: 2.2rem; color: #06b6d4; margin-bottom: 0.5rem; display: block;"></i>
              <p>ONNX Runtime .NET</p>
            </div>
            <div class="skill-item animated-item">
              <i class="bi bi-link-45deg" style="font-size: 2.2rem; color: #e11d48; margin-bottom: 0.5rem; display: block;"></i>
              <p>LangChain & LlamaIndex</p>
            </div>
          </div>
`;

if (!skillsContent.includes('Artificial Intelligence & LLMs')) {
  skillsContent = skillsContent.replace(/<!-- Backend & Core -->/, aiSkillsHTML + '\n          <!-- Backend & Core -->');
  fs.writeFileSync(skillsPath, skillsContent, 'utf8');
  console.log('✓ Successfully updated Skills.html with AI skills!');
} else {
  console.log('• Skills.html already contains AI skills.');
}
