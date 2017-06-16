import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private _loginService: LoginService, private _router: Router) {}

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(next, state);
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url = state ? state.url : '';
        return this.redirect(url);
    }

    public redirect(previousUrl: string): boolean {
      if (this._loginService.isLoggedIn()) {
            return true;
        } else {
            this._router.navigate(['/login'], { queryParams: { redirectTo: previousUrl } });
      }
      return false;
    }
}
