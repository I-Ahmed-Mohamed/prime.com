# ⚡ Quick Start Guide - Portfolio Customization

## 🎯 5-Minute Setup

### 1. Personal Information

#### Update Your Name & Title

Open each HTML file and update:

```html
<!-- index.html, About.html, etc. -->
<title>YOUR NAME | YOUR TITLE</title>
<meta name="description" content="YOUR NAME - YOUR DESCRIPTION" />
```

#### Update Profile Images

Replace images in `assets/img/`:

- `me.jpg` - Your profile photo
- `5.jpg` - Your main display image
- Add more project images as needed

### 2. Email Configuration

#### Setup EmailJS

1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up and get your User ID
3. Update in ALL HTML files:

```javascript
emailjs.init("YOUR_USER_ID_HERE");
```

Replace `gkIpVYT3CHg7ZgDjn` with your actual User ID.

### 3. Colors & Branding

#### Change Color Scheme

Edit `assets/css/modern-enhancements.css`:

```css
:root {
  /* Change these to your brand colors */
  --primary-blue: #037eb8; /* Main color */
  --accent-cyan: #00d9ff; /* Accent 1 */
  --accent-purple: #8b5cf6; /* Accent 2 */
}
```

#### Popular Color Schemes:

**Tech Blue (Current)**

```css
--primary-blue: #037eb8;
--accent-cyan: #00d9ff;
--accent-purple: #8b5cf6;
```

**Professional Green**

```css
--primary-blue: #10b981;
--accent-cyan: #34d399;
--accent-purple: #059669;
```

**Modern Orange**

```css
--primary-blue: #f97316;
--accent-cyan: #fb923c;
--accent-purple: #ea580c;
```

**Creative Purple**

```css
--primary-blue: #8b5cf6;
--accent-cyan: #a78bfa;
--accent-purple: #7c3aed;
```

### 4. Social Links

#### Update Social Media Links

Find and update in footer/navbar sections:

```html
<!-- Find these and update with your links -->
<a href="https://github.com/YOURUSERNAME">GitHub</a>
<a href="https://linkedin.com/in/YOURPROFILE">LinkedIn</a>
<a href="https://twitter.com/YOURHANDLE">Twitter</a>
```

### 5. Content Updates

#### Home Page (index.html)

```html
<!-- Update your introduction -->
<div id="terminal-output" class="text-center"></div>
```

Update the typing text in `assets/js/typing.js`

#### About Page (About.html)

- Update your bio
- Add your story
- Update experience

#### Projects Page (Projects.html)

- Add your projects
- Update project images
- Add project descriptions
- Update live demo links

#### Skills Page (Skills.html)

- List your technical skills
- Add skill levels
- Update technologies

#### Services Page (Services.html)

- List services you offer
- Update pricing (if applicable)
- Add service descriptions

#### Contact Page (Contact.html)

- Update contact information
- Add your location
- Update phone/email

---

## 🎨 Customization Tips

### Fonts

Change fonts in HTML head:

```html
<link
  href="https://fonts.googleapis.com/css?family=YOUR-FONT-HERE"
  rel="stylesheet"
/>
```

Update in CSS:

```css
body {
  font-family: "YOUR-FONT", sans-serif;
}
```

### Loading Screen

Adjust timing in `modern-features.js`:

```javascript
setTimeout(() => {
  loadingScreen.classList.add("hidden");
}, 800); // Change 800 to your preferred milliseconds
```

### Particles

Adjust particle count in `modern-features.js`:

```javascript
const particleCount = 80; // Reduce for better performance on mobile
const connectionDistance = 150; // Distance particles connect
```

### Theme Colors

Default theme in `modern-features.js`:

```javascript
const savedTheme = localStorage.getItem("theme") || "dark";
```

Change `'dark'` to `'light'` for light mode by default.

---

## 📱 Testing Checklist

Before going live:

- [ ] All personal information updated
- [ ] Email form working
- [ ] All images replaced
- [ ] Social links working
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Check all page links
- [ ] Verify contact form
- [ ] Test in different browsers
- [ ] Check loading speed
- [ ] Verify SEO meta tags
- [ ] Test dark/light mode
- [ ] Check console for errors

---

## 🚀 Deployment

### GitHub Pages (Free)

1. Create GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Select branch to deploy
5. Your site will be at: `https://username.github.io/repo-name`

### Netlify (Free)

1. Sign up at [netlify.com](https://www.netlify.com)
2. Drag and drop your folder
3. Or connect to GitHub
4. Auto-deploy on every push

### Vercel (Free)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Click Deploy
4. Done!

### Traditional Hosting

1. Upload all files via FTP
2. Ensure `index.html` is in root
3. Check file permissions
4. Test all links

---

## 🔧 Common Issues

### Loading Screen Won't Hide

Check browser console for errors:

```javascript
// Make sure this exists in modern-features.js
window.addEventListener('load', function() { ... });
```

### Email Not Sending

1. Verify EmailJS User ID is correct
2. Check email service configuration
3. Test with EmailJS dashboard
4. Check console for errors

### Particles Not Showing

1. Check if canvas element exists
2. Verify JavaScript is loading
3. Check browser console
4. Try reducing particle count

### Dark Mode Not Working

1. Check if localStorage is enabled
2. Verify CSS variables are defined
3. Check theme-switcher button exists
4. Test in different browser

---

## 💡 Pro Tips

1. **Performance**: Optimize images before uploading (use TinyPNG)
2. **SEO**: Update meta descriptions for each page
3. **Analytics**: Add Google Analytics for tracking
4. **Security**: Use HTTPS for production
5. **Backup**: Keep regular backups of your site
6. **Updates**: Check for library updates regularly
7. **Testing**: Test on real devices, not just browser resize
8. **Accessibility**: Ensure good color contrast ratios
9. **Mobile**: Test on actual mobile devices
10. **Speed**: Use PageSpeed Insights to test performance

---

## 📞 Need Help?

- Check the README.md for detailed documentation
- Review CHANGELOG.md for recent updates
- Search for similar issues online
- Contact via email (update with your email)

---

## ⭐ Next Steps

After basic setup:

1. Add your actual projects
2. Write compelling content
3. Optimize images
4. Test thoroughly
5. Deploy to production
6. Share with the world!
7. Collect feedback
8. Iterate and improve

---

<div align="center">
  <p><strong>Happy Coding! 🚀</strong></p>
  <p>Remember: This is YOUR portfolio. Make it unique!</p>
</div>
