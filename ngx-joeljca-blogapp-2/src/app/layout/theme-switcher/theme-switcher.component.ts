import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {

  constructor(
    private theme: ThemeService
  ) { }

  themeChange() {
    if (this.darkTheme) {
      this.theme.setTheme('dark');
    } else {
      this.theme.setTheme('light');
    }
  }

  darkTheme = this.theme.getTheme() == 'dark';

}
