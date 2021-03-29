import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) { }

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.successfulAuth();
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.successfulAuth();
  }

  logout(): void{
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(): User {
    return { ...this.user };
  }

  isAuth(): boolean {
    return this.user != null;
  }
  private successfulAuth(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
