import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../../../core/services/ai-chat.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-copilot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="copilot-widget-container" [class.is-open]="ai.isOpen()">
      <!-- Floating Launch Bubble -->
      <button 
        type="button" 
        class="copilot-fab" 
        (click)="ai.toggleChat()" 
        [title]="ai.isOpen() ? 'إغلاق المساعد' : 'المساعد الذكي Prime Copilot'"
        aria-label="Toggle AI Copilot">
        <div class="fab-inner">
          <i class="bi" [ngClass]="ai.isOpen() ? 'bi-x-lg' : 'bi-robot'"></i>
        </div>
        <span class="fab-badge" *ngIf="!ai.isOpen()">AI</span>
      </button>

      <!-- Chat Drawer Window -->
      <div class="copilot-window" *ngIf="ai.isOpen()">
        <!-- Header -->
        <div class="window-header">
          <div class="header-info">
            <div class="ai-avatar">
              <i class="bi bi-cpu-fill"></i>
            </div>
            <div>
              <h3 class="ai-title">Prime Copilot 2030</h3>
              <p class="ai-status">
                <span class="status-dot"></span>
                <span>{{ lang.isRtl() ? 'المساعد الذكي للمهندس أحمد' : 'Ahmed Mohamed\'s AI Assistant' }}</span>
              </p>
            </div>
          </div>
          <button type="button" class="close-btn" (click)="ai.closeChat()">
            <i class="bi bi-dash-lg"></i>
          </button>
        </div>

        <!-- Chat Stream -->
        <div class="chat-stream" #scrollContainer>
          <div 
            *ngFor="let msg of ai.messages()" 
            class="chat-bubble-wrap" 
            [ngClass]="msg.sender === 'user' ? 'wrap-user' : 'wrap-ai'">
            
            <div class="chat-bubble" [ngClass]="msg.sender === 'user' ? 'bubble-user' : 'bubble-ai'">
              <div class="bubble-content" [innerHTML]="formatMessage(msg.text)"></div>

              <!-- Action Link if present -->
              <div *ngIf="msg.actionLink" class="action-link-wrap">
                <a [href]="msg.actionLink.url" target="_blank" rel="noopener noreferrer" class="prime-btn prime-btn-primary prime-btn-sm">
                  <i class="bi bi-box-arrow-up-right"></i>
                  <span>{{ msg.actionLink.text }}</span>
                </a>
              </div>

              <!-- Suggestions Chips -->
              <div *ngIf="msg.suggestions && msg.suggestions.length > 0" class="suggestions-chips">
                <button 
                  type="button" 
                  *ngFor="let s of msg.suggestions" 
                  class="chip-btn" 
                  (click)="sendSuggestion(s)">
                  <i class="bi bi-stars"></i>
                  <span>{{ s }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Bar -->
        <div class="window-input-area">
          <form (ngSubmit)="submitMessage()" class="input-form">
            <input 
              type="text" 
              [(ngModel)]="userInput" 
              name="userInput" 
              [placeholder]="lang.t('copilot.input_placeholder')" 
              class="chat-input" 
              autocomplete="off" />
            <button type="submit" class="send-btn" [disabled]="!userInput.trim()">
              <i class="bi" [ngClass]="lang.isRtl() ? 'bi-send-fill flip-rtl' : 'bi-send-fill'"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .copilot-widget-container {
      position: fixed;
      bottom: 2rem;
      inset-inline-end: 2rem;
      z-index: 1050;
      font-family: inherit;

      @media (max-width: 640px) {
        bottom: 1rem;
        inset-inline-end: 1rem;
      }
    }

    .copilot-fab {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--gradient-brand);
      color: #ffffff;
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s ease;

      &:hover {
        transform: scale(1.08) translateY(-3px);
        box-shadow: 0 12px 30px rgba(37, 99, 235, 0.6);
      }

      .fab-inner {
        font-size: 1.6rem;
      }

      .fab-badge {
        position: absolute;
        top: -4px;
        inset-inline-end: -4px;
        padding: 0.2rem 0.5rem;
        font-size: 0.7rem;
        font-weight: 800;
        background: #10b981;
        color: #ffffff;
        border-radius: 9999px;
        border: 2px solid var(--bg-primary);
      }
    }

    .copilot-window {
      position: absolute;
      bottom: 75px;
      inset-inline-end: 0;
      width: 390px;
      height: 520px;
      max-width: calc(100vw - 2rem);
      max-height: calc(100vh - 110px);
      background: var(--bg-card-solid);
      border: 1px solid var(--border-highlight);
      border-radius: 20px;
      box-shadow: var(--shadow-lg), var(--shadow-glow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: popUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);

      @media (max-width: 480px) {
        width: calc(100vw - 2rem);
        height: 480px;
      }
    }

    .window-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);

      .header-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        .ai-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--gradient-brand);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .ai-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .ai-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-muted);

          .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #10b981;
          }
        }
      }

      .close-btn {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        font-size: 1.2rem;
        transition: all 0.2s ease;

        &:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
      }
    }

    .chat-stream {
      flex: 1;
      padding: 1.25rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .chat-bubble-wrap {
      display: flex;

      &.wrap-user {
        justify-content: flex-end;
      }

      &.wrap-ai {
        justify-content: flex-start;
      }
    }

    .chat-bubble {
      max-width: 86%;
      padding: 0.85rem 1.1rem;
      border-radius: 16px;
      font-size: 0.9rem;
      line-height: 1.6;

      &.bubble-user {
        background: var(--accent-primary);
        color: #ffffff;
        border-bottom-inline-end-radius: 4px;
      }

      &.bubble-ai {
        background: var(--bg-tertiary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        border-bottom-inline-start-radius: 4px;
      }
    }

    .bubble-content {
      white-space: pre-line;
      word-break: break-word;
    }

    .action-link-wrap {
      margin-top: 0.75rem;
    }

    .suggestions-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem;
      margin-top: 0.85rem;
      padding-top: 0.65rem;
      border-top: 1px solid var(--border-color);

      .chip-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.35rem 0.65rem;
        border-radius: 8px;
        font-size: 0.78rem;
        font-weight: 600;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        transition: all 0.2s ease;

        i {
          color: var(--accent-cyan);
          font-size: 0.85rem;
        }

        &:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(59, 130, 246, 0.08);
        }
      }
    }

    .window-input-area {
      padding: 0.85rem 1rem;
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);

      .input-form {
        display: flex;
        gap: 0.5rem;
      }

      .chat-input {
        flex: 1;
        padding: 0.65rem 1rem;
        border-radius: 12px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.2s ease;

        &:focus {
          border-color: var(--accent-primary);
        }

        &::placeholder {
          color: var(--text-muted);
          font-size: 0.82rem;
        }
      }

      .send-btn {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: var(--gradient-brand);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        transition: all 0.2s ease;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
      }
    }

    .flip-rtl {
      transform: scaleX(-1);
    }

    @keyframes popUp {
      from {
        opacity: 0;
        transform: translateY(15px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class CopilotWidgetComponent implements AfterViewChecked {
  readonly ai = inject(AiChatService);
  readonly lang = inject(LanguageService);
  
  @ViewChild('scrollContainer') private scrollContainer?: ElementRef;
  userInput: string = '';

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  submitMessage(): void {
    if (!this.userInput.trim()) return;
    const query = this.userInput;
    this.userInput = '';
    this.ai.sendMessage(query);
  }

  sendSuggestion(suggestion: string): void {
    this.ai.sendMessage(suggestion);
  }

  formatMessage(text: string): string {
    return text;
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
