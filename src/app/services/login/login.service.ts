import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { IdentityModel } from '../../models/identity.model';
import { TokenModel } from '../../models/token.model';
import { UserModel } from '../../models/user.model';
import { AppSettings } from '../../app.settings';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private _apiUrl = `${AppSettings.ACCOUNT_URL}/login`;

  constructor(private _http: Http, private _tokenService: TokenService, private _router: Router) { }

  public login(user: UserModel): Observable<IdentityModel> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post(this._apiUrl, user, options)
                         .map((resp: Response) => resp.json());
  }

  public logout(): void {
     this._tokenService.clearToken();
     this._router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const expired = this._tokenService.hasTokenExpired();
    return !expired;
  }

}
