import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IContentService } from '../services/abc/content.service';
import { WpPost } from '../wp-model/wp-post';

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

  post: WpPost | null = null;
  slug!: string;

  notFound: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.post = null;
      this.notFound = false;
      this.slug = params['slug'];
      this.contentService.getPost(this.slug).subscribe(data => {
        if (data.length > 0) {
          this.post = data[0];
        } else {
          this.notFound = true;
        }
      });
    })
  }

}
