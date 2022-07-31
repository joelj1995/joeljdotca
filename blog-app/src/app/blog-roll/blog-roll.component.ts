import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Posts } from '../models/posts';
import { WordpressService } from '../services/wordpress.service';
import { WpPost } from '../wp-model/wp-post';

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
  totalPages: number = 1;
  currentPage: number = 1;
  posts: WpPost[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.posts = [];
    this.route.queryParams.subscribe(params => {
      this.loading = true;
      this.posts = [];
      this.totalPages = 1;
      if (Number(params['page'])) {
        this.currentPage = Number(params['page']);
      } else {
        this.currentPage = 1;
      }
      this.wordpressService.getPosts(this.currentPage, this.perPage).subscribe(data => {
        this.posts = data.posts;
        this.loading = false;
        this.totalPages = data.totalPages;
      });
    })

  }

}
