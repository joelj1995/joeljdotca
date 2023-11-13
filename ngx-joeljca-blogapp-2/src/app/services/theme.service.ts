import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { 
    this.setTheme(this.getStoredTheme() ?? 'light');
  }

  getTheme(): string | null {
    return this.getStoredTheme();
  }

  setTheme(theme: string) {
    this.setStoredTheme(theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  private getStoredTheme = () => localStorage.getItem('theme');
  private setStoredTheme = (theme: string) => localStorage.setItem('theme', theme);

}
