import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private router: Router,
    private zone: NgZone
  ) { }

  handleError(error: any) {
    console.error('Error from global error handler', error);
    localStorage.setItem('JOELJ_LAST_ERROR', error);
    this.zone.run(() => {
        window.location.href = '/error';
    });
  }
}