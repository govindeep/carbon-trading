import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationContext } from 'adal-angular'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<object>;
  public currentUser: Observable<object>;
  authContext;

  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<object>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log('---------------');
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public login(username?: string, password?: string) {
    // this._adal.login();
    // this.authContext.login()
    return this._http.get('http://192.168.0.18:8080/msal4jsample/secure/aad')
      .pipe(
        map(user => {
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        console.log('user---------------', user);
        return user;
      }));
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
