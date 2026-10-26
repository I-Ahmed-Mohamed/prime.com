import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="prime-section contact-section">
      <div class="prime-container">
        
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-chat-heart-fill"></i>
            {{ lang.t('contact.badge') }}
          </span>
          <h2 class="section-title">
            <span>{{ lang.t('contact.title') }}</span>
          </h2>
          <p class="section-desc">
            {{ lang.t('contact.desc') }}
          </p>
        </div>

        <div class="contact-grid">
          
          <!-- Channels Col -->
          <div class="channels-col">
            
            <!-- Phone & WhatsApp Card -->
            <a [href]="data.developerInfo.whatsappUrl" target="_blank" rel="noopener noreferrer" class="contact-channel-card prime-card">
              <div class="channel-icon-box whatsapp-box">
                <i class="bi bi-whatsapp"></i>
              </div>
              <div class="channel-info">
                <span class="channel-label">{{ lang.t('contact.phone_title') }}</span>
                <strong class="channel-val font-mono">{{ data.developerInfo.phoneFormatted }}</strong>
                <span class="channel-sub">{{ lang.isRtl() ? 'متاح للمكالمات والرسائل الفورية 24/7' : 'Available for calls & WhatsApp 24/7' }}</span>
              </div>
            </a>

            <!-- Email Card -->
            <a [href]="'mailto:' + data.developerInfo.email" class="contact-channel-card prime-card">
              <div class="channel-icon-box email-box">
                <i class="bi bi-envelope-at-fill"></i>
              </div>
              <div class="channel-info">
                <span class="channel-label">{{ lang.t('contact.email_title') }}</span>
                <strong class="channel-val">{{ data.developerInfo.email }}</strong>
                <span class="channel-sub">{{ lang.isRtl() ? 'استقبال عروض الأسعار والمواصفات الفنية' : 'RFPs & Technical Inquiries' }}</span>
              </div>
            </a>

            <!-- Location & Remote Card -->
            <div class="contact-channel-card prime-card">
              <div class="channel-icon-box location-box">
                <i class="bi bi-geo-alt-fill"></i>
              </div>
              <div class="channel-info">
                <span class="channel-label">{{ lang.t('contact.address_title') }}</span>
                <strong class="channel-val">{{ data.developerInfo.location }}</strong>
                <span class="channel-sub">{{ lang.isRtl() ? 'عقود محلية ودولية (Remote/On-site)' : 'Local & International Contracts' }}</span>
              </div>
            </div>

            <!-- Olympic Printing FB Direct Link -->
            <a href="https://www.facebook.com/share/1dEwTVm8rG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="contact-channel-card prime-card partner-highlight">
              <div class="channel-icon-box fb-box">
                <i class="bi bi-facebook"></i>
              </div>
              <div class="channel-info">
                <span class="channel-label">{{ lang.isRtl() ? 'صفحة فيسبوك الرسمية للشريك' : 'Partner Facebook Page' }}</span>
                <strong class="channel-val">{{ lang.isRtl() ? 'مطابع أوليمبيك (Olympic Printing)' : 'Olympic Printing Agency' }}</strong>
                <span class="channel-sub">{{ lang.isRtl() ? 'انقر لزيارة الصفحة الرسمية والاطلاع على المطبوعات' : 'Click to visit and browse products' }}</span>
              </div>
            </a>

          </div>

          <!-- Interactive Contact Form -->
          <div class="form-col prime-card">
            <h3 class="form-title">{{ lang.isRtl() ? 'إرسال طلب مشروع أو استشارة' : 'Request Consultation' }}</h3>
            <p class="form-subtitle">{{ lang.isRtl() ? 'املأ النموذج وسنتواصل معك خلال أقل من ساعتين' : 'Fill details below for response within 2 hours' }}</p>

            <form (ngSubmit)="submitForm()" class="contact-form">
              
              <div class="form-group">
                <label>{{ lang.t('contact.form_name') }} *</label>
                <input type="text" [(ngModel)]="formData.name" name="name" required class="prime-input" [placeholder]="lang.isRtl() ? 'مثال: م. محمد علي' : 'e.g. John Doe'" />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>{{ lang.t('contact.form_phone') }} *</label>
                  <input type="tel" [(ngModel)]="formData.phone" name="phone" required class="prime-input" [placeholder]="lang.isRtl() ? 'مثال: 010xxxxxxxx' : 'e.g. +2010...'" />
                </div>
                <div class="form-group">
                  <label>{{ lang.t('contact.form_email') }}</label>
                  <input type="email" [(ngModel)]="formData.email" name="email" class="prime-input" placeholder="name@domain.com" />
                </div>
              </div>

              <div class="form-group">
                <label>{{ lang.t('contact.form_service') }}</label>
                <select [(ngModel)]="formData.service" name="service" class="prime-input">
                  <option value="fullstack">{{ lang.isRtl() ? 'تطوير منصة متكاملة (.NET + Angular)' : 'Full-Stack Platform (.NET + Angular)' }}</option>
                  <option value="backend">{{ lang.isRtl() ? 'هندسة باك إند وبناء APIs (.NET Clean Architecture)' : '.NET Clean Architecture Web API' }}</option>
                  <option value="erp">{{ lang.isRtl() ? 'نظام إدارة مؤسسات وشركات (ERP مخصص)' : 'Custom ERP & Business System' }}</option>
                  <option value="showcase">{{ lang.isRtl() ? 'باقة واجهة الأعمال الاحترافية (Modern Showcase)' : 'Starter Showcase Website' }}</option>
                  <option value="payment">{{ lang.isRtl() ? 'ربط بوابات الدفع (InstaPay, Vodafone Cash, Visa)' : 'FinTech & Payment Gateway' }}</option>
                </select>
              </div>

              <div class="form-group">
                <label>{{ lang.t('contact.form_message') }} *</label>
                <textarea [(ngModel)]="formData.message" name="message" rows="4" required class="prime-input" [placeholder]="lang.isRtl() ? 'صف باختصار متطلباتك ومجال مشروعك...' : 'Describe your project requirements...'"></textarea>
              </div>

              <div *ngIf="submitted()" class="form-success-alert">
                <i class="bi bi-check-circle-fill"></i>
                <span>{{ lang.t('contact.form_success') }}</span>
              </div>

              <button type="submit" class="prime-btn prime-btn-primary prime-btn-lg" style="width: 100%;">
                <i class="bi bi-send-fill"></i>
                <span>{{ lang.t('contact.form_submit') }}</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.25fr;
      gap: 2.5rem;

      @media (max-width: 960px) {
        grid-template-columns: 1fr;
      }
    }

    .channels-col {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .contact-channel-card {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1.5rem;
      text-decoration: none;

      .channel-icon-box {
        width: 54px;
        height: 54px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        flex-shrink: 0;

        &.whatsapp-box {
          background: rgba(16, 185, 129, 0.12);
          color: var(--accent-emerald);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        &.email-box {
          background: rgba(59, 130, 246, 0.12);
          color: var(--accent-primary);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        &.location-box {
          background: rgba(139, 92, 246, 0.12);
          color: var(--accent-purple);
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        &.fb-box {
          background: rgba(6, 182, 212, 0.12);
          color: var(--accent-cyan);
          border: 1px solid rgba(6, 182, 212, 0.3);
        }
      }

      .channel-info {
        display: flex;
        flex-direction: column;

        .channel-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .channel-val {
          font-size: 1.1rem;
          color: var(--text-primary);
          font-weight: 800;
          margin: 0.2rem 0;
        }

        .channel-sub {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
      }

      &.partner-highlight {
        border-color: rgba(6, 182, 212, 0.3);
        background: rgba(6, 182, 212, 0.04);

        &:hover {
          border-color: var(--accent-cyan);
        }
      }
    }

    .form-col {
      padding: 2.5rem;

      .form-title {
        font-size: 1.45rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 0.35rem;
      }

      .form-subtitle {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 1.75rem;
      }
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      .form-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        @media (max-width: 600px) {
          grid-template-columns: 1fr;
        }
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;

        label {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .prime-input {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;

          &:focus {
            border-color: var(--accent-primary);
            background: var(--bg-card);
          }

          &::placeholder {
            color: var(--text-muted);
            font-size: 0.88rem;
          }
        }

        select.prime-input {
          cursor: pointer;
        }
      }

      .form-success-alert {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.85rem 1.1rem;
        border-radius: 12px;
        background: rgba(16, 185, 129, 0.12);
        color: var(--accent-emerald);
        border: 1px solid rgba(16, 185, 129, 0.3);
        font-size: 0.9rem;
        font-weight: 700;
      }
    }
  `]
})
export class ContactSectionComponent {
  readonly lang = inject(LanguageService);
  readonly data = inject(PortfolioDataService);

  readonly submitted = signal<boolean>(false);

  formData = {
    name: '',
    phone: '',
    email: '',
    service: 'fullstack',
    message: ''
  };

  submitForm(): void {
    if (!this.formData.name || !this.formData.phone || !this.formData.message) {
      return;
    }

    this.submitted.set(true);

    // Also craft a WhatsApp URL to open directly for instant connection!
    const waText = `طلب مشروع جديد من موقعك:
• الاسم: ${this.formData.name}
• الهاتف: ${this.formData.phone}
• الإيميل: ${this.formData.email || 'غير محدد'}
• نوع الخدمة: ${this.formData.service}
• الرسالة: ${this.formData.message}`;

    const waUrl = `https://wa.me/201094547599?text=${encodeURIComponent(waText)}`;
    
    // Automatically open WhatsApp in new tab after brief delay
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  }
}
