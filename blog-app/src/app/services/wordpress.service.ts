import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  BASE_URL: string = 'https://www.joelj.ca/wordpress/index.php/wp-json/wp/v2'

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/posts`).pipe(map(bindPostsDataToModel));
  }

}

function bindPostsDataToModel(postsData: any[]) {
  let result: Post[] = [];
  postsData.forEach(postData => {
    result.push({
      id: 1,
      date: postData.date,
      slug: postData.slug,
      excerpt: postData.excerpt.rendered,
      title: postData.title.rendered
    } as Post)
  }) ;
  return result;
}