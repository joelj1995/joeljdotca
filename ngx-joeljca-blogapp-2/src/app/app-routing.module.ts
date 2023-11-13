import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { BlogComponent } from './views/blog/blog.component';
import { ErrorComponent } from './views/error/error.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { darkHeader: true } },
  { path: 'blog', component: BlogComponent },
  { path: 'error', component: ErrorComponent, data: { noHeaderOrFooter: true } },
  // { path: 'subscribe', component: SubscribeComponent },
  // { 
  //   path: 'pages/:slug', 
  //   component: PageViewComponent,
  //   resolve: { pages: PageResolver }
  // },
  // { 
  //   path: 'blog/:slug', 
  //   component: PostViewComponent,
  //   resolve: { posts: PostResolver }
  // },
  // { path: '**', component: NotFoundComponent }
  { path: '**', component: NotFoundComponent, data: { noHeaderOrFooter: true } }
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
