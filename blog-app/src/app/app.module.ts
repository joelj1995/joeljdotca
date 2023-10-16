import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
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
import { NotFoundComponent } from './not-found/not-found.component';
import { JoelJConstants } from './constants';
import { Observable, of } from 'rxjs';

function initializeAppFactory(_doc: Document): () => Observable<any> {
  return () => {
    if (JoelJConstants.isServer) {
      // @ts-ignore
      (global['window'] as any) = _doc;
      // @ts-ignore
      (global['document'] as any) = _doc;
    }
    return of('');
  };
 }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BlogRollComponent,
    PostViewComponent,
    PageViewComponent,
    SubscribeComponent,
    SpinnerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {provide: IContentService, useClass: ContentfulService }, CacheService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [DOCUMENT],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
