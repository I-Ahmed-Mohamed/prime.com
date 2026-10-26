import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-clients-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="clients" class="prime-section clients-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-star-fill"></i>
            {{ lang.t('clients.badge') }}
          </span>
          <h2 class="section-title">
            <span>{{ lang.t('clients.title') }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.t('clients.desc') }}
          </p>
        </div>

        <!-- Featured Partner: Olympic Printing Agency -->
        <div class="featured-partner-card prime-card">
          <div class="featured-badge">
            <i class="bi bi-award-fill"></i>
            <span>{{ lang.t('clients.olympic_badge') }}</span>
          </div>

          <div class="featured-inner">
            <div class="partner-logo-box">
              <img src="assets/img/olympic/3.jpg" alt="Olympic Printing Agency" class="partner-logo" />
            </div>

            <div class="partner-details">
              <h3 class="partner-title">{{ lang.t('clients.olympic_name') }}</h3>
              <p class="partner-category">{{ lang.isRtl() ? 'قطاع الطباعة الرقمية والتجارية والتغليف' : 'Commercial Printing & Packaging Enterprise' }}</p>
              
              <p class="partner-desc">
                {{ lang.t('clients.olympic_desc') }}
              </p>

              <!-- Deliverables list -->
              <div class="deliverables-grid">
                <div class="d-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>{{ lang.isRtl() ? 'نظام ERP سحابي لمتابعة أوامر ومراحل الطباعة' : 'Custom Cloud Print Operations ERP' }}</span>
                </div>
                <div class="d-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>{{ lang.isRtl() ? 'مراقبة هادر الخامات وإدارة المخازن' : 'Materials & Inventory Management' }}</span>
                </div>
                <div class="d-item">
                  <i class="bi bi-check2-circle"></i>
                  <span>{{ lang.isRtl() ? 'ربط التسويق الرقمي وبوابات التواصل' : 'Digital Campaigns & Facebook Integration' }}</span>
                </div>
              </div>

              <!-- Facebook Official Link -->
              <div class="partner-cta-row">
                <a href="https://www.facebook.com/share/1dEwTVm8rG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="prime-btn prime-btn-primary">
                  <i class="bi bi-facebook"></i>
                  <span>{{ lang.t('clients.olympic_fb') }}</span>
                </a>
                <a [href]="data.developerInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="prime-btn prime-btn-outline">
                  <i class="bi bi-briefcase"></i>
                  <span>{{ lang.isRtl() ? 'طلب نظام مماثل لشركتك' : 'Request Similar System' }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Client Partners Grid (Oval, Al-Sharq) -->
        <div class="partners-grid">
          <div *ngFor="let client of getOtherClients()" class="partner-card prime-card">
            <div class="card-top">
              <div class="logo-circle">
                <img [src]="client.logo" [alt]="client.name" class="c-logo" />
              </div>
              <span class="client-badge">{{ client.badge }}</span>
            </div>

            <h4 class="c-name">{{ lang.isRtl() ? client.nameAr : client.name }}</h4>
            <p class="c-cat">{{ lang.isRtl() ? client.categoryAr : client.category }}</p>
            <p class="c-desc">{{ lang.isRtl() ? client.descriptionAr : client.description }}</p>

            <div class="c-deliverables">
              <span *ngFor="let d of (lang.isRtl() ? client.deliverablesAr : client.deliverables)" class="d-pill">
                <i class="bi bi-check-lg"></i> {{ d }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .clients-section {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .featured-partner-card {
      padding: 2.5rem;
      margin-bottom: 3rem;
      border-color: var(--accent-cyan);
      box-shadow: 0 10px 35px rgba(6, 182, 212, 0.15);
      position: relative;

      .featured-badge {
        position: absolute;
        top: 1.5rem;
        inset-inline-end: 1.5rem;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.35rem 0.85rem;
        border-radius: 9999px;
        background: rgba(6, 182, 212, 0.15);
        color: var(--accent-cyan);
        border: 1px solid rgba(6, 182, 212, 0.35);
        font-size: 0.82rem;
        font-weight: 800;
      }
    }

    .featured-inner {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 2.5rem;
      align-items: center;

      @media (max-width: 860px) {
        grid-template-columns: 1fr;
      }

      .partner-logo-box {
        width: 100%;
        height: 200px;
        border-radius: 16px;
        overflow: hidden;
        border: 2px solid var(--border-color);
        background: var(--bg-tertiary);

        .partner-logo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .partner-details {
        .partner-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .partner-category {
          font-size: 0.88rem;
          color: var(--accent-cyan);
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .partner-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.75rem;

          @media (max-width: 600px) {
            grid-template-columns: 1fr;
          }

          .d-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.88rem;
            color: var(--text-primary);
            font-weight: 600;

            i {
              color: var(--accent-emerald);
              font-size: 1.1rem;
            }
          }
        }

        .partner-cta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
      }
    }

    .partners-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.75rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .partner-card {
      .card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;

        .logo-circle {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background: var(--bg-tertiary);

          .c-logo {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .client-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-primary);
          background: rgba(59, 130, 246, 0.1);
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          border: 1px solid rgba(59, 130, 246, 0.25);
        }
      }

      .c-name {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
      }

      .c-cat {
        font-size: 0.82rem;
        color: var(--accent-cyan);
        font-weight: 600;
        margin-bottom: 0.85rem;
      }

      .c-desc {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.65;
        margin-bottom: 1.25rem;
      }

      .c-deliverables {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        .d-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          border: 1px solid var(--border-subtle);

          i {
            color: var(--accent-emerald);
          }
        }
      }
    }
  `]
})
export class ClientsSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);

  getOtherClients() {
    return this.data.clients.filter(c => c.id !== 'olympic');
  }
}
