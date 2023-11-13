import { Component, Input } from '@angular/core';
import { NavigationItem } from 'src/app/model/navigation-item';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent {

  @Input()
  navItem!: NavigationItem;

}
