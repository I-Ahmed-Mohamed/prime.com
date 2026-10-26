import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="pricing" class="prime-section pricing-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-wallet2"></i>
            {{ lang.t('pricing.badge') }}
          </span>
          <h2 class="section-title">
            <span>{{ lang.t('pricing.title') }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.t('pricing.desc') }}
          </p>
        </div>

        <!-- 3 World-Class Pricing Tiers -->
        <div class="pricing-grid">
          <div 
            *ngFor="let tier of data.pricingTiers" 
            class="pricing-card prime-card" 
            [class.popular-card]="tier.popular">
            
            <div *ngIf="tier.popular" class="popular-ribbon">
              <i class="bi bi-fire"></i>
              <span>{{ lang.isRtl() ? tier.badgeAr : tier.badge }}</span>
            </div>

            <div class="tier-header">
              <span class="tier-badge" *ngIf="!tier.popular">{{ lang.isRtl() ? tier.badgeAr : tier.badge }}</span>
              <h3 class="tier-name">{{ lang.isRtl() ? tier.nameAr : tier.name }}</h3>
              <p class="tier-desc">{{ lang.isRtl() ? tier.descriptionAr : tier.description }}</p>

              <!-- Price Box -->
              <div class="price-box">
                <span class="price-val">{{ tier.priceEgp }}</span>
                <span class="price-curr">{{ lang.t('pricing.currency') }}</span>
                <span class="price-usd">({{ tier.priceUsd }} USD)</span>
              </div>

              <div class="delivery-badge">
                <i class="bi bi-clock-history"></i>
                <span>{{ lang.isRtl() ? 'مدة التنفيذ والتسليم:' : 'Delivery:' }} {{ lang.isRtl() ? tier.deliveryTimeAr : tier.deliveryTime }}</span>
              </div>
            </div>

            <div class="tier-divider"></div>

            <!-- Features list -->
            <ul class="tier-features">
              <li *ngFor="let feat of (lang.isRtl() ? tier.featuresAr : tier.features)">
                <i class="bi bi-check-circle-fill"></i>
                <span>{{ feat }}</span>
              </li>
            </ul>

            <!-- Order Action Button -->
            <div class="tier-action">
              <a 
                [href]="getTierWhatsappUrl(tier.whatsappMessage)" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="prime-btn" 
                [ngClass]="tier.popular ? 'prime-btn-primary prime-btn-lg' : 'prime-btn-secondary prime-btn-lg'"
                style="width: 100%;">
                <i class="bi bi-whatsapp"></i>
                <span>{{ lang.isRtl() ? tier.actionTextAr : tier.actionText }}</span>
              </a>
            </div>

          </div>
        </div>

        <!-- Verified Payment Channels Engine -->
        <div class="payment-channels-wrapper">
          <div class="payment-channels-header">
            <div class="header-icon">
              <i class="bi bi-shield-check"></i>
            </div>
            <div>
              <h3 class="channels-title">{{ lang.t('pricing.payment_methods_title') }}</h3>
              <p class="channels-subtitle">{{ lang.t('pricing.payment_methods_desc') }}</p>
            </div>
          </div>

          <div class="channels-grid">
            <div *ngFor="let ch of data.paymentChannels" class="channel-card prime-card">
              <div class="channel-top">
                <div class="channel-icon" [style.background-color]="ch.accentColor + '20'" [style.color]="ch.accentColor">
                  <i class="bi" [ngClass]="ch.icon"></i>
                </div>
                <span class="channel-badge" [style.border-color]="ch.accentColor + '40'" [style.color]="ch.accentColor">
                  {{ lang.isRtl() ? ch.badgeAr : ch.badge }}
                </span>
              </div>

              <h4 class="channel-title">{{ lang.isRtl() ? ch.titleAr : ch.title }}</h4>
              <p class="channel-subtitle">{{ lang.isRtl() ? ch.subtitleAr : ch.subtitle }}</p>

              <!-- Account number / phone with 1-click copy -->
              <div *ngIf="ch.accountNumber" class="channel-copy-box">
                <div class="number-display">
                  <span class="number-label">{{ lang.isRtl() ? 'الرقم المعتمد:' : 'Number:' }}</span>
                  <strong class="number-val font-mono">{{ ch.accountNumber }}</strong>
                </div>
                <button 
                  type="button" 
                  class="copy-btn" 
                  (click)="copyToClipboard(ch.id, ch.accountNumber)"
                  [title]="lang.t('pricing.copy')">
                  <i class="bi" [ngClass]="copiedId() === ch.id ? 'bi-check2' : 'bi-clipboard'"></i>
                  <span>{{ copiedId() === ch.id ? lang.t('pricing.copied') : lang.t('pricing.copy') }}</span>
                </button>
              </div>

              <!-- Bank details if present -->
              <div *ngIf="ch.bankName" class="bank-details-note">
                <i class="bi bi-bank"></i>
                <span>{{ lang.isRtl() ? ch.bankNameAr : ch.bankName }}</span>
              </div>

              <p class="channel-instructions">
                {{ lang.isRtl() ? ch.instructionsAr : ch.instructions }}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .pricing-section {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 4.5rem;
      align-items: stretch;

      @media (max-width: 1040px) {
        grid-template-columns: 1fr;
        max-width: 580px;
        margin-inline: auto;
      }
    }

    .pricing-card {
      display: flex;
      flex-direction: column;
      padding: 2.25rem 2rem;
      position: relative;

      &.popular-card {
        border-color: var(--accent-primary);
        box-shadow: 0 10px 40px rgba(37, 99, 235, 0.25);
        transform: scale(1.02);

        @media (max-width: 1040px) {
          transform: none;
        }
      }

      .popular-ribbon {
        position: absolute;
        top: 0;
        inset-inline: 0;
        background: var(--gradient-brand);
        color: #ffffff;
        font-size: 0.82rem;
        font-weight: 800;
        padding: 0.4rem 1rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        border-top-left-radius: 19px;
        border-top-right-radius: 19px;
      }

      .tier-header {
        margin-top: 0.5rem;

        .tier-badge {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(6, 182, 212, 0.25);
          margin-bottom: 0.75rem;
        }

        .tier-name {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }

        .tier-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.25rem;
          min-height: 48px;
        }

        .price-box {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
          margin-bottom: 0.85rem;

          .price-val {
            font-size: 2.5rem;
            font-weight: 900;
            color: var(--text-primary);
            line-height: 1;
          }

          .price-curr {
            font-size: 1rem;
            font-weight: 700;
            color: var(--accent-primary);
          }

          .price-usd {
            font-size: 0.85rem;
            color: var(--text-muted);
            font-weight: 600;
          }
        }

        .delivery-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;

          i {
            color: var(--accent-amber);
          }
        }
      }

      .tier-divider {
        height: 1px;
        background: var(--border-color);
        margin: 1.5rem 0;
      }

      .tier-features {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        margin-bottom: 2rem;
        flex: 1;

        li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 600;

          i {
            color: var(--accent-emerald);
            font-size: 1.05rem;
            margin-top: 0.15rem;
            flex-shrink: 0;
          }
        }
      }

      .tier-action {
        margin-top: auto;
      }
    }

    .payment-channels-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2.75rem 2.25rem;

      .payment-channels-header {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        margin-bottom: 2.25rem;

        .header-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(16, 185, 129, 0.12);
          color: var(--accent-emerald);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
          flex-shrink: 0;
        }

        .channels-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .channels-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
      }

      .channels-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.75rem;

        @media (max-width: 860px) {
          grid-template-columns: 1fr;
        }
      }

      .channel-card {
        padding: 1.75rem;
        background: var(--bg-tertiary);

        .channel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;

          .channel-icon {
            width: 46px;
            height: 46px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.35rem;
          }

          .channel-badge {
            font-size: 0.76rem;
            font-weight: 700;
            padding: 0.25rem 0.65rem;
            border-radius: 9999px;
            border: 1px solid;
            background: rgba(255, 255, 255, 0.04);
          }
        }

        .channel-title {
          font-size: 1.18rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .channel-subtitle {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-bottom: 1.15rem;
        }

        .channel-copy-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          margin-bottom: 0.85rem;

          .number-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            display: block;
          }

          .number-val {
            font-size: 1.1rem;
            color: var(--accent-cyan);
            font-weight: 800;
            letter-spacing: 0.5px;
            direction: ltr;
            display: inline-block;
          }

          .copy-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            background: rgba(59, 130, 246, 0.12);
            color: var(--accent-primary);
            font-size: 0.8rem;
            font-weight: 700;
            border: 1px solid rgba(59, 130, 246, 0.25);
            transition: all 0.2s ease;

            &:hover {
              background: var(--accent-primary);
              color: #ffffff;
            }
          }
        }

        .bank-details-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;

          i {
            color: var(--accent-emerald);
          }
        }

        .channel-instructions {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      }
    }
  `]
})
export class PricingSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);

  readonly copiedId = signal<string | null>(null);

  getTierWhatsappUrl(message: string): string {
    return `https://wa.me/201094547599?text=${encodeURIComponent(message)}`;
  }

  copyToClipboard(channelId: string, text: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedId.set(channelId);
        setTimeout(() => {
          this.copiedId.set(null);
        }, 2500);
      }).catch(() => {
        // Fallback
      });
    }
  }
}
