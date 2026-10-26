import { Injectable, signal, computed, effect } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'prime-portfolio-theme';
  readonly theme = signal<ThemeMode>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    this.applyTheme(this.theme());

    // Reactively update DOM when theme changes
    effect(() => {
      const current = this.theme();
      this.applyTheme(current);
      try {
        localStorage.setItem(this.storageKey, current);
      } catch (e) {
        // Handle private browsing or localStorage disabled
      }
    });
  }

  toggleTheme(): void {
    this.theme.update(current => (current === 'dark' ? 'light' : 'dark'));
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
  }

  private getInitialTheme(): ThemeMode {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) {
      // Ignore error
    }
    return 'dark'; // Default to high-tech dark mode
  }

  private applyTheme(mode: ThemeMode): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', mode);
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${mode}`);
    }
  }
}
