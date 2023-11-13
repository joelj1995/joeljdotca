import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/model/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const pages = this.route.snapshot.data['pages'] as Page[];
    if (pages.length < 1) {
      this.router.navigate(['/not-found']);
    } else {
      this.page = pages[0];
    }
  }

  page: Page | null = null;
  slug!: string;

}
