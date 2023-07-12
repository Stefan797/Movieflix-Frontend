import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContentComponent } from './components/content/content.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { HeaderNotificationContainerComponent } from './components/header-notification-container/header-notification-container.component';
import { HeaderProfileSettingsContainerComponent } from './components/header-profile-settings-container/header-profile-settings-container.component';

// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterSuccessfullyComponent } from './components/register-successfully/register-successfully.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HoverDirective } from './directives/hover.directive';
import { MovieFullscreenComponent } from './components/movie-fullscreen/movie-fullscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ContentComponent,
    HeaderComponent,
    MainComponent,
    CategoriesComponent,
    FooterComponent,
    FirstPageComponent,
    HeaderNotificationContainerComponent,
    HeaderProfileSettingsContainerComponent,
    RegisterSuccessfullyComponent,
    HoverDirective,
    MovieFullscreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
