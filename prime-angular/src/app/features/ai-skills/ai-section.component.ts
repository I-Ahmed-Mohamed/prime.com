import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-ai-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="ai" class="prime-section ai-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge ai-badge-glow">
            <i class="bi bi-robot"></i>
            {{ lang.t('ai.badge') }}
          </span>
          <h2 class="section-title">
            <span>{{ lang.t('ai.title') }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.t('ai.desc') }}
          </p>

          <!-- Interactive AI Pillar Tabs -->
          <div class="ai-tabs-row">
            <button 
              type="button" 
              *ngFor="let pillar of data.aiSkillPillars" 
              class="ai-tab-btn" 
              [class.active]="selectedPillarId() === pillar.id" 
              (click)="selectPillar(pillar.id)">
              <i class="bi" [ngClass]="pillar.icon"></i>
              <span>{{ lang.isRtl() ? pillar.categoryAr : pillar.category }}</span>
            </button>
          </div>
        </div>

        <!-- Selected Pillar Showcase -->
        <div class="pillar-showcase-panel prime-card" *ngIf="getActivePillar() as active">
          
          <div class="panel-header">
            <div class="panel-icon-wrap">
              <i class="bi" [ngClass]="active.icon"></i>
            </div>
            <div>
              <div class="panel-badge">{{ lang.isRtl() ? active.badgeAr : active.badge }}</div>
              <h3 class="panel-title">{{ lang.isRtl() ? active.categoryAr : active.category }}</h3>
              <p class="panel-summary">{{ lang.isRtl() ? active.summaryAr : active.summary }}</p>
            </div>
          </div>

          <!-- Technologies Grid inside Pillar -->
          <div class="technologies-grid">
            <div *ngFor="let tech of active.technologies" class="tech-item-card prime-card" [class.highlighted-tech]="tech.highlight">
              
              <div class="tech-card-top">
                <div class="tech-name-box">
                  <span class="tech-indicator"></span>
                  <h4 class="tech-name">{{ tech.name }}</h4>
                </div>
                <span class="tech-tag-badge">{{ tech.tag }}</span>
              </div>

              <div class="tech-use-case">
                <i class="bi bi-gear-fill"></i>
                <span>{{ lang.isRtl() ? tech.useCaseAr : tech.useCaseEn }}</span>
              </div>

              <!-- Proficiency Bar -->
              <div class="tech-bar-wrap">
                <div class="bar-labels">
                  <span class="exp-label">{{ tech.experience }}</span>
                  <span class="pct-label font-mono">{{ tech.proficiency }}%</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" [style.width.%]="tech.proficiency"></div>
                </div>
              </div>

            </div>
          </div>

          <!-- Enterprise RAG & Multi-Agent Architecture Pipeline Diagram -->
          <div class="pipeline-visual-box" *ngIf="active.id === 'rag-vector' || active.id === 'llm-foundation'">
            <div class="pipeline-title font-mono">
              <i class="bi bi-diagram-3-fill"></i>
              {{ lang.isRtl() ? 'المسار المعماري لتدفق بيانات الذكاء الاصطناعي (AI Data Pipeline)' : 'Enterprise AI Architecture & RAG Pipeline' }}
            </div>
            <div class="pipeline-steps">
              <div class="pipeline-step">
                <span class="step-num">01</span>
                <strong>{{ lang.isRtl() ? 'استقبال المستندات' : 'Ingestion' }}</strong>
                <small>{{ lang.isRtl() ? 'PDF, Docs, ERP SQL Data' : 'PDF, DB, Unstructured' }}</small>
              </div>
              <i class="bi" [ngClass]="lang.isRtl() ? 'bi-arrow-left-circle-fill' : 'bi-arrow-right-circle-fill'"></i>
              <div class="pipeline-step">
                <span class="step-num">02</span>
                <strong>{{ lang.isRtl() ? 'التجزئة والتضمين' : 'Chunk & Embed' }}</strong>
                <small>{{ lang.isRtl() ? 'OpenAI / Cohere Vectors' : 'Dense Vector Embeddings' }}</small>
              </div>
              <i class="bi" [ngClass]="lang.isRtl() ? 'bi-arrow-left-circle-fill' : 'bi-arrow-right-circle-fill'"></i>
              <div class="pipeline-step">
                <span class="step-num">03</span>
                <strong>{{ lang.isRtl() ? 'البحث الهجين HNSW' : 'pgvector Index' }}</strong>
                <small>{{ lang.isRtl() ? 'Qdrant & Postgres' : 'Cosine / BM25 Search' }}</small>
              </div>
              <i class="bi" [ngClass]="lang.isRtl() ? 'bi-arrow-left-circle-fill' : 'bi-arrow-right-circle-fill'"></i>
              <div class="pipeline-step highlight-step">
                <span class="step-num">04</span>
                <strong>{{ lang.isRtl() ? 'الاستنتاج الذكي' : '.NET Orchestrator' }}</strong>
                <small>{{ lang.isRtl() ? 'Semantic Kernel + GPT-4o' : 'Zero Hallucinations' }}</small>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .ai-section {
      background: radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 70%), var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .ai-badge-glow {
      background: rgba(6, 182, 212, 0.14) !important;
      color: var(--accent-cyan) !important;
      border-color: rgba(6, 182, 212, 0.35) !important;
      box-shadow: 0 0 15px rgba(6, 182, 212, 0.25);
    }

    .ai-tabs-row {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 2rem;

      .ai-tab-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.65rem 1.35rem;
        border-radius: 9999px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        font-weight: 700;
        font-size: 0.9rem;
        transition: all 0.22s ease;

        i {
          font-size: 1.05rem;
          color: var(--accent-cyan);
        }

        &:hover {
          border-color: var(--accent-cyan);
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        &.active {
          background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.4);

          i {
            color: #ffffff;
          }
        }
      }
    }

    .pillar-showcase-panel {
      padding: 2.75rem 2.25rem;
      border-color: rgba(6, 182, 212, 0.3);

      .panel-header {
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
        margin-bottom: 2.5rem;
        padding-bottom: 1.75rem;
        border-bottom: 1px solid var(--border-color);

        @media (max-width: 680px) {
          flex-direction: column;
        }

        .panel-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(6, 182, 212, 0.15);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          border: 1px solid rgba(6, 182, 212, 0.35);
          flex-shrink: 0;
        }

        .panel-badge {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--accent-emerald);
          background: rgba(16, 185, 129, 0.1);
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
          border: 1px solid rgba(16, 185, 129, 0.25);
          margin-bottom: 0.45rem;
        }

        .panel-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .panel-summary {
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.65;
          max-width: 850px;
        }
      }
    }

    .technologies-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-bottom: 2.5rem;

      @media (max-width: 860px) {
        grid-template-columns: 1fr;
      }
    }

    .tech-item-card {
      padding: 1.5rem;
      background: var(--bg-tertiary);
      border-radius: 16px;

      &.highlighted-tech {
        border-color: rgba(6, 182, 212, 0.4);
        background: rgba(6, 182, 212, 0.04);
      }

      .tech-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.75rem;

        .tech-name-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .tech-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--accent-cyan);
            box-shadow: 0 0 8px var(--accent-cyan);
          }

          .tech-name {
            font-size: 1.05rem;
            font-weight: 800;
            color: var(--text-primary);
          }
        }

        .tech-tag-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          background: rgba(59, 130, 246, 0.12);
          color: var(--accent-primary);
          border: 1px solid rgba(59, 130, 246, 0.25);
        }
      }

      .tech-use-case {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.15rem;

        i {
          color: var(--accent-cyan);
          font-size: 0.95rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
      }

      .tech-bar-wrap {
        .bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          margin-bottom: 0.35rem;

          .exp-label {
            color: var(--text-muted);
          }

          .pct-label {
            color: var(--accent-cyan);
            font-weight: 800;
          }
        }

        .progress-bar-track {
          height: 6px;
          border-radius: 9999px;
          background: var(--bg-card);
          overflow: hidden;

          .progress-bar-fill {
            height: 100%;
            border-radius: 9999px;
            background: linear-gradient(90deg, #0284c7 0%, #2563eb 100%);
          }
        }
      }
    }

    .pipeline-visual-box {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.5rem 1.75rem;

      .pipeline-title {
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--accent-cyan);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.25rem;
      }

      .pipeline-steps {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;

        i {
          color: var(--accent-cyan);
          font-size: 1.25rem;

          @media (max-width: 768px) {
            display: none;
          }
        }

        .pipeline-step {
          flex: 1;
          min-width: 140px;
          padding: 1rem;
          border-radius: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          .step-num {
            font-size: 0.72rem;
            color: var(--accent-primary);
            font-weight: 800;
          }

          strong {
            font-size: 0.9rem;
            color: var(--text-primary);
          }

          small {
            font-size: 0.75rem;
            color: var(--text-muted);
          }

          &.highlight-step {
            border-color: var(--accent-cyan);
            background: rgba(6, 182, 212, 0.08);

            strong {
              color: var(--accent-cyan);
            }
          }
        }
      }
    }
  `]
})
export class AiSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);

  readonly selectedPillarId = signal<string>('llm-foundation');

  selectPillar(id: string): void {
    this.selectedPillarId.set(id);
  }

  getActivePillar() {
    return this.data.aiSkillPillars.find(p => p.id === this.selectedPillarId()) || this.data.aiSkillPillars[0];
  }
}
