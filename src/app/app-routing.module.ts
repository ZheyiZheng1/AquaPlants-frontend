import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ReadmePageComponent } from './components/readme-page/readme-page.component';
import { ContactUsPageComponent } from './components/contact-us-page/contact-us-page.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PlantInfoPageComponent } from './components/plant-info-page/plant-info-page.component';
import { ArticlePageComponent } from './components/article-page/article-page.component';
import { ArticleInfoPageComponent } from './components/article-info-page/article-info-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path: "home", component: MainPageComponent, children: [
    {path: "readme", component: ReadmePageComponent},
    {path: "contactus", component: ContactUsPageComponent},
    {path: "map", component: MapPageComponent},
    {path: "search", component: SearchPageComponent},
    {path: "search/:plantId", component: PlantInfoPageComponent},
    {path: "article", component: ArticlePageComponent},
    {path: "article/:articleId", component: ArticleInfoPageComponent},
    {path: "profile", component: UserProfileComponent, canActivate: [AuthGuard]}
  ]},
  {path: "", component: WelcomePageComponent},
  {path:"**", component: ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
