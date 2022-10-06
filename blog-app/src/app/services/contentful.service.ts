import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogError } from '../models/blog-error';
import { Page } from '../models/page';
import { Post } from '../models/post';
import { Posts } from '../models/posts';
import { IContentService } from './abc/content.service';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService implements IContentService {

  constructor() { }

  getPage(slug: string): Observable<Page[]> {
    return of([]);
  }

  getPosts(page: number, perPage: number): Observable<Posts | BlogError> {
    return of({totalPages: 0, posts: []} as Posts);
  }

  getPost(slug: string): Observable<Post[]> {
    return of([]);
  }
}
