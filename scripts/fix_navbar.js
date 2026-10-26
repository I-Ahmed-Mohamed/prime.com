const fs = require('fs');
const path = require('path');

const navbarPath = path.resolve(__dirname, '..', 'assets', 'js', 'navbar.js');
let content = fs.readFileSync(navbarPath, 'utf8');

const splitMarker = '/* Instant Preloader';
const idx = content.indexOf(splitMarker);
if (idx !== -1) {
  content = content.substring(0, idx);
}

const cleanedPreloader = `/* Fast Preloader */
const preloader = document.getElementById('prime-preloader');
if (preloader) {
  preloader.classList.add('loaded');
  setTimeout(() => preloader.remove(), 100);
}
`;

content = content.trim() + '\n\n' + cleanedPreloader;
fs.writeFileSync(navbarPath, content, 'utf8');
console.log('✓ Successfully reverted navbar.js and removed experimental router.');
