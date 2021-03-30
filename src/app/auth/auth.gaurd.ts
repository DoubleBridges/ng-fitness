import {CanActivate, CanLoad, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGaurd implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate = (): boolean | Promise<boolean> =>
    this.authService.isAuth() ? true
      : this.router.navigate(['/login'])

  canLoad = (): boolean | Promise<boolean> =>
    this.authService.isAuth() ? true
      : this.router.navigate(['/login'])
}
