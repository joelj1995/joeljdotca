import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { NavigationItem } from 'src/app/model/navigation-item';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private navigation: NavigationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        const data = event.snapshot.data;
        this.disableMenu();
        if (data['darkHeader'])
          this.darkHeader = true;
        else
          this.darkHeader = false;
      }
    });
  }

  disableMenu() {
    this._showMenu = false;
  }

  navigationItems(): NavigationItem[] {
    return this.navigation.getNavigationItems();
  }

  headerClasses(): string {
    if (this.darkHeader)
      return "header navbar navbar-expand-lg navbar-dark position-absolute navbar-sticky";
    else
      return "header navbar navbar-expand-lg bg-light shadow-sm shadow-dark-mode-none";
  }

  toggleMenu() {
    this._showMenu = !this._showMenu;
  }

  get showMenu(): boolean {
    return this._showMenu;
  }

  public darkHeader: boolean = false;

  private _showMenu = false;
}
