import { Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private platform: PlatformService
  ) {
    if (this.platform.isBrowser)
      this.setTheme(this.getStoredTheme() ?? 'light');
  }

  getTheme(): string | null {
    if (!this.platform.isBrowser) return null;
    return this.getStoredTheme();
  }

  setTheme(theme: string) {
    if (!this.platform.isBrowser) return;
    this.setStoredTheme(theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  private getStoredTheme = () => localStorage.getItem('theme');
  private setStoredTheme = (theme: string) => localStorage.setItem('theme', theme);

}
