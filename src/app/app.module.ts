import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NgImageSliderModule } from 'ng-image-slider';

import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { ReadmePageComponent } from './components/readme-page/readme-page.component';
import { ContactUsPageComponent } from './components/contact-us-page/contact-us-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HttpClientModule} from '@angular/common/http';
import { PlantInfoPageComponent } from './components/plant-info-page/plant-info-page.component';
import { ArticlePageComponent } from './components/article-page/article-page.component';
import { ArticleInfoPageComponent } from './components/article-info-page/article-info-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PostPageComponent } from './components/post-page/post-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    MainPageComponent,
    SearchPageComponent,
    MapPageComponent,
    ReadmePageComponent,
    ContactUsPageComponent,
    ErrorPageComponent,
    PlantInfoPageComponent,
    ArticlePageComponent,
    ArticleInfoPageComponent,
    UserProfileComponent,
    PostPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgImageSliderModule,
    AuthModule.forRoot({
      domain: 'alenz-0318.us.auth0.com',
      clientId: 'Me81WwX5TlcmsEUJhF3aJSDK2TzrTUGI'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
