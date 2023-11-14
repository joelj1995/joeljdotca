import { isPlatformBrowser } from '@angular/common';
import { Injectable, Injector, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private injector: Injector) {  }

  public get isBrowser(): boolean {
    const platformId = this.injector.get(PLATFORM_ID);
    return isPlatformBrowser(platformId);
  }
}
