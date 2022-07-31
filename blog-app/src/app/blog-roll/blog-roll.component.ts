import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogError } from '../models/blog-error';
import { Posts } from '../models/posts';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-blog-roll',
  templateUrl: './blog-roll.component.html',
  styleUrls: ['./blog-roll.component.scss']
})
export class BlogRollComponent implements OnInit {

  constructor(
    private wordpressService: WordpressService,
    private route: ActivatedRoute
  ) { }

  readonly perPage: number = 5;
  currentPage: number = 1;
  posts: Posts = {
    posts: [],
    totalPages: 0
  } as Posts;

  loading: boolean = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loading = true;
      if (Number(params['page'])) {
        this.currentPage = Number(params['page']);
      } else {
        this.currentPage = 1;
      }
      this.wordpressService.getPosts(this.currentPage, this.perPage)
        .subscribe({
          next: data => {
            this.posts = <Posts>data;
            this.loading = false;
          },
          error: err => console.error(err.message)
        }
      );
    })
  }

}
