import { Injectable } from '@angular/core';
import { ContentService } from './abc/content.service';
import { Observable, from, map } from 'rxjs';
import { BlogError } from '../model/blog-error';
import { Page } from '../model/page';
import { Post } from '../model/post';
import { Posts } from '../model/posts';
import { Entry, createClient } from 'contentful';
import { CfPost } from '../model/contentful/post';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService extends ContentService {

  constructor() {
    super();
  }

  override getPage(slug: string): Observable<Page[]> {
    throw new Error('Method not implemented.');
  }

  override getPosts(page: number, perPage: number): Observable<Posts | BlogError> {
    let promise = this.client.getEntries<CfPost>({
      limit: perPage, 
      skip: (page-1)*perPage,
      order: ['-fields.published'],
      content_type: "post"
    });
    return from(promise).pipe(map(cfPosts => {
      return {
        posts: cfPosts.items.map(this.convertPost),
        totalPages: cfPosts.total
      } as Posts;
    }));
  }

  override getPost(slug: string): Observable<Post[]> {
    throw new Error('Method not implemented.');
  }

  private convertPost = (postSkeletonData: Entry<CfPost, "WITHOUT_LINK_RESOLUTION", string>) => {
    const postData = postSkeletonData.fields;
    let post = {
      slug: postData.slug, 
      title: postData.title, 
      content: postData.legacyWordpressContent, 
      excerpt: this.extractExcerpt(postData.legacyWordpressContent), 
      date: new Date(postData.published) 
    } as Post;
    if (postData.content) {
      post.content = documentToHtmlString(postData.content, this.renderOptions);
      post.excerpt = this.extractExcerpt(post.content);
    }
    return post;
  };

  private client = createClient(environment.contentful);

  private extractExcerpt(htmlString: string): string {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    var extractedText = tempDiv.querySelector('p')?.textContent || '';
    return `<p>${extractedText.slice(0, 287)} [&hellip;]</p>`;
  }

  private renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) =>
        `<img class="img-fluid" src="${node.data.target.fields.file.url}"/>`,
      [BLOCKS.TABLE]: (node: any, next: any) =>
        `<table class="table">${next(node.content)}</table>`
    },
    renderMark: {
      [MARKS.CODE]: (text: any) => `<p><code><pre>${text}</pre></code></p>`
    }
  }
  
}
