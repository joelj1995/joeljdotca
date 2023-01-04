import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BlogRollComponent } from './blog-roll/blog-roll.component';
import { Routes, RouterModule } from '@angular/router';
import { WordpressService } from './services/wordpress.service';
import { HttpClientModule } from '@angular/common/http';
import { PostViewComponent } from './post-view/post-view.component';
import { PageViewComponent } from './page-view/page-view.component';
import { CacheService } from './services/cache.service';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { IContentService } from './services/abc/content.service';
import { environment } from 'src/environments/environment';
import { ContentfulService } from './services/contentful.service';
import { SpinnerComponent } from './spinner/spinner.component';

let useContentful: boolean = environment.features.CONTENTFUL || (localStorage.getItem('CONTENTFUL_ENABLED') != null);

const routes: Routes = [
  { path: '', component: BlogRollComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'pages/:slug', component: PageViewComponent },
  { path: 'blog/:slug', component: PostViewComponent }
]; // sets up routes constant where you define your routes


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BlogRollComponent,
    PostViewComponent,
    PageViewComponent,
    SubscribeComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{provide: IContentService, useClass: useContentful ? ContentfulService : WordpressService}, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
