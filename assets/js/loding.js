document.addEventListener("DOMContentLoaded", function () {
  // تأخير لمحاكاة تحميل الصفحة (2 ثانية)
  setTimeout(() => {
    const loadingOverlay = document.querySelector(".loading-overlay");
    const profileContainer = document.querySelector(".profile-container");
    const navbarContainer = document.querySelector("#navbar-container");

    // إضافة كلاس hidden لإخفاء صفحة التحميل
    loadingOverlay.classList.add("hidden");

    // إظهار المحتوى الرئيسي
    setTimeout(() => {
      profileContainer.classList.add("visible");
      navbarContainer.classList.add("visible");

      // إزالة صفحة التحميل نهائيًا إذا لزم الأمر
      loadingOverlay.remove();
    }, 800); // وقت مطابق لتأثير الانتقال
  }, 1000); // مدة محاكاة التحميل
});
