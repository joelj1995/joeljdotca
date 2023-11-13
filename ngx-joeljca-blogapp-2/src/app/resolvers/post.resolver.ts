import { ResolveFn } from '@angular/router';
import { Post } from '../model/post';
import { inject } from '@angular/core';
import { ContentService } from '../services/abc/content.service';

export const postResolver: ResolveFn<Post[]> = (route, state) => {
  const content = inject(ContentService);
  const slug = route.paramMap.get('slug') as string;
  return content.getPost(slug);
};
