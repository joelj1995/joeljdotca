import { Component } from '@angular/core';
import { NavigationItem } from 'src/app/model/navigation-item';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private navigation: NavigationService
  ) { }

  navigationItems(): NavigationItem[] {
    return this.navigation.getNavigationItems();
  }

  submitEmailForMailChimp() {
    const form = document.getElementById('mc-embedded-subscribe-form');
    if (form != null) (form as any).submit();
  }

}
