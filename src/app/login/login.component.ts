import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    emailAddress: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    })
  });
  isLoading = false;
  authError = false;
  acquireTokenSubscription: Subscription;
  tokenRequest = {
    scopes: ['User.Read']
  };
  acquiringToken = false;

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _broadcastService: BroadcastService,
    private _msalService: MsalService
    ) {}

  get emailAddress() {
    return this.loginForm.get('emailAddress');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this._broadcastService.subscribe("msal:loginFailure", (payload) => {
      console.log('payload----msal:loginFailure-----------', payload);
    });

    this._broadcastService.subscribe("msal:loginSuccess", (payload) => {
      console.log('payload--------loginSuccess-------', JSON.parse(JSON.stringify(payload)));
      if (payload._token && !this.acquiringToken) {
        this.acquiringToken = true;
        console.log('------acquiringToken---------', );
        this._msalService.acquireTokenPopup(this.tokenRequest.scopes, 'https://login.microsoftonline.com/carboncurrencyad.onmicrosoft.com')
          .then((res) => {
            console.log('res---------------', res);
          })
          .catch((err) => {
            console.log('err---------------', err);
          })
      }
    });

    this._broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log('payload--------acquireTokenSuccess-------', payload);
    });

    this._broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      console.log('payload-------acquireTokenFailure--------', payload);
    });
  }

  ngOnDestroy() {
    this._broadcastService.getMSALSubject().next(1);
    if (this.acquireTokenSubscription) {
      this.acquireTokenSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.isLoading = true;
    this._msalService.loginPopup()
    console.log('---------------');
    // this._authService.login()
    //   .subscribe((res) => {
    //     console.log('res---------------', res);
      // })
    // this._authService.login(this.emailAddress.value, this.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this._router.navigateByUrl('onboarding');
    //     },
    //     error => {
    //       this.authError = error;
    //       this.isLoading = false;
    //     });
  }
}
