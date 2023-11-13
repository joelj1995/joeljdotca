import { Injectable } from '@angular/core';
import { NavigationItem } from '../model/navigation-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  getNavigationItems(): NavigationItem[] {
    return this.items;
  }

  private static routerNavItem(text: string, link: string): NavigationItem {
    return {
      text,
      link,
      bypassRouter: false
    };
  }

  private static hrefNavItem(text: string, link: string): NavigationItem {
    return {
      text,
      link,
      bypassRouter: true
    };
  }

  private items: NavigationItem[] = [ 
    NavigationService.routerNavItem('Services', '/pages/services'),
    NavigationService.routerNavItem('Portfolio', '/pages/portfolio'),
    NavigationService.routerNavItem('Blog', '/blog'),
    NavigationService.routerNavItem('About Me', '/pages/about-me'),
    NavigationService.hrefNavItem('Source', 'https://github.com/joelj1995/joeljdotca'),
  ];

}
