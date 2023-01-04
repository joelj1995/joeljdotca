import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, startWith, switchMap, tap } from 'rxjs';
import { BlogError } from '../models/blog-error';
import { Posts } from '../models/posts';
import { IContentService } from '../services/abc/content.service';

@Component({
  selector: 'app-blog-roll',
  templateUrl: './blog-roll.component.html',
  styleUrls: ['./blog-roll.component.scss']
})
export class BlogRollComponent implements OnInit {

  loading: boolean = true;

  constructor(
    private contentService: IContentService,
    private route: ActivatedRoute
  ) { }

  readonly perPage: number = 5;
  currentPage: number = 1;

  posts$ = this.route.queryParams.pipe(
    tap(() => this.loading = true),
    map(params => (+params['page'] ? +params['page'] : 1) as number),
    tap(page => this.currentPage = page),
    tap(() => {
      if (window) window.scrollTo(0, 0)
    }),
    switchMap(page => this.contentService.getPosts(page, this.perPage)),
    map(posts => posts as Posts),
    tap(() => this.loading = false)
  );

  ngOnInit(): void { }

}
