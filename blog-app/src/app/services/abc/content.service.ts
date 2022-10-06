import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogError } from 'src/app/models/blog-error';
import { Page } from 'src/app/models/page';
import { Post } from 'src/app/models/post';
import { Posts } from 'src/app/models/posts';

@Injectable()
export abstract class IContentService {
  abstract getPage(slug: string): Observable<Page[]>;
  abstract getPosts(page: number, perPage: number): Observable<Posts | BlogError>;
  abstract getPost(slug: string): Observable<Post[]>;
}