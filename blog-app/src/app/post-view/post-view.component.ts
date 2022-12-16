import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../models/post';
import { IContentService } from '../services/abc/content.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  constructor(
    private contentService: IContentService,
    private route: ActivatedRoute
  ) { }

  post: Post | null = null;
  slug!: string;

  notFound: boolean = false;

  ngOnInit(): void {
    const posts = this.route.snapshot.data['posts'] as Post[];
    this.post = posts[0];
  }

}
