import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../models/page';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  constructor(
    private wordpressService: WordpressService,
    private route: ActivatedRoute
  ) { }

  page!: Page;
  slug!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.wordpressService.getPage(this.slug).subscribe(data => {
        if (data.length > 0) {
          this.page = data[0];
        }
      });
    })
  }

}
