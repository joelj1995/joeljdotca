import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-blog-roll',
  templateUrl: './blog-roll.component.html',
  styleUrls: ['./blog-roll.component.scss']
})
export class BlogRollComponent implements OnInit {

  constructor(
    private wordpressService: WordpressService
  ) { }

  posts!: Post[];

  loadingPosts: boolean = true;

  ngOnInit(): void {
    this.wordpressService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

}
