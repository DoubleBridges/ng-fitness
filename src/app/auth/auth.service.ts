import {Injectable} from '@angular/core';

import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>) {
  }

  initAuthListener(): void {
    this.afAuth.authState.subscribe(user =>
      user ? this.authorizedRedirect()
        : this.unauthorizedRedirect()
    );
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.authorizedRedirect())
      .catch(err => {
        this.uiService.showSnackBar(err.message, null, 3000);
        this.store.dispatch(new UI.StopLoading());
      });

  }

  login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading());

    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.authorizedRedirect())
      .catch(err => {
        this.uiService.showSnackBar(err.message, null, 3000);
        this.store.dispatch(new UI.StopLoading());
      });
  }

  logout(): void {
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.afAuth.signOut().then(() => this.unauthorizedRedirect());
  }

  private unauthorizedRedirect(): void {
    this.store.dispatch(new UI.StopLoading());
    this.trainingService.cancelSubscriptions();
    this.router.navigate(['/login']).then(() => this.store.dispatch(new Auth.SetUnauthenticated()));
  }

  private authorizedRedirect(): void {
    this.store.dispatch(new Auth.SetAuthenticated());
    this.store.dispatch(new UI.StopLoading());
    this.router.navigate(['/training']).then(() => null);
  }
}
