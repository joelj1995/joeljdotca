import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../models/page';
import { IContentService } from '../services/abc/content.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  page!: Page;

  ngOnInit(): void {
    this.page = this.route.snapshot.data['pages'][0];
  }

}
