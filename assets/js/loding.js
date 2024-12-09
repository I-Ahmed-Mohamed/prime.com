
const loadingOverlay = document.createElement('div');
loadingOverlay.className = 'loading-overlay';

const skChase = document.createElement('div');
skChase.className = 'sk-chase';

// إنشاء النقاط الدوارة
for (let i = 0; i < 6; i++) {
  const skChaseDot = document.createElement('div');
  skChaseDot.className = 'sk-chase-dot';
  skChase.appendChild(skChaseDot);
}

loadingOverlay.appendChild(skChase);
document.body.appendChild(loadingOverlay);

// إخفاء اللودينج وإظهار المحتوى
setTimeout(() => {
  loadingOverlay.style.display = 'none'; // إخفاء اللودينج
  document.getElementById('main-content').style.display = 'block'; // إظهار المحتوى
}, 2000);