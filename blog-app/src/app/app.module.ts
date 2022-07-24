import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BlogRollComponent } from './blog-roll/blog-roll.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { Routes, RouterModule } from '@angular/router';
import { WordpressService } from './services/wordpress.service';
import { HttpClientModule } from '@angular/common/http';
import { PostViewComponent } from './post-view/post-view.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'blog/:slug', component: PostViewComponent }
]; // sets up routes constant where you define your routes

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    BlogRollComponent,
    AboutMeComponent,
    PostViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WordpressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
