import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { MonitoringService } from './services/monitoring.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-app';
  spin: boolean = false;

  constructor(private monitoring: MonitoringService, private router: Router) {}

  ngOnInit(): void {
    // if (typeof window !== 'undefined') this.monitoring.checkIn();
    this.router.events.pipe(
      filter(event => event instanceof RouterEvent)
    )
    .subscribe(e => {
      if (e instanceof NavigationStart) {
        this.spin = true;
      }
      if (e instanceof NavigationEnd || e instanceof NavigationCancel) {
        this.spin = false;
      }
    });
  }

}
