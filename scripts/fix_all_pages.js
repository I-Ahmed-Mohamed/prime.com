const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Fix About.html
const aboutPath = path.join(rootDir, 'About.html');
let aboutContent = fs.readFileSync(aboutPath, 'utf8');

// Replace FontAwesome with Bootstrap Icons
aboutContent = aboutContent.replace(/<div class="prime-social-links">[\s\S]*?<\/div>/, `<div class="prime-social-links">
                  <a href="https://www.linkedin.com/in/ahmed-mo7amed" target="_blank" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
                  <a href="https://github.com/I-Ahmed-Mohamed" target="_blank" title="GitHub"><i class="bi bi-github"></i></a>
                  <a href="https://www.facebook.com/share/1HmBiCLjYj/?mibextid=wwXIfr" target="_blank" title="Facebook"><i class="bi bi-facebook"></i></a>
                  <a href="https://www.tiktok.com/@ahmadmoamedw.s?_r=1&_t=ZS-9AdH4YFiKKS" target="_blank" title="TikTok"><i class="bi bi-tiktok"></i></a>
                  <a href="https://wa.me/201094547599" target="_blank" title="WhatsApp"><i class="bi bi-whatsapp"></i></a>
                  <a href="mailto:ahmedcodteng@gmail.com" title="Email"><i class="bi bi-envelope-fill"></i></a>
                </div>`);

// Fix CV button in About.html
aboutContent = aboutContent.replace(/<a href="assets\/img\/Ahmed Mohamed frontend CV\.pdf" class="prime-btn prime-btn-primary" target="_blank">[\s\S]*?<\/a>/, `<a href="assets/img/certificatesPath.pdf" class="prime-btn prime-btn-primary cv-btn-fixed" target="_blank">
                  <i class="bx bx-download"></i> <span data-i18n="aboutDownloadCV">تحميل السيرة الذاتية</span>
                </a>`);

fs.writeFileSync(aboutPath, aboutContent, 'utf8');
console.log('✓ Successfully fixed About.html social icons & CV button!');

// 2. Add bulletproof styles to 2030-universe.css
const cssPath = path.join(rootDir, 'assets', 'css', '2030-universe.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const bulletproofStyles = `
/* ==========================================================================
   BULLETPROOF CLIENT LOGO & MARQUEE CONSTRAINTS (FIXES OVERFLOWS)
   ========================================================================== */
.client-logo-wrapper {
  width: 100px !important;
  height: 100px !important;
  max-width: 100px !important;
  max-height: 100px !important;
  margin: 0 auto 20px !important;
  border-radius: 50% !important;
  padding: 5px !important;
  background: linear-gradient(135deg, var(--prime-accent, #00d2ff), var(--prime-accent-2, #3b82f6)) !important;
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.client-logo {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: cover !important;
  border-radius: 50% !important;
  display: block !important;
}

.client-card {
  background: var(--prime-card) !important;
  border: 1px solid var(--prime-line) !important;
  border-radius: 24px !important;
  padding: 30px !important;
  text-align: center !important;
  cursor: pointer !important;
  transition: transform 0.3s ease, border-color 0.3s ease !important;
  text-decoration: none !important;
  color: var(--prime-text) !important;
  display: block !important;
}

.client-card:hover {
  transform: translateY(-8px) !important;
  border-color: var(--prime-accent, #00d2ff) !important;
  box-shadow: 0 15px 30px rgba(0, 210, 255, 0.15) !important;
}

.clients-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
  gap: 30px !important;
  padding: 0 20px 80px !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
}

/* Presentation Marquee Constraints */
.marquee-container {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  flex: 1 !important;
  min-height: 0 !important;
  gap: 20px !important;
  padding: 0 0 40px 0 !important;
  width: 100% !important;
  max-width: 100vw !important;
  overflow: hidden !important;
  direction: ltr !important;
  position: relative !important;
}

.marquee-row {
  display: flex !important;
  gap: 20px !important;
  white-space: nowrap !important;
  flex: 1 !important;
  min-height: 140px !important;
  align-items: center !important;
}

.marquee-track {
  display: flex !important;
  flex-direction: row !important;
  gap: 20px !important;
  width: max-content !important;
  height: 100% !important;
  align-items: center !important;
}

.marquee-item {
  height: 100% !important;
  max-height: 220px !important;
  min-height: 120px !important;
  aspect-ratio: 4 / 3 !important;
  width: auto !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
  position: relative !important;
  background: var(--prime-card) !important;
  border: 1px solid var(--prime-line) !important;
}

.marquee-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

/* Button & Icon Contrast Fixes */
.cv-btn-fixed,
.prime-btn-primary {
  color: #ffffff !important;
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%) !important;
  font-weight: 700 !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3) !important;
}

.prime-social-links a {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: var(--prime-text) !important;
  font-size: 1.15rem !important;
  transition: all 0.25s ease !important;
}

.prime-social-links a:hover {
  color: var(--prime-accent, #00d2ff) !important;
  transform: translateY(-3px) !important;
}

.prime-social-links a i {
  display: inline-block !important;
  line-height: 1 !important;
}
`;

if (!cssContent.includes('BULLETPROOF CLIENT LOGO')) {
  cssContent += '\n' + bulletproofStyles;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('✓ Successfully added bulletproof styles to 2030-universe.css!');
} else {
  console.log('• Bulletproof styles already present.');
}
