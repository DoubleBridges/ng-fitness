import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) { }

  initAuthListener(): void {
    this.afAuth.authState.subscribe(user => {
      user ? this.authorizedRedirect()
        : this.unauthorizedRedirect();
    });
  }
  registerUser(authData: AuthData): void {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => null)
      .catch(err => console.log(err));
  }

  login(authData: AuthData): void {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => null)
      .catch(err => console.log(err));
  }

  logout(): void{
    this.afAuth.signOut().then(() => null);
  }

  private unauthorizedRedirect(): void {
    this.trainingService.cancelSubscriptions();
    this.authChange.next(false);
    this.router.navigate(['/login']).then(() => this.isAuthenticated = false);
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  private authorizedRedirect(): void {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']).then(() => null);
  }
}
