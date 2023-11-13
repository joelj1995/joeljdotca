import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { BlogComponent } from './views/blog/blog.component';
import { ErrorComponent } from './views/error/error.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { postResolver } from './resolvers/post.resolver';
import { PostComponent } from './views/post/post.component';
import { PageComponent } from './views/page/page.component';
import { pageResolver } from './resolvers/page.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { darkHeader: true } },
  { path: 'blog', component: BlogComponent },
  { path: 'error', component: ErrorComponent, data: { noHeaderOrFooter: true } },
  { 
    path: 'pages/:slug', 
    component: PageComponent,
    resolve: { pages: pageResolver }
  },
  { 
    path: 'blog/:slug', 
    component: PostComponent,
    resolve: { posts: postResolver }
  },
  { path: 'not-found', component: NotFoundComponent, data: { noHeaderOrFooter: true } },
  { path: '**', component: NotFoundComponent, data: { noHeaderOrFooter: true } }
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
