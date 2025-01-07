// إنشاء الـ Navbar ديناميكيًا
const navbarHTML = `
<header id="header">
  <div class="d-flex flex-column">
    <div class="profile">
      <img src="assets/img/Ahmed Mohamed.jpg" alt="" class="img-fluid rounded-circle">
      <h1 class="text-light"><a href="index.html">Ahmed Mohamed</a></h1>
      <div class="social-links mt-3 text-center">
        <a href="https://www.facebook.com/share/wYBvM66s9ttqxrsm/?mibextid=LQQJ4d" class="facebook" style="background-color: rgb(25, 101, 199);"><i class="bx bxl-facebook"></i></a>
        <a href="https://github.com/I-Ahmed-Mohamed" class="bi-github" style="background-color: black;"><i class="bx"></i></a>
        <a href="https://www.linkedin.com/in/ahmed-mo7amed?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" class="linkedin" style="background-color: rgb(5, 43, 94);"><i class="bx bxl-linkedin"></i></a>
        <a href="https://wa.me/201070714002" class="bi-whatsapp" style="background-color: #4CAF50;"><i class="bx"></i></a>
        <a id="hovre" href="https://khamsat.com/user/dn55" class="bi-5-square" style="background-color: rgb(247, 181, 2);"><i class="bx"></i></a>
      </div>
    </div>

    <nav id="navbar" class="nav-menu navbar">
      <ul>
        <li><a href="index.html" class="nav-link scrollto"><i class="bx bx-home"></i> <span>Home</span></a></li>
        <li><a href="About.html" class="nav-link scrollto"><i class="bx bx-user"></i> <span>About</span></a></li>
        <li><a href="CV.html" class="nav-link scrollto"><i class="bx bx-id-card"></i> <span>My CV</span></a></li>
        <li><a href="Skills.html" class="nav-link scrollto"><i class="bx bx-rocket"></i> <span>Skills</span></a></li>
        <li><a href="Vedio-chnale.html" class="nav-link scrollto"><i class="bx bx-video"></i> <span>Videos</span></a></li>
        <li><a href="Projects.html" class="nav-link scrollto"><i class="bx bx-book-content"></i> <span>Projects</span></a></li>
        <li><a href="Services.html" class="nav-link scrollto"><i class="bx bx-server"></i> <span>Services</span></a></li>
        <li><a href="Contact.html" class="nav-link scrollto"><i class="bx bx-envelope"></i> <span>Contact</span></a></li>
      <li><a href="Convert-File.html" class="nav-link scrollto"><i class="bx bx-transfer"></i> <span>Convert File</span></a></li>
      </ul>
    </nav>
  </div>
</header>
`;

// إدخال الـ Navbar داخل العنصر في الصفحة
document.getElementById('navbar-container').innerHTML = navbarHTML;

// تحديد الرابط النشط بناءً على الصفحة الحالية
const currentPath = window.location.pathname.split('/').pop(); // اسم الملف الحالي
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath) {
    link.classList.add('active'); // إضافة active للرابط النشط
  } else {
    link.classList.remove('active'); // إزالة active من باقي الروابط
  }
});
