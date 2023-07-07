import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';

const routes: Routes = [
  { path: '', component: ContentComponent},
  { path: 'home', component: ContentComponent},
  // { path: 'de', component: FirstPageComponent},
  // { path: 'de/login', component: LoginComponent},
  // { path: 'de/register', component: RegisterComponent},
  // { path: '**', component: FirstPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
