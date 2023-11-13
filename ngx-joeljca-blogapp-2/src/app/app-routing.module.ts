import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
