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
import { CfPage } from '../contentful-model/page';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document, MARKS } from "@contentful/rich-text-types";

@Injectable({
  providedIn: 'root'
})
export class ContentfulService implements IContentService {

  private renderOptions = {
    renderNode: {
      'embedded-asset-block': (node: any) =>
        `<img class="img-fluid" src="${node.data.target.fields.file.url}"/>`
    },
    renderMark: {
      [MARKS.CODE]: (text: any) => `<p><code><pre>${text}</pre></code></p>`
    }
  }

  private client = createClient({space: environment.contentfulSpace, accessToken: environment.contentfulAccessToken});

  private convertPost = (postData: Entry<CfPost>) => { 
    let post = {
      slug: postData.fields.slug, 
      title: postData.fields.title, 
      content: postData.fields.legacyWordpressContent, 
      excerpt: this.extractExcerpt(postData.fields.legacyWordpressContent), 
      date: new Date(postData.fields.published) 
    } as Post;
    if (postData.fields.content) {
      post.content = documentToHtmlString(postData.fields.content as Document, this.renderOptions);
      post.excerpt = this.extractExcerpt(post.content);
    }
    return post;
  };

  private convertPage = (pageData: Entry<CfPage>) => { 
    let page = {
      slug: pageData.fields.slug, 
      title: pageData.fields.title, 
      content: pageData.fields.legacyWordpressContent, 
    } as Page;
    if (pageData.fields.content) {
      page.content = documentToHtmlString(pageData.fields.content as Document, this.renderOptions);
    }
    return page;
  };

  constructor() { }

  getPage(slug: string): Observable<Page[]> {
    let promise = this.client.getEntries<CfPage>({ 'fields.slug[match]': slug, content_type: 'page' });
    return from(promise).pipe(map(cfPosts => cfPosts.items.map(this.convertPage)));
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
    let promise = this.client.getEntries<CfPost>({ 'fields.slug[match]': slug, content_type: 'post' });
    return from(promise).pipe(map(cfPosts => cfPosts.items.map(this.convertPost)));
  }

  private extractExcerpt(htmlString: string): string {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    var extractedText = tempDiv.querySelector('p')?.textContent || '';
    return `<p>${extractedText.slice(0, 287)} [&hellip;]</p>`;
  }
}
