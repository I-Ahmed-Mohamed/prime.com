
document.addEventListener("DOMContentLoaded", () => {
    // استرجاع عدد الزيارات من LocalStorage
    let visits = localStorage.getItem("siteVisits") || 500;

    // زيادة عدد الزيارات
    visits++;
    localStorage.setItem("siteVisits", visits);

    // تحديث الزر بعدد الزيارات
    const button = document.getElementById("visitButton");
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.685 1.664-1.208 2.378C19.53 16.1 15.897 19 12 19s-7.53-2.9-8.334-5.622A10.056 10.056 0 012.458 12z" />
        </svg>
         Profile Views:   ${visits}
    `;
});




const messageElement = document.getElementById("message");
let inactivityTimer;

function resetInactivityTimer() {
    // إعادة ضبط العداد
    clearTimeout(inactivityTimer);
    messageElement.style.display = "none"; // إخفاء الرسالة إذا ظهرت مسبقًا

    inactivityTimer = setTimeout(() => {
        messageElement.style.display = "block"; // إظهار الرسالة
    }, 3000); 
}

// الاستماع لأي نشاط على الصفحة
window.onload = resetInactivityTimer; // عند تحميل الصفحة
window.onmousemove = resetInactivityTimer; // عند تحريك الماوس
window.onkeypress = resetInactivityTimer; // عند الضغط على لوحة المفاتيح
window.onscroll = resetInactivityTimer; // عند التمرير




