import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogError } from '../models/blog-error';
import { Posts } from '../models/posts'
import { WpPage } from '../wp-model/wp-page'
import { WpPost } from '../wp-model/wp-post';
import { IContentService } from './abc/content.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class WordpressService implements IContentService {

  BASE_URL: string = `${environment.wpBaseUrl}/wordpress/index.php/wp-json/wp/v2`

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) { }

  private handleHttpError(error: HttpErrorResponse) : Observable<BlogError> {
    let errorData = {
      message: error.statusText,
      friendlyMessage: 'An error occured while retrieving data.'
    } as BlogError;
    return throwError(() => errorData);
  }

  getPage(slug: string): Observable<WpPage[]> {
    return this.http.get<WpPage[]>(`${this.BASE_URL}/pages?slug=${slug}`);
  }

  getPosts(page: number, perPage: number): Observable<Posts | BlogError> {
    return this.http.get<WpPost[]>(`${this.BASE_URL}/posts?page=${page}&per_page=${perPage}`, { observe: 'response' })
      .pipe(
        tap(res => {
          if (res.body) {
            res.body.forEach((postData: any) => {
              this.cache.set(postData.slug, postData);
            });
          }
        }),
        map(res => {
          if (res.body == null) {
            throw 'No posts returned';
          }
          return {
            posts: res.body,
            totalPages: Number(res.headers.get('X-WP-TotalPages'))
          } as Posts
        }),
        catchError(error => this.handleHttpError(error))
      );
  }

  getPost(slug: string): Observable<WpPost[]> {
    const cacheResult = this.cache.get(slug);
    if (cacheResult) {
      return new Observable(observer => {
        observer.next([cacheResult]);
      })
    }
    return this.http.get<WpPost[]>(`${this.BASE_URL}/posts?slug=${slug}`);
  }
}