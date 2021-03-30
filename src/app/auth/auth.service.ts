import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}>) {
  }

  initAuthListener(): void {
    this.afAuth.authState.subscribe(user => {
      user ? this.authorizedRedirect()
        : this.unauthorizedRedirect();
    });
  }

  registerUser(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.isAuthenticated = true)
      .catch(err => {
        this.uiService.showSnackBar(err.message, null, 3000);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({type: 'STOP_LOADING'});
      });

  }

  login(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});

    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.isAuthenticated = true)
      .catch(err => {
        this.uiService.showSnackBar(err.message, null, 3000);
        this.store.dispatch({type: 'STOP_LOADING'});
      });
  }

  logout(): void {
    this.afAuth.signOut().then(() => null);
  }

  private unauthorizedRedirect(): void {
    this.store.dispatch({type: 'STOP_LOADING'});
    this.trainingService.cancelSubscriptions();
    this.authChange.next(false);
    this.router.navigate(['/login']).then(() => this.isAuthenticated = false);
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  private authorizedRedirect(): void {
    this.store.dispatch({type: 'STOP_LOADING'});
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']).then(() => null);
  }
}
