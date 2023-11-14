import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { PlatformService } from "../services/platform.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private router: Router,
    private zone: NgZone,
    private platform: PlatformService
  ) { }

  handleError(error: any) {
    console.error('Error from global error handler', error);
    if (!this.platform.isBrowser) return;
    localStorage.setItem('JOELJ_LAST_ERROR', error);
    this.zone.run(() => {
        window.location.href = '/error';
    });
  }
}