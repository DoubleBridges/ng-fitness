import {CanActivate, CanLoad, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';
import * as fromRoot from './auth.reducer';
import {take} from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>) {}

  canActivate = (): Observable<boolean> => this.store.select(fromRoot.getIsAuth).pipe(take(1));
  canLoad = (): Observable<boolean> => this.store.select(fromRoot.getIsAuth).pipe(take(1));

}
