import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Page } from '../models/page';
import { IContentService } from '../services/abc/content.service';

@Injectable({
  providedIn: 'root'
})
export class PageResolver  {

  constructor(private content: IContentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page[]> {
    const slug = route.paramMap.get('slug') as string;
    return this.content.getPage(slug);
  }
}
