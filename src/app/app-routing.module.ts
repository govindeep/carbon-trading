import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ContractsComponent } from './contracts/contracts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
  { path: 'contracts/:id', component: ContractsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
