import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="prime-navbar">
      <div class="prime-container nav-wrapper">
        <!-- Brand / Logo -->
        <a href="#home" class="brand-link" (click)="scrollTo('home', $event)">
          <div class="brand-avatar">
            <span class="avatar-text">AM</span>
            <span class="status-dot" title="Available for projects"></span>
          </div>
          <div class="brand-info">
            <span class="brand-name">{{ lang.t('brand.name') }}</span>
            <span class="brand-title">{{ lang.t('brand.specialty') }}</span>
          </div>
        </a>

        <!-- Desktop Navigation Links (ZERO REFRESH) -->
        <ul class="nav-links">
          <li><a href="#home" class="nav-item" (click)="scrollTo('home', $event)">{{ lang.t('nav.home') }}</a></li>
          <li><a href="#about" class="nav-item" (click)="scrollTo('about', $event)">{{ lang.t('nav.about') }}</a></li>
          <li><a href="#ai" class="nav-item highlight-ai" (click)="scrollTo('ai', $event)">
            <i class="bi bi-robot"></i> {{ lang.t('nav.ai') }}
          </a></li>
          <li><a href="#architecture" class="nav-item" (click)="scrollTo('architecture', $event)">{{ lang.t('nav.architecture') }}</a></li>
          <li><a href="#projects" class="nav-item" (click)="scrollTo('projects', $event)">{{ lang.t('nav.projects') }}</a></li>
          <li><a href="#clients" class="nav-item" (click)="scrollTo('clients', $event)">{{ lang.t('nav.clients') }}</a></li>
          <li><a href="#services" class="nav-item" (click)="scrollTo('services', $event)">{{ lang.t('nav.services') }}</a></li>
          <li><a href="#pricing" class="nav-item highlight-nav" (click)="scrollTo('pricing', $event)">{{ lang.t('nav.pricing') }}</a></li>
          <li><a href="#skills" class="nav-item" (click)="scrollTo('skills', $event)">{{ lang.t('nav.skills') }}</a></li>
          <li><a href="#contact" class="nav-item" (click)="scrollTo('contact', $event)">{{ lang.t('nav.contact') }}</a></li>
        </ul>

        <!-- Action Controls -->
        <div class="nav-actions">
          <!-- Language Toggle Button -->
          <button 
            type="button" 
            class="control-btn lang-btn" 
            (click)="lang.toggleLang()" 
            [title]="lang.isRtl() ? 'Switch to English' : 'التبديل إلى العربية'">
            <i class="bi bi-translate"></i>
            <span class="btn-label">{{ lang.isRtl() ? 'EN' : 'عربي' }}</span>
          </button>

          <!-- Theme Toggle Button -->
          <button 
            type="button" 
            class="control-btn theme-btn" 
            (click)="theme.toggleTheme()" 
            [title]="theme.isDark() ? 'تفعيل الوضع الفاتح عالي التباين' : 'تفعيل الوضع الداكن الفاخر'">
            <i class="bi" [ngClass]="theme.isDark() ? 'bi-sun-fill' : 'bi-moon-stars-fill'"></i>
          </button>

          <!-- Start Project CTA -->
          <a [href]="data.developerInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="prime-btn prime-btn-primary prime-btn-sm cta-btn">
            <i class="bi bi-whatsapp"></i>
            <span>{{ lang.isRtl() ? 'تواصل الآن' : 'Hire Me' }}</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button type="button" class="mobile-toggle" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()">
            <i class="bi" [ngClass]="menuOpen() ? 'bi-x-lg' : 'bi-list'"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div class="mobile-drawer" [class.open]="menuOpen()">
        <div class="mobile-links">
          <a href="#home" (click)="scrollTo('home', $event)">{{ lang.t('nav.home') }}</a>
          <a href="#about" (click)="scrollTo('about', $event)">{{ lang.t('nav.about') }}</a>
          <a href="#ai" (click)="scrollTo('ai', $event)" class="highlight-ai-drawer">
            <i class="bi bi-robot"></i> {{ lang.t('nav.ai') }}
          </a>
          <a href="#architecture" (click)="scrollTo('architecture', $event)">{{ lang.t('nav.architecture') }}</a>
          <a href="#projects" (click)="scrollTo('projects', $event)">{{ lang.t('nav.projects') }}</a>
          <a href="#clients" (click)="scrollTo('clients', $event)">{{ lang.t('nav.clients') }}</a>
          <a href="#services" (click)="scrollTo('services', $event)">{{ lang.t('nav.services') }}</a>
          <a href="#pricing" (click)="scrollTo('pricing', $event)" class="highlight-drawer">{{ lang.t('nav.pricing') }}</a>
          <a href="#skills" (click)="scrollTo('skills', $event)">{{ lang.t('nav.skills') }}</a>
          <a href="#contact" (click)="scrollTo('contact', $event)">{{ lang.t('nav.contact') }}</a>
          
          <div class="mobile-cta-group">
            <a [href]="data.developerInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="prime-btn prime-btn-primary" style="width: 100%;">
              <i class="bi bi-whatsapp"></i>
              <span>{{ lang.isRtl() ? 'واتساب مباشر (01094547599)' : 'Direct WhatsApp' }}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .prime-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: var(--navbar-bg);
      backdrop-filter: var(--card-blur);
      -webkit-backdrop-filter: var(--card-blur);
      border-bottom: 1px solid var(--border-color);
      transition: background 0.25s ease, border-color 0.25s ease;
    }

    .nav-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 74px;
      gap: 1.25rem;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      text-decoration: none;
      flex-shrink: 0;
    }

    .brand-avatar {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: var(--gradient-brand);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);

      .avatar-text {
        color: #ffffff;
        font-weight: 800;
        font-size: 1.15rem;
        letter-spacing: -0.5px;
      }

      .status-dot {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #10b981;
        border: 2px solid var(--bg-primary);
      }
    }

    .brand-info {
      display: flex;
      flex-direction: column;

      .brand-name {
        font-weight: 800;
        font-size: 1.15rem;
        color: var(--text-primary);
        line-height: 1.2;
      }

      .brand-title {
        font-size: 0.76rem;
        color: var(--text-muted);
        font-weight: 600;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      list-style: none;

      @media (max-width: 1140px) {
        display: none;
      }
    }

    .nav-item {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.5rem 0.8rem;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-secondary);
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        color: var(--accent-primary);
        background: rgba(59, 130, 246, 0.08);
      }

      &.highlight-ai {
        color: var(--accent-cyan);
        background: rgba(6, 182, 212, 0.09);
        border: 1px solid rgba(6, 182, 212, 0.3);

        i {
          font-size: 0.95rem;
        }

        &:hover {
          background: rgba(6, 182, 212, 0.18);
          border-color: var(--accent-cyan);
          box-shadow: 0 0 12px rgba(6, 182, 212, 0.25);
        }
      }

      &.highlight-nav {
        color: var(--accent-primary);
        background: rgba(59, 130, 246, 0.08);
        border: 1px solid rgba(59, 130, 246, 0.25);
        
        &:hover {
          background: rgba(59, 130, 246, 0.16);
          border-color: var(--accent-primary);
        }
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .control-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      font-weight: 700;
      font-size: 0.9rem;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
        transform: translateY(-2px);
      }

      &.lang-btn {
        width: auto;
        padding: 0 0.85rem;
      }
    }

    .cta-btn {
      @media (max-width: 640px) {
        display: none;
      }
    }

    .mobile-toggle {
      display: none;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      font-size: 1.3rem;
      align-items: center;
      justify-content: center;

      @media (max-width: 1140px) {
        display: inline-flex;
      }
    }

    .mobile-drawer {
      display: none;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      padding: 1.5rem;
      animation: slideDown 0.25s ease;

      @media (max-width: 1140px) {
        &.open {
          display: block;
        }
      }

      .mobile-links {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        a {
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-weight: 700;
          color: var(--text-primary);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);

          &:hover {
            border-color: var(--accent-primary);
            color: var(--accent-primary);
          }

          &.highlight-ai-drawer {
            border-color: var(--accent-cyan);
            color: var(--accent-cyan);
            background: rgba(6, 182, 212, 0.08);
          }

          &.highlight-drawer {
            border-color: var(--accent-primary);
            color: var(--accent-primary);
            background: rgba(59, 130, 246, 0.08);
          }
        }

        .mobile-cta-group {
          margin-top: 0.5rem;
        }
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class NavbarComponent {
  readonly theme = inject(ThemeService);
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);
  readonly menuOpen = signal<boolean>(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  scrollTo(sectionId: string, event: Event): void {
    event.preventDefault();
    this.closeMenu();
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 76;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
