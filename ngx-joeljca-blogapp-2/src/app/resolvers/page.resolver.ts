import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContentService } from '../services/abc/content.service';
import { Page } from '../model/page';

export const pageResolver: ResolveFn<Page[]> = (route, state) => {
  const content = inject(ContentService);
  const slug = route.paramMap.get('slug') as string;
  return content.getPage(slug);
};
