import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authToken = '';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private usernameSubject = new BehaviorSubject<string | null>(this.getUsername());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  checkLoginStatus(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  login(username: string, password: string) {
    this.authToken = `${username}_${password}`;
    localStorage.setItem('authToken', this.authToken);
    localStorage.setItem('username', username);
    this.isLoggedInSubject.next(true);
    this.usernameSubject.next(username);
  }

  logout() {
    this.authToken = '';
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false);
    this.usernameSubject.next(null);
  }
}
