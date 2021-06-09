import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {delay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

const AUTH_API = environment.API_URL;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth = false;


  constructor(
    private http: HttpClient) {
  }

  // Sign in
  signIn(payload: any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: payload.email,
      password: payload.password
    }, httpOptions);
  }

  // Create a new account
  signUp(payload: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: payload.email,
      password: payload.password,
      name: payload.name,
      username: payload.username
    }, httpOptions);
  }

  // Logout account
  logOut(): void {
    window.localStorage.clear();
    window.location.reload();
  }

  // Request reset password
  resetPassword(payload: any): Observable<any> {
    return this.http.post(AUTH_API + 'reset-password', {
      email: payload
    }, httpOptions).pipe(delay(50));
  }

  // New password
  newPassword(payload: any): Observable<any> {
    return this.http.post(AUTH_API + 'new-password', {
      token: payload.token,
      password: payload.password
    }, httpOptions).pipe(delay(50));
  }

  // Verify account
  verifyAccount(token: string): Observable<any> {
    return this.http.get(AUTH_API + 'verifyAccount/' + token, httpOptions);
  }

  // request Verify
  requestVerify(payload: string): Observable<any> {
    return this.http.post(AUTH_API + 'resendLink', {
      email: payload
    }, httpOptions).pipe(delay(50));
  }
}
