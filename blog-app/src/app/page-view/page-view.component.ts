import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContentService } from '../services/abc/content.service';
import { WpPage } from '../wp-model/wp-page';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  constructor(
    private contentService: IContentService,
    private route: ActivatedRoute
  ) { }

  page!: WpPage;
  slug!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.contentService.getPage(this.slug).subscribe(data => {
        if (data.length > 0) {
          this.page = data[0];
        }
      });
    })
  }

}
