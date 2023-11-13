import { Component } from '@angular/core';
import { NavigationItem } from 'src/app/model/navigation-item';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private navigation: NavigationService
  ) { }

  navigationItems(): NavigationItem[] {
    return this.navigation.getNavigationItems();
  }

}
