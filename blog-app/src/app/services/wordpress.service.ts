import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  BASE_URL: string = 'http://cms.joelj.ca/index.php/wp-json/wp/v2'

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<any> {
    return this.http.get<any[]>(`${this.BASE_URL}/posts`)
  }

}
