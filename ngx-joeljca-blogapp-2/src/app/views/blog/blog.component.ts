import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Posts } from 'src/app/model/posts';
import { ContentService } from 'src/app/services/abc/content.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private content: ContentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  posts$ = this.route.queryParams.pipe(
    tap(() => this.loading = true),
    map(params => (+params['page'] ? +params['page'] : 1) as number),
    tap(page => this.currentPage = page),
    // tap(() => {
    //   if (!JoelJConstants.isServer) window.scrollTo(0, 0);
    // }),
    switchMap(page => this.content.getPosts(page, this.perPage)),
    map(posts => posts as Posts),
    tap(posts => this.numPages = posts.totalPages),
    tap(() => this.loading = false)
  );

  get pageNumbers(): number[] {
    return Array.from({ length: this.numPages }, (_, index) => index + 1);
  }

  get lastPageDisabled(): boolean {
    return this.currentPage == this.numPages;
  }

  get firstPageDisabled(): boolean {
    return this.currentPage == 1;
  }

  loading: boolean = true;

  readonly perPage: number = 5;
  currentPage: number = 1;
  numPages = this.currentPage;
}
