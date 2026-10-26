import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { AiChatService } from '../../core/services/ai-chat.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header id="home" class="hero-section">
      <div class="prime-container hero-container">
        
        <!-- Live Status Badge -->
        <div class="hero-badge-wrap">
          <span class="prime-badge prime-badge-blue hero-badge">
            <span class="badge-dot"></span>
            {{ lang.t('hero.badge') }}
          </span>
        </div>

        <!-- Main Title -->
        <h1 class="hero-title">
          <span>{{ lang.t('hero.title_pre') }}</span>
          <span class="gradient-text hero-highlight">{{ lang.t('hero.title_highlight') }}</span>
        </h1>

        <!-- Subtitle -->
        <p class="hero-subtitle">
          {{ lang.t('hero.subtitle') }}
        </p>

        <!-- Interactive AI Copilot Prompt Bar directly in Hero -->
        <div class="hero-copilot-box prime-card">
          <div class="copilot-input-row">
            <div class="copilot-icon">
              <i class="bi bi-robot"></i>
            </div>
            <input 
              type="text" 
              [(ngModel)]="heroPrompt" 
              (keyup.enter)="askCopilot()"
              [placeholder]="lang.t('copilot.input_placeholder')" 
              class="hero-copilot-input" />
            <button type="button" class="prime-btn prime-btn-primary prime-btn-sm" (click)="askCopilot()">
              <i class="bi bi-stars"></i>
              <span>{{ lang.t('copilot.send_btn') }}</span>
            </button>
          </div>

          <!-- Quick Suggestion Chips -->
          <div class="hero-chips">
            <button type="button" class="hero-chip" (click)="selectChip(lang.t('copilot.chip_1'))">
              <i class="bi bi-check-circle"></i>
              <span>{{ lang.t('copilot.chip_1') }}</span>
            </button>
            <button type="button" class="hero-chip" (click)="selectChip(lang.t('copilot.chip_2'))">
              <i class="bi bi-cpu"></i>
              <span>{{ lang.t('copilot.chip_2') }}</span>
            </button>
            <button type="button" class="hero-chip" (click)="selectChip(lang.t('copilot.chip_3'))">
              <i class="bi bi-credit-card"></i>
              <span>{{ lang.t('copilot.chip_3') }}</span>
            </button>
            <button type="button" class="hero-chip" (click)="selectChip(lang.t('copilot.chip_4'))">
              <i class="bi bi-building"></i>
              <span>{{ lang.t('copilot.chip_4') }}</span>
            </button>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="hero-ctas">
          <a href="#projects" class="prime-btn prime-btn-primary prime-btn-lg">
            <i class="bi bi-grid-3x3-gap-fill"></i>
            <span>{{ lang.t('hero.cta_project') }}</span>
          </a>
          <a href="#architecture" class="prime-btn prime-btn-secondary prime-btn-lg">
            <i class="bi bi-diagram-3-fill"></i>
            <span>{{ lang.t('hero.cta_arch') }}</span>
          </a>
          <a [href]="data.developerInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="prime-btn prime-btn-success prime-btn-lg">
            <i class="bi bi-whatsapp"></i>
            <span>{{ lang.t('hero.cta_whatsapp') }}</span>
          </a>
        </div>

        <!-- Technical Badges Strip -->
        <div class="tech-strip">
          <span class="tech-pill"><i class="bi bi-cpu-fill"></i> .NET 9 Core</span>
          <span class="tech-pill"><i class="bi bi-code-slash"></i> C# 13</span>
          <span class="tech-pill"><i class="bi bi-diagram-3"></i> Clean Architecture</span>
          <span class="tech-pill"><i class="bi bi-database-fill"></i> SQL Server</span>
          <span class="tech-pill"><i class="bi bi-layers-fill"></i> Angular 19/22</span>
          <span class="tech-pill"><i class="bi bi-lightning-fill"></i> Angular Signals</span>
          <span class="tech-pill"><i class="bi bi-broadcast"></i> SignalR</span>
          <span class="tech-pill"><i class="bi bi-box-seam"></i> Docker</span>
        </div>

        <!-- Stats Counters Grid -->
        <div class="stats-grid">
          <div class="stat-card prime-card">
            <div class="stat-num gradient-text">{{ data.developerInfo.experienceYears }}</div>
            <div class="stat-label">{{ lang.t('stats.experience') }}</div>
          </div>
          <div class="stat-card prime-card">
            <div class="stat-num gradient-text">{{ data.developerInfo.completedProjects }}</div>
            <div class="stat-label">{{ lang.t('stats.projects') }}</div>
          </div>
          <div class="stat-card prime-card">
            <div class="stat-num gradient-text">{{ data.developerInfo.satisfiedClients }}</div>
            <div class="stat-label">{{ lang.t('stats.clients') }}</div>
          </div>
          <div class="stat-card prime-card">
            <div class="stat-num gradient-text">99.9%</div>
            <div class="stat-label">{{ lang.t('stats.uptime') }}</div>
          </div>
        </div>

      </div>
    </header>
  `,
  styles: [`
    .hero-section {
      padding: 9rem 0 5rem;
      position: relative;
      background: radial-gradient(circle at 50% 15%, rgba(59, 130, 246, 0.12) 0%, transparent 65%);
    }

    .hero-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .hero-badge-wrap {
      margin-bottom: 1.5rem;

      .badge-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #10b981;
        display: inline-block;
        box-shadow: 0 0 8px #10b981;
      }
    }

    .hero-title {
      font-size: clamp(2.3rem, 5.2vw, 3.8rem);
      font-weight: 900;
      line-height: 1.22;
      color: var(--text-primary);
      max-width: 980px;
      margin-bottom: 1.5rem;
      letter-spacing: -0.5px;

      span {
        display: block;
      }

      .hero-highlight {
        display: inline-block;
      }
    }

    .hero-subtitle {
      font-size: clamp(1.05rem, 1.8vw, 1.25rem);
      color: var(--text-secondary);
      max-width: 820px;
      line-height: 1.75;
      margin-bottom: 2.5rem;
    }

    .hero-copilot-box {
      width: 100%;
      max-width: 860px;
      margin-bottom: 2.5rem;
      padding: 1.25rem 1.5rem;
      border-color: var(--border-highlight);
      box-shadow: var(--shadow-md), var(--shadow-glow);
    }

    .copilot-input-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .copilot-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: var(--gradient-brand);
        color: #ffffff;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .hero-copilot-input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-size: 1.05rem;
        font-family: inherit;
        outline: none;

        &::placeholder {
          color: var(--text-muted);
          font-size: 0.95rem;
        }
      }
    }

    .hero-chips {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.6rem;
      padding-top: 0.85rem;
      border-top: 1px solid var(--border-color);

      .hero-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.45rem 0.95rem;
        border-radius: 9999px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        font-size: 0.82rem;
        font-weight: 600;
        transition: all 0.2s ease;

        i {
          color: var(--accent-cyan);
        }

        &:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }
      }
    }

    .hero-ctas {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2.75rem;
    }

    .tech-strip {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 3.5rem;

      .tech-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.4rem 0.95rem;
        border-radius: 8px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.2px;

        i {
          color: var(--accent-primary);
        }
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      width: 100%;
      max-width: 980px;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }

      .stat-card {
        padding: 1.5rem 1rem;
        text-align: center;

        .stat-num {
          font-size: 2.4rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.88rem;
          color: var(--text-muted);
          font-weight: 600;
        }
      }
    }
  `]
})
export class HeroSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);
  readonly ai = inject(AiChatService);

  heroPrompt: string = '';

  askCopilot(): void {
    if (!this.heroPrompt.trim()) return;
    const query = this.heroPrompt;
    this.heroPrompt = '';
    this.ai.openChat();
    this.ai.sendMessage(query);
  }

  selectChip(chipText: string): void {
    this.ai.openChat();
    this.ai.sendMessage(chipText);
  }
}
