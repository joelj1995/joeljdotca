import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  post: Post | null = null;
  slug!: string;

  ngOnInit(): void {
    const posts = this.route.snapshot.data['posts'] as Post[];
    if (posts.length < 1) {
      this.router.navigate(['/not-found']);
    } else {
      this.post = posts[0];
    }
  }

}
