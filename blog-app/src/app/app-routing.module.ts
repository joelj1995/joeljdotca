import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogRollComponent } from './blog-roll/blog-roll.component';
import { PageViewComponent } from './page-view/page-view.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PageResolver } from './resolvers/page.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { SubscribeComponent } from './subscribe/subscribe.component';

const routes: Routes = [
  { path: '', component: BlogRollComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { 
    path: 'pages/:slug', 
    component: PageViewComponent,
    resolve: { pages: PageResolver }
  },
  { 
    path: 'blog/:slug', 
    component: PostViewComponent,
    resolve: { posts: PostResolver }
  },
  { path: '**', component: BlogRollComponent }
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
