import { Component } from '@angular/core';
import { NavigationItem } from 'src/app/model/navigation-item';
import { NavigationService } from 'src/app/services/navigation.service';
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private navigation: NavigationService,
    private platform: PlatformService
  ) { }

  navigationItems(): NavigationItem[] {
    return this.navigation.getNavigationItems();
  }

  submitEmailForMailChimp() {
    const form = document.getElementById('mc-embedded-subscribe-form');
    if (form != null) (form as any).submit();
  }

  serverInfo() {
    if (this.platform.isBrowser)
      return (window as any).serverInfo;
    else 
      return { node: "ssr", slot: "ssr", version: "ssr", lb: "ssr" };
  }

}
