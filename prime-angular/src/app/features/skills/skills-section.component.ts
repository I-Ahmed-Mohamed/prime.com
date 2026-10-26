import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="prime-section skills-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-stack"></i>
            {{ lang.t('skills.badge') }}
          </span>
          <h2 class="section-title">
            <span>{{ lang.t('skills.title') }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.t('skills.desc') }}
          </p>
        </div>

        <div class="skills-categories-grid">
          <div *ngFor="let cat of data.skillCategories" class="skill-category-card prime-card">
            
            <div class="cat-header">
              <div class="cat-icon-box">
                <i class="bi" [ngClass]="cat.icon"></i>
              </div>
              <div>
                <h3 class="cat-title">{{ lang.isRtl() ? cat.titleAr : cat.title }}</h3>
                <span class="cat-badge">{{ cat.badge }}</span>
              </div>
            </div>

            <div class="skills-list">
              <div *ngFor="let s of cat.skills" class="skill-item">
                <div class="skill-meta">
                  <div class="skill-name-wrap">
                    <i class="bi" [ngClass]="s.icon"></i>
                    <span class="skill-name">{{ s.name }}</span>
                    <span *ngIf="s.popular" class="popular-star" title="Core Expertise">
                      <i class="bi bi-star-fill"></i>
                    </span>
                  </div>
                  <div class="skill-exp font-mono">{{ s.level }}% ({{ s.experience }})</div>
                </div>

                <div class="progress-bar-track">
                  <div class="progress-bar-fill" [style.width.%]="s.level"></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      background: var(--bg-primary);
    }

    .skills-categories-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 1080px) {
        grid-template-columns: 1fr;
      }
    }

    .skill-category-card {
      padding: 2.25rem 2rem;

      .cat-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid var(--border-color);

        .cat-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: rgba(59, 130, 246, 0.12);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border: 1px solid var(--border-color);
          flex-shrink: 0;
        }

        .cat-title {
          font-size: 1.18rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .cat-badge {
          font-size: 0.75rem;
          color: var(--accent-cyan);
          font-weight: 700;
        }
      }

      .skills-list {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .skill-item {
        .skill-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.45rem;

          .skill-name-wrap {
            display: flex;
            align-items: center;
            gap: 0.45rem;

            i {
              color: var(--accent-primary);
              font-size: 0.95rem;
            }

            .skill-name {
              font-size: 0.9rem;
              font-weight: 700;
              color: var(--text-primary);
            }

            .popular-star {
              color: var(--accent-amber);
              font-size: 0.75rem;
            }
          }

          .skill-exp {
            font-size: 0.78rem;
            color: var(--text-muted);
            direction: ltr;
          }
        }

        .progress-bar-track {
          height: 7px;
          border-radius: 9999px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          overflow: hidden;

          .progress-bar-fill {
            height: 100%;
            background: var(--gradient-brand);
            border-radius: 9999px;
            transition: width 0.6s ease;
          }
        }
      }
    }
  `]
})
export class SkillsSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);
}
