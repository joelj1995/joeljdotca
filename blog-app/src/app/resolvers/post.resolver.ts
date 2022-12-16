import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';
import { ContentfulService } from '../services/contentful.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Post[]> {

  constructor(private content: ContentfulService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    const slug = route.paramMap.get('slug') as string;
    return this.content.getPost(slug);
  }
}
