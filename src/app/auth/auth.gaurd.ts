import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate = (): boolean | Promise<boolean> =>
    this.authService.isAuth() ? true
      : this.router.navigate(['/login'])
}
