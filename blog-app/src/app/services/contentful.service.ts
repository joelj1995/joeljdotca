import { Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { BlogError } from '../models/blog-error';
import { Page } from '../models/page';
import { Post } from '../models/post';
import { Posts } from '../models/posts';
import { IContentService } from './abc/content.service';
import { createClient, Entry } from 'contentful';
import { environment } from 'src/environments/environment';
import { CfPost } from '../contentful-model/post';



@Injectable({
  providedIn: 'root'
})
export class ContentfulService implements IContentService {

  private client = createClient({space: environment.contentfulSpace, accessToken: environment.contentfulAccessToken});

  private convertPost = (postData: Entry<CfPost>) => { return {slug: postData.fields.slug, title: postData.fields.title, content: postData.fields.legacyWordpressContent, excerpt: this.extractExcerpt(postData.fields.legacyWordpressContent), date: new Date(postData.fields.published) } as Post};

  constructor() { }

  getPage(slug: string): Observable<Page[]> {
    return of([]);
  }

  getPosts(page: number, perPage: number): Observable<Posts | BlogError> {
    let promise = this.client.getEntries<CfPost>({ limit: perPage, skip: (page-1)*perPage, order: '-fields.published', content_type: 'post' });
    return from(promise).pipe(map(cfPosts => {
      return {
        posts: cfPosts.items.map(this.convertPost),
        totalPages: cfPosts.total
      } as Posts;
    }));
  }

  getPost(slug: string): Observable<Post[]> {
    return of([]);
  }

  private extractExcerpt(htmlString: string): string {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    var extractedText = tempDiv.textContent || tempDiv.innerText;
    return `<p>${extractedText.slice(0, 287)} [&hellip;]</p>`;
  }
}
