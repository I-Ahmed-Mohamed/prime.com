# صفحة التصاميم - دليل الاستخدام

## 📋 نظرة عامة
تم إنشاء صفحة تصاميم احترافية تعرض جميع التصاميمات مُنظمة حسب الشركات. يمكن للمستخدمين بسهولة تصفية التصاميمات بناءً على الشركة.

## 📁 الملفات المضافة

### 1. **Designs.html** - صفحة التصاميم الرئيسية
- تحتوي على هيكل HTML لعرض التصاميمات
- مقسمة إلى عدة أقسام، كل قسم لشركة واحدة
- تتضمن أزرار تصفية للتنقل بين الشركات

### 2. **assets/css/designs-portfolio.css** - أنماط التصاميم
- تصميم احترافي وحديث
- استجابة تامة للشاشات المختلفة (Desktop, Tablet, Mobile)
- تأثيرات hover جميلة على الكروت والأزرار
- ألوان متسقة مع الموقع الرئيسي

### 3. **assets/js/designs-portfolio.js** - وظائف JavaScript
- نظام تصفية ديناميكي للتصاميمات
- lazy loading للصور
- keyboard navigation للمستخدمين
- smooth scrolling وتأثيرات تفاعلية

## 🚀 كيفية الاستخدام

### إضافة شركة جديدة
1. انسخ كود قسم شركة موجود (Company Section)
2. غير اسم الشركة في `data-company` attribute
3. غيّر `<h3>` لاسم الشركة الجديدة
4. احفظ الملف

### إضافة تصميم جديد
داخل قسم الشركة، أضف بطاقة تصميم جديدة:

```html
<div class="design-card" data-company="company1">
    <div class="design-image-wrapper">
        <img src="assets/img/portfolio/design-new.jpg" alt="Design Name" class="design-image" />
        <div class="design-overlay">
            <a href="assets/img/portfolio/design-new.jpg" class="design-link glightbox" title="Company - Design Name">
                <i class="bx bx-search-alt"></i>
            </a>
        </div>
    </div>
    <div class="design-info">
        <h4>اسم التصميم</h4>
        <p class="design-category">نوع التصميم</p>
        <div class="design-tools">
            <span class="tool-badge">Figma</span>
            <span class="tool-badge">UI/UX</span>
        </div>
    </div>
</div>
```

### إضافة زر تصفية جديد
أضف زر في قسم `filter-buttons`:

```html
<button class="filter-btn" data-filter="company4">
    <i class="bx bx-building"></i> Company 4
</button>
```

## 🎨 التخصيص

### تغيير الألوان
عدّل متغيرات CSS في `designs-portfolio.css`:

```css
:root {
    --primary-color: #037eb8;       /* اللون الأساسي */
    --secondary-color: #0c5aa0;     /* اللون الثانوي */
    --accent-color: #ff6b6b;        /* لون التأكيد */
}
```

### تغيير عدد الأعمدة
في CSS، عدّل `grid-template-columns` في `.designs-grid`:

```css
.designs-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* غيّر 300px للحجم المرغوب */
}
```

## 📱 الاستجابة (Responsive)
الصفحة مستجيبة تماماً ل:
- **Desktop**: عرض كامل مع 3 أعمدة
- **Tablet**: عرضين في الصف
- **Mobile**: عمود واحد مع تأثيرات محسّنة

## ⚙️ الميزات

✅ تصفية ديناميكية للشركات
✅ معاينة الصور مع GLightbox
✅ تأثيرات Hover جميلة
✅ دعم لوحة المفاتيح (Keyboard Navigation)
✅ تحميل الصور الكسول (Lazy Loading)
✅ Smooth Scrolling
✅ تأثيرات الرقص والحركة (AOS Animation)

## 🔗 الروابط الهامة
- **صفحة التصاميس**: `Designs.html`
- **المسار البديل**: يمكن الوصول عبر navbar الجديد
- **نمط الصور**: ضع الصور في `assets/img/portfolio/`

## 💡 نصائح مهمة

1. **حجم الصور**: استخدم صور بحجم متقارب (مربع أو مستطيل)
2. **جودة الصور**: استخدم صور عالية الجودة (JPG, PNG)
3. **تسمية الصور**: استخدم أسماء واضحة ومنظمة
4. **الـ Metadata**: حدّث عنوان الصفحة والوصف حسب الحاجة

## 🆘 استكشاف الأخطاء

### الصور لا تظهر
- تأكد من المسار الصحيح للصور
- تحقق من امتداد الملف (.jpg, .png, etc.)

### الأزرار لا تعمل
- تأكد من تحميل `designs-portfolio.js`
- افتح Browser Console وتحقق من الأخطاء

### الألوان مختلفة
- تحقق من `designs-portfolio.css`
- قد تكون هناك تضارب مع CSS آخر

---

**تم الإنشاء بواسطة**: Ahmed Mohamed
**التاريخ**: يناير 2026
**الحالة**: جاهز للاستخدام ✓
