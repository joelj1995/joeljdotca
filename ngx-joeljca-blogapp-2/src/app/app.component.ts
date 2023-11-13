import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { ActivationStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blogapp';

  constructor(
    private router: Router,
    private spinner: SpinnerService
  ) { }

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
      if (e instanceof ActivationStart) {
        const data = e.snapshot.data;
        this.noHeaderOrFooter = data['noHeaderOrFooter'];
      }
    });
  }

  noHeaderOrFooter = false;

}
