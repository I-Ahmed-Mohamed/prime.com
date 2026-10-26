import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="prime-section projects-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-briefcase-fill"></i>
            {{ lang.t('projects.badge') }}
          </span>
          <h2 class="section-title">
            <span>{{ lang.t('projects.title') }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.t('projects.desc') }}
          </p>

          <!-- Category Filters -->
          <div class="filter-pills">
            <button 
              type="button" 
              class="filter-pill" 
              [class.active]="activeFilter() === 'all'" 
              (click)="setFilter('all')">
              {{ lang.t('projects.filter_all') }}
            </button>
            <button 
              type="button" 
              class="filter-pill" 
              [class.active]="activeFilter() === 'fullstack'" 
              (click)="setFilter('fullstack')">
              {{ lang.t('projects.filter_fullstack') }}
            </button>
            <button 
              type="button" 
              class="filter-pill" 
              [class.active]="activeFilter() === 'backend'" 
              (click)="setFilter('backend')">
              {{ lang.t('projects.filter_backend') }}
            </button>
            <button 
              type="button" 
              class="filter-pill" 
              [class.active]="activeFilter() === 'angular'" 
              (click)="setFilter('angular')">
              {{ lang.t('projects.filter_angular') }}
            </button>
            <button 
              type="button" 
              class="filter-pill" 
              [class.active]="activeFilter() === 'enterprise'" 
              (click)="setFilter('enterprise')">
              {{ lang.t('projects.filter_enterprise') }}
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <div *ngFor="let proj of filteredProjects()" class="project-card prime-card">
            
            <!-- Image Frame -->
            <div class="project-img-frame">
              <img [src]="proj.image" [alt]="lang.isRtl() ? proj.titleAr : proj.title" class="project-img" loading="lazy" />
              <div class="project-overlay">
                <span class="overlay-badge">{{ lang.isRtl() ? (proj.clientAr || 'نظام معتمد') : (proj.client || 'Verified System') }}</span>
              </div>
            </div>

            <!-- Body -->
            <div class="project-body">
              <div class="category-tag">{{ proj.category }}</div>
              <h3 class="project-title">{{ lang.isRtl() ? proj.titleAr : proj.title }}</h3>
              <p class="project-subtitle">{{ lang.isRtl() ? proj.subtitleAr : proj.subtitle }}</p>
              
              <p class="project-desc">{{ lang.isRtl() ? proj.descriptionAr : proj.description }}</p>

              <!-- Metrics if any -->
              <div *ngIf="proj.metrics && proj.metrics.length > 0" class="project-metrics">
                <div *ngFor="let m of proj.metrics" class="metric-box">
                  <span class="metric-val">{{ m.value }}</span>
                  <span class="metric-lbl">{{ lang.isRtl() ? m.labelAr : m.label }}</span>
                </div>
              </div>

              <!-- Tech Badges -->
              <div class="project-tags">
                <span *ngFor="let tag of proj.tags" class="tag-pill">{{ tag }}</span>
              </div>

              <!-- Actions -->
              <div class="project-actions">
                <a *ngIf="proj.demoUrl" [href]="proj.demoUrl" target="_blank" rel="noopener noreferrer" class="prime-btn prime-btn-primary prime-btn-sm">
                  <i class="bi bi-box-arrow-up-right"></i>
                  <span>{{ lang.t('projects.view_demo') }}</span>
                </a>
                <a [href]="data.developerInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="prime-btn prime-btn-secondary prime-btn-sm">
                  <i class="bi bi-chat-dots-fill"></i>
                  <span>{{ lang.isRtl() ? 'طلب نظام مماثل' : 'Request Similar' }}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      background: var(--bg-primary);
    }

    .filter-pills {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.65rem;
      margin-top: 1.75rem;

      .filter-pill {
        padding: 0.55rem 1.25rem;
        border-radius: 9999px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        font-weight: 700;
        font-size: 0.88rem;
        transition: all 0.2s ease;

        &:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        &.active {
          background: var(--gradient-brand);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
        }
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 680px) {
        grid-template-columns: 1fr;
      }
    }

    .project-card {
      padding: 0;
      display: flex;
      flex-direction: column;
      border-radius: 20px;

      .project-img-frame {
        position: relative;
        height: 210px;
        overflow: hidden;
        background: var(--bg-secondary);

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .project-overlay {
          position: absolute;
          top: 1rem;
          inset-inline-start: 1rem;

          .overlay-badge {
            background: rgba(6, 9, 17, 0.75);
            backdrop-filter: blur(8px);
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.35rem 0.75rem;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
        }
      }

      &:hover .project-img {
        transform: scale(1.04);
      }

      .project-body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex: 1;

        .category-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.4rem;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 0.35rem;
        }

        .project-subtitle {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 600;
          margin-bottom: 0.85rem;
        }

        .project-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .project-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          background: var(--bg-tertiary);
          padding: 0.75rem;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-color);

          .metric-box {
            text-align: center;

            .metric-val {
              display: block;
              font-weight: 800;
              font-size: 1.05rem;
              color: var(--accent-cyan);
            }

            .metric-lbl {
              font-size: 0.7rem;
              color: var(--text-muted);
            }
          }
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 1.5rem;

          .tag-pill {
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.25rem 0.6rem;
            border-radius: 6px;
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            border: 1px solid var(--border-subtle);
          }
        }

        .project-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
      }
    }
  `]
})
export class ProjectsSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);

  readonly activeFilter = signal<'all' | 'fullstack' | 'backend' | 'angular' | 'enterprise'>('all');

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.data.projects;
    }
    return this.data.projects.filter(p => p.category === filter);
  });

  setFilter(filter: 'all' | 'fullstack' | 'backend' | 'angular' | 'enterprise'): void {
    this.activeFilter.set(filter);
  }
}
