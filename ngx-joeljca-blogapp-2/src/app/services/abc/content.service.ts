import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../model/page';
import { Posts } from '../../model/posts';
import { Post } from '../../model/post';
import { BlogError } from '../../model/blog-error';

@Injectable({
  providedIn: 'root'
})
export abstract class ContentService {
  abstract getPage(slug: string): Observable<Page[]>;
  abstract getPosts(page: number, perPage: number): Observable<Posts | BlogError>;
  abstract getPost(slug: string): Observable<Post[]>;
}
