import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="prime-section services-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-gear-wide-connected"></i>
            {{ lang.isRtl() ? 'الخدمات والحلول الرقمية' : 'Services & Solutions' }}
          </span>
          <h2 class="section-title">
            {{ lang.isRtl() ? 'حلول برمجية متطورة' : 'Next-Generation Software' }}
            <span class="gradient-text">{{ lang.isRtl() ? 'مصممة للنمو السريع' : 'Engineered for Scale' }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.isRtl() 
              ? 'نغطي دورة حياة المنتج البرمجي كاملة من دراسة المتطلبات وتصميم قواعد البيانات وحتى إطلاق السيرفرات والتسليم.' 
              : 'Delivering end-to-end engineering from architectural planning and high-throughput databases to deployment and maintenance.' }}
          </p>
        </div>

        <div class="services-grid">
          <div *ngFor="let s of data.services" class="service-card prime-card">
            <div class="service-icon-box">
              <i class="bi" [ngClass]="s.icon"></i>
            </div>

            <h3 class="service-title">{{ lang.isRtl() ? s.titleAr : s.title }}</h3>
            <p class="service-desc">{{ lang.isRtl() ? s.descriptionAr : s.description }}</p>

            <!-- Feature bullets -->
            <ul class="feature-bullets">
              <li *ngFor="let f of (lang.isRtl() ? s.featuresAr : s.features)">
                <i class="bi bi-arrow-left-circle-fill" *ngIf="lang.isRtl()"></i>
                <i class="bi bi-arrow-right-circle-fill" *ngIf="!lang.isRtl()"></i>
                <span>{{ f }}</span>
              </li>
            </ul>

            <!-- Tech stack chips -->
            <div class="service-stack">
              <span *ngFor="let tech of s.techStack" class="tech-tag">{{ tech }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .services-section {
      background: var(--bg-primary);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .service-card {
      display: flex;
      flex-direction: column;
      padding: 2.25rem;

      .service-icon-box {
        width: 58px;
        height: 58px;
        border-radius: 16px;
        background: var(--gradient-brand);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
      }

      .service-title {
        font-size: 1.35rem;
        font-weight: 800;
        color: var(--text-primary);
        line-height: 1.3;
        margin-bottom: 0.75rem;
      }

      .service-desc {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.7;
        margin-bottom: 1.5rem;
      }

      .feature-bullets {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
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
            color: var(--accent-cyan);
            font-size: 1rem;
            margin-top: 0.2rem;
            flex-shrink: 0;
          }
        }
      }

      .service-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--border-color);

        .tech-tag {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
          border-radius: 8px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
        }
      }
    }
  `]
})
export class ServicesSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);
}
