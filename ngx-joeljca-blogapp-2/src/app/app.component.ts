import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { ActivationStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { PlatformService } from './services/platform.service';
import { MonitoringService } from './services/monitoring.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blogapp';

  constructor(
    private monitoring: MonitoringService,
    private platform: PlatformService,
    private router: Router,
    private spinner: SpinnerService
  ) { 
    this.monitoring.eventForCheckIn();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof RouterEvent || event instanceof ActivationStart)
    )
    .subscribe(e => {
      if (e instanceof NavigationStart) {
        this.spinner.inc();
      }
      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.spinner.dec();
      }
      if (e instanceof NavigationEnd) {
        if (this.platform.isBrowser) {
          window.scrollTo(0, 0);
        }
      }
      if (e instanceof ActivationStart) {
        const data = e.snapshot.data;
        this.noHeaderOrFooter = data['noHeaderOrFooter'];
      }
    });
  }

  noHeaderOrFooter = false;

}
