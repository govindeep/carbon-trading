import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  contracts: {};
  dashboard: {};

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    console.log('onboarding component')
  }

  handleRowClick(i) {
    this._router.navigateByUrl(`/contracts/1`)
  }

}
