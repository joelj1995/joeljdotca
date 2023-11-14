import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { ErrorComponent } from './views/error/error.component';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PostComponent } from './views/post/post.component';
import { ThemeSwitcherComponent } from './layout/theme-switcher/theme-switcher.component';
import { PageComponent } from './views/page/page.component';
import { ServicesComponent } from './views/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavDropdownComponent,
    NavLinkComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    SpinnerComponent,
    ErrorComponent,
    NotFoundComponent,
    PostComponent,
    ThemeSwitcherComponent,
    PageComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: ContentService, useClass: ContentfulService },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
