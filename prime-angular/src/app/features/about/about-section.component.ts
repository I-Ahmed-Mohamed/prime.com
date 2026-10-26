import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="prime-section about-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-person-badge-fill"></i>
            {{ lang.isRtl() ? 'الملف التعريفي والخبرات' : 'Profile & Expertise' }}
          </span>
          <h2 class="section-title">
            {{ lang.isRtl() ? 'شغف بالهندسة المعمارية النظيفة' : 'Engineering Enterprise Architecture' }}
            <span class="gradient-text">{{ lang.isRtl() ? 'والكود الموثوق' : 'With Resilient Code' }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.isRtl() 
              ? 'أكثر من 5 سنوات في تحويل الأفكار المعقدة ومتطلبات الأعمال إلى أنظمة سحابية فائقة السرعة وقابلة للتوسع.' 
              : '5+ years translating high-complexity business logic into high-throughput, maintainable cloud solutions.' }}
          </p>
        </div>

        <div class="about-grid">
          <!-- Col 1: Clean Profile Image (STATIC, NO BOUNCY ANIMATION) -->
          <div class="profile-card prime-card">
            <div class="profile-img-frame">
              <img [src]="data.developerInfo.profileImg" alt="Engineer Ahmed Mohamed" class="profile-img" />
            </div>

            <div class="profile-meta">
              <h3 class="meta-name">{{ lang.isRtl() ? data.developerInfo.name : data.developerInfo.nameEn }}</h3>
              <p class="meta-title">{{ lang.isRtl() ? data.developerInfo.title : data.developerInfo.titleEn }}</p>
              
              <div class="meta-badges">
                <span class="prime-badge prime-badge-blue">
                  <i class="bi bi-patch-check-fill"></i> .NET 9 & C#
                </span>
                <span class="prime-badge prime-badge-cyan">
                  <i class="bi bi-shield-check"></i> Clean Architecture
                </span>
                <span class="prime-badge prime-badge-purple">
                  <i class="bi bi-layers-fill"></i> Angular 19/22
                </span>
              </div>

              <!-- CV Download Button -->
              <div class="cv-actions">
                <a [href]="data.developerInfo.cvPath" target="_blank" class="prime-btn prime-btn-primary" style="width: 100%;">
                  <i class="bi bi-file-earmark-pdf-fill"></i>
                  <span>{{ lang.isRtl() ? 'تحميل السيرة الذاتية (CV)' : 'Download Official CV' }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Col 2: Engineering Philosophy & Capabilities -->
          <div class="about-content">
            <div class="content-block prime-card">
              <div class="block-header">
                <div class="block-icon">
                  <i class="bi bi-shield-lock-fill"></i>
                </div>
                <div>
                  <h4 class="block-title">{{ lang.isRtl() ? 'فلسفة التطوير وهندسة النظم' : 'Architectural Philosophy' }}</h4>
                  <p class="block-subtitle">{{ lang.isRtl() ? 'معايير مؤسسية راسخة' : 'Solid Enterprise Standards' }}</p>
                </div>
              </div>
              <p class="block-text">
                {{ lang.isRtl() 
                  ? 'أؤمن بأن كتابة الكود ليست مجرد تشغيل وظيفة، بل هي بناء أساس متين ومستدام. أعتمد مبادئ SOLID و Clean Architecture و Domain-Driven Design لضمان أن كل مشروع يمكن صيانته وتوسعته بسلاسة دون إعادة كتابة أو انهيار في الأداء مع تضاعف عدد المستخدمين.' 
                  : 'I firmly believe that code quality is an investment in durability. Adhering to SOLID principles, Clean Architecture, and Domain-Driven Design ensures your systems scale gracefully under peak concurrency.' }}
              </p>
            </div>

            <div class="content-block prime-card">
              <div class="block-header">
                <div class="block-icon">
                  <i class="bi bi-lightning-charge-fill"></i>
                </div>
                <div>
                  <h4 class="block-title">{{ lang.isRtl() ? 'التكامل السلس بين الباك إند والفرونت إند' : 'Unified Full-Stack Synergy' }}</h4>
                  <p class="block-subtitle">{{ lang.isRtl() ? 'دقة متناهية من قاعدة البيانات للشاشة' : 'Precision from DB to Client' }}</p>
                </div>
              </div>
              <p class="block-text">
                {{ lang.isRtl()
                  ? 'الجمع بين عمق الـ .NET Core وقوة لغة C# في معالجة العمليات، مع خفة وسرعة Angular في الواجهات التفاعلية، يمنح العميل تجربة استخدام خالية تماماً من البطء أو التأخير مع أقصى درجات الأمان وحماية البيانات.'
                  : 'Harmonizing deep C# / ASP.NET Core backend processing with high-speed Angular reactive interfaces delivers zero-latency user experiences backed by enterprise-grade cryptographic security.' }}
              </p>
            </div>

            <!-- Highlights Checklist -->
            <div class="about-highlights-grid">
              <div class="highlight-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>{{ lang.isRtl() ? 'تصميم قواعد بيانات SQL Server محسنة للاستعلامات الضخمة' : 'High-Performance SQL Server Database Indexing' }}</span>
              </div>
              <div class="highlight-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>{{ lang.isRtl() ? 'أنظمة صلاحيات دقيقة Role-Based Access Control (RBAC)' : 'Granular Role-Based Access Control & Security' }}</span>
              </div>
              <div class="highlight-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>{{ lang.isRtl() ? 'ربط آلي مع بوابات الدفع والمحافظ الإلكترونية' : 'Seamless Payment Gateway & Wallet Integrations' }}</span>
              </div>
              <div class="highlight-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>{{ lang.isRtl() ? 'دعم فني والتزام صارم بمواعيد التسليم والجودة' : 'Strict Delivery Deadlines & Dedicated Post-Launch Support' }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .about-section {
      background: var(--bg-primary);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 2.5rem;
      align-items: start;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
      }
    }

    .profile-card {
      text-align: center;
      padding: 2.25rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .profile-img-frame {
        width: 190px;
        height: 190px;
        border-radius: 24px;
        overflow: hidden;
        margin-bottom: 1.5rem;
        border: 3px solid var(--border-color);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        background: var(--bg-secondary);

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }

      .meta-name {
        font-size: 1.45rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 0.35rem;
      }

      .meta-title {
        font-size: 0.88rem;
        color: var(--accent-primary);
        font-weight: 700;
        margin-bottom: 1.25rem;
      }

      .meta-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
        margin-bottom: 1.75rem;
      }

      .cv-actions {
        width: 100%;
      }
    }

    .about-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .content-block {
        .block-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;

          .block-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(59, 130, 246, 0.12);
            color: var(--accent-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.35rem;
            border: 1px solid var(--border-color);
            flex-shrink: 0;
          }

          .block-title {
            font-size: 1.2rem;
            font-weight: 800;
            color: var(--text-primary);
            line-height: 1.25;
          }

          .block-subtitle {
            font-size: 0.82rem;
            color: var(--text-muted);
            font-weight: 600;
          }
        }

        .block-text {
          color: var(--text-secondary);
          font-size: 0.98rem;
          line-height: 1.8;
        }
      }

      .about-highlights-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-radius: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);

          i {
            color: var(--accent-emerald);
            font-size: 1.2rem;
            flex-shrink: 0;
          }

          span {
            font-size: 0.88rem;
            font-weight: 700;
            color: var(--text-primary);
          }
        }
      }
    }
  `]
})
export class AboutSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);
}
