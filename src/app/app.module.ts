import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ContractsComponent } from './contracts/contracts.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnboardingComponent,
    ContractsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MsalModule.forRoot({
      clientID: 'd73371f0-3249-4b06-9377-6393c24df238',
      redirectUri: 'http://localhost:4200/',
      authority: 'https://login.microsoftonline.com/carboncurrencyad.onmicrosoft.com'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
