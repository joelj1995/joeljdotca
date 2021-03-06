import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../models/post';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  constructor(
    private wordpressService: WordpressService,
    private route: ActivatedRoute
  ) { }

  post: Post | null = null;
  slug!: string;

  notFound: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.post = null;
      this.notFound = false;
      this.slug = params['slug'];
      this.wordpressService.getPost(this.slug).subscribe(data => {
        if (data.length > 0) {
          this.post = data[0];
        } else {
          this.notFound = true;
        }
      });
    })
  }

}
