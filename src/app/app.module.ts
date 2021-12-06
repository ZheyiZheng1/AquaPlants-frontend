import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { ReadmePageComponent } from './components/readme-page/readme-page.component';
import { ContactUsPageComponent } from './components/contact-us-page/contact-us-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PlantInfoPageComponent } from './components/plant-info-page/plant-info-page.component';
import { ArticlePageComponent } from './components/article-page/article-page.component';
import { ArticleInfoPageComponent } from './components/article-info-page/article-info-page.component';

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
    ArticleInfoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
