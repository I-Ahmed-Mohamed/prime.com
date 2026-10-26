import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="prime-footer">
      <div class="prime-container">
        <!-- Top Row -->
        <div class="footer-top">
          <!-- Col 1: Brand & Status -->
          <div class="footer-brand">
            <div class="brand-header">
              <div class="avatar-badge">AM</div>
              <div>
                <h3 class="brand-title">{{ lang.t('brand.name') }}</h3>
                <p class="brand-subtitle">{{ lang.t('brand.role') }}</p>
              </div>
            </div>
            <p class="brand-desc">
              {{ lang.isRtl() ? data.developerInfo.specialty : data.developerInfo.specialtyEn }}
            </p>
            <div class="status-indicator">
              <span class="live-pulse"></span>
              <span class="status-text">{{ lang.t('footer.status') }}</span>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div class="footer-links-col">
            <h4 class="col-title">{{ lang.isRtl() ? 'روابط سريعة' : 'Quick Navigation' }}</h4>
            <ul>
              <li><a href="#home">{{ lang.t('nav.home') }}</a></li>
              <li><a href="#about">{{ lang.t('nav.about') }}</a></li>
              <li><a href="#architecture">{{ lang.t('nav.architecture') }}</a></li>
              <li><a href="#projects">{{ lang.t('nav.projects') }}</a></li>
              <li><a href="#clients">{{ lang.t('nav.clients') }}</a></li>
              <li><a href="#pricing">{{ lang.t('nav.pricing') }}</a></li>
            </ul>
          </div>

          <!-- Col 3: Direct Connect -->
          <div class="footer-contact-col">
            <h4 class="col-title">{{ lang.isRtl() ? 'قنوات التواصل المباشر' : 'Direct Channels' }}</h4>
            <div class="contact-items">
              <a [href]="data.developerInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="contact-item">
                <i class="bi bi-whatsapp"></i>
                <div>
                  <small>{{ lang.isRtl() ? 'واتساب وهاتف' : 'WhatsApp / Call' }}</small>
                  <strong>{{ data.developerInfo.phone }}</strong>
                </div>
              </a>
              <a [href]="'mailto:' + data.developerInfo.email" class="contact-item">
                <i class="bi bi-envelope-at-fill"></i>
                <div>
                  <small>{{ lang.isRtl() ? 'البريد الإلكتروني' : 'Email Address' }}</small>
                  <strong>{{ data.developerInfo.email }}</strong>
                </div>
              </a>
              <a href="https://www.facebook.com/share/1dEwTVm8rG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="contact-item highlight-partner">
                <i class="bi bi-printer-fill"></i>
                <div>
                  <small>{{ lang.isRtl() ? 'شريك استراتيجي' : 'Strategic Partner' }}</small>
                  <strong>{{ lang.isRtl() ? 'مطابع أوليمبيك (فيسبوك)' : 'Olympic Printing FB' }}</strong>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="footer-divider"></div>

        <!-- Bottom Row -->
        <div class="footer-bottom">
          <p class="copyright">{{ lang.t('footer.rights') }}</p>
          <div class="social-pills">
            <a [href]="data.developerInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="social-pill" title="WhatsApp">
              <i class="bi bi-whatsapp"></i>
            </a>
            <a [href]="data.developerInfo.facebookUrl" target="_blank" rel="noopener noreferrer" class="social-pill" title="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a [href]="data.developerInfo.tiktokUrl" target="_blank" rel="noopener noreferrer" class="social-pill" title="TikTok">
              <i class="bi bi-tiktok"></i>
            </a>
            <a [href]="data.developerInfo.githubUrl" target="_blank" rel="noopener noreferrer" class="social-pill" title="GitHub">
              <i class="bi bi-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .prime-footer {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      padding: 5rem 0 2rem;
      margin-top: 4rem;
      transition: background 0.25s ease, border-color 0.25s ease;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr;
      gap: 3.5rem;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    .footer-brand {
      .brand-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.25rem;

        .avatar-badge {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--gradient-brand);
          color: #ffffff;
          font-weight: 800;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
        }

        .brand-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .brand-subtitle {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 600;
        }
      }

      .brand-desc {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.7;
        margin-bottom: 1.5rem;
        max-width: 450px;
      }

      .status-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.45rem 1rem;
        border-radius: 9999px;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.25);

        .live-pulse {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }

        .status-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: #10b981;
        }
      }
    }

    .col-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
      position: relative;
      padding-bottom: 0.5rem;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        inset-inline-start: 0;
        width: 35px;
        height: 2px;
        background: var(--accent-primary);
        border-radius: 2px;
      }
    }

    .footer-links-col ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      a {
        color: var(--text-secondary);
        font-weight: 600;
        font-size: 0.92rem;
        transition: color 0.2s ease, transform 0.2s ease;
        display: inline-block;

        &:hover {
          color: var(--accent-primary);
          transform: translateX(4px);
        }
      }
    }

    .contact-items {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;

      .contact-item {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.85rem 1rem;
        border-radius: 12px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        transition: all 0.2s ease;

        i {
          font-size: 1.4rem;
          color: var(--accent-primary);
        }

        small {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        strong {
          display: block;
          font-size: 0.92rem;
          color: var(--text-primary);
          direction: ltr;
        }

        &:hover {
          border-color: var(--border-highlight);
          transform: translateY(-2px);
          background: var(--bg-card-hover);
        }

        &.highlight-partner {
          border-color: rgba(6, 182, 212, 0.3);
          background: rgba(6, 182, 212, 0.05);

          i {
            color: var(--accent-cyan);
          }

          &:hover {
            border-color: var(--accent-cyan);
          }
        }
      }
    }

    .footer-divider {
      height: 1px;
      background: var(--border-color);
      margin: 3.5rem 0 2rem;
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;

      .copyright {
        font-size: 0.9rem;
        color: var(--text-muted);
      }

      .social-pills {
        display: flex;
        gap: 0.65rem;

        .social-pill {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 1.1rem;
          transition: all 0.2s ease;

          &:hover {
            color: var(--accent-primary);
            border-color: var(--accent-primary);
            transform: translateY(-3px);
            background: rgba(59, 130, 246, 0.1);
          }
        }
      }
    }
  `]
})
export class FooterComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);
}
