

  // إنشاء النجوم
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(star);

    // إزالة النجوم بعد فترة
    setTimeout(() => {
      star.remove();
    }, 2000);
  }

  // إنشاء اللمحات (sparkles)
  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${Math.random() * window.innerWidth}px`;
    sparkle.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(sparkle);

    // إزالة اللمحات بعد فترة
    setTimeout(() => {
      sparkle.remove();
    }, 1500);
  }

  // إنشاء النجوم كل 100 مللي ثانية
  setInterval(createStar, 100);

  // إنشاء اللمحات كل 200 مللي ثانية
  setInterval(createSparkle, 200);
