import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { NavigationCancel, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
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
      filter(event => event instanceof RouterEvent)
    )
    .subscribe(e => {
      if (e instanceof NavigationStart) {
        this.spinner.inc();
      }
      if (e instanceof NavigationEnd || e instanceof NavigationCancel) {
        this.spinner.dec();
      }
    });
  }

}
