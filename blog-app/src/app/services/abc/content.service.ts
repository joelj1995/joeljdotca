import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogError } from 'src/app/models/blog-error';
import { Posts } from 'src/app/models/posts';
import { WpPage } from 'src/app/wp-model/wp-page';
import { WpPost } from 'src/app/wp-model/wp-post';

@Injectable()
export abstract class IContentService {
  abstract getPage(slug: string): Observable<WpPage[]>;
  abstract getPosts(page: number, perPage: number): Observable<Posts | BlogError>;
  abstract getPost(slug: string): Observable<WpPost[]>;
}