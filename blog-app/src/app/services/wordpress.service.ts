import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Page } from '../models/page';
import { Post } from '../models/post';
import { Posts } from '../models/posts'
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  BASE_URL: string = 'https://www.joelj.ca/wordpress/index.php/wp-json/wp/v2'

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) { }

  getPage(slug: string): Observable<Page[]> {
    return this.http.get<Page[]>(`${this.BASE_URL}/pages?slug=${slug}`).pipe(map(bindPagesDataToModel));
  }

  getPosts(page: number, perPage: number): Observable<Posts> {
    // TODO: make a service to cache posts
    return this.http.get<any>(`${this.BASE_URL}/posts?page=${page}&per_page=${perPage}`, { observe: 'response' })
      .pipe(
        tap(res => {
          console.log(`tapped ${res.body[0].slug}`)
          res.body.forEach((postData: any) => {
            this.cache.set(postData.slug, postData);
          })
        }),
        map(res => {
          return {
            posts: bindPostsDataToModel(res.body),
            totalPages: Number(res.headers.get('X-WP-TotalPages'))
          } as Posts
        })
      );
  }

  getPost(slug: string): Observable<Post[]> {
    // TODO: Check cache for post when implemented
    const cacheResult = this.cache.get(slug);
    if (cacheResult) {
      return new Observable(observer => {
        observer.next([bindPostDataToModel(cacheResult)]);
      })
    }
    return this.http.get<Post[]>(`${this.BASE_URL}/posts?slug=${slug}`).pipe(map(bindPostsDataToModel));
  }
}

function bindPageDataToModel(pageData: any): Page {
  return {
    id: pageData.id,
    slug: pageData.slug,
    title: pageData.title.rendered,
    content: pageData.content.rendered
  } as Page
}

function bindPagesDataToModel(pagesData: any[]) {
  let result: Page[] = [];
  pagesData.forEach(pageData => {
    result.push(bindPageDataToModel(pageData));
  }) ;
  return result;
}

function bindPostDataToModel(postData: any): Post {
  return {
    id: postData.id,
    date: postData.date,
    slug: postData.slug,
    excerpt: postData.excerpt.rendered,
    title: postData.title.rendered,
    content: postData.content.rendered
  } as Post
}

function bindPostsDataToModel(postsData: any[]) {
  let result: Post[] = [];
  postsData.forEach(postData => {
    result.push(bindPostDataToModel(postData));
  }) ;
  return result;
}