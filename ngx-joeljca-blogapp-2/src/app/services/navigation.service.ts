import { Injectable } from '@angular/core';
import { NavigationItem } from '../model/navigation-item';
import { FeatureService } from './feature.service';
import { FEATURE_PORTFOLIO } from '../model/features';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private feature: FeatureService
  ) { }

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
    NavigationService.routerNavItem('Services', '/services'),
    this.feature.get(FEATURE_PORTFOLIO) ? NavigationService.routerNavItem('Portfolio', '/portfolio') : undefined,
    NavigationService.routerNavItem('Blog', '/blog'),
    NavigationService.routerNavItem('About Me', '/pages/about-me'),
    NavigationService.hrefNavItem('Source', 'https://github.com/joelj1995/joeljdotca'),
  ].filter((x) => !!x) as NavigationItem[];

}
