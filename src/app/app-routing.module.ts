import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieFullscreenComponent } from './components/movie-fullscreen/movie-fullscreen.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: ContentComponent},
  { path: 'de', component: FirstPageComponent},
  { path: 'de/login', component: LoginComponent},
  { path: 'de/register', component: RegisterComponent},
  { path: 'watch/:movie-title', component: MovieFullscreenComponent},
  { path: 'FAQ', component: FaqComponent},
  { path: 'imprint', component: ImprintComponent},
  { path: 'data-protection', component: DataProtectionComponent},
  { path: 'contact', component: ContactComponent},
  { path: '**', component: FirstPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
