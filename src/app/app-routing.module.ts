import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieFullscreenComponent } from './components/movie-fullscreen/movie-fullscreen.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: ContentComponent},
  { path: 'de', component: FirstPageComponent},
  { path: 'de/login', component: LoginComponent},
  { path: 'de/register', component: RegisterComponent},
  { path: 'watch/nameofmovie', component: MovieFullscreenComponent},
  { path: '**', component: FirstPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
