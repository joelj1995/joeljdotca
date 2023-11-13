import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavDropdownComponent } from './layout/nav-dropdown/nav-dropdown.component';
import { NavLinkComponent } from './layout/nav-link/nav-link.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { BlogComponent } from './views/blog/blog.component';
import { ContentService } from './services/abc/content.service';
import { ContentfulService } from './services/contentful.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavDropdownComponent,
    NavLinkComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: ContentService, useClass: ContentfulService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
