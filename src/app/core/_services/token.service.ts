import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY) as string;
  }

  checkLogged(): boolean {
    return typeof this.getToken() === 'string';
  }

  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}
