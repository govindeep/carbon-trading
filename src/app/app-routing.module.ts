import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ContractsComponent } from './contracts/contracts.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'contracts/:id', component: ContractsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
