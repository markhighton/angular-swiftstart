import { Injectable } from '@angular/core';
import { TokenModel } from '../../models/token.model';

@Injectable()
export class TokenService {

  constructor() { }

  public getToken(): TokenModel {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('no token exists');
    }
    return JSON.parse(token) as TokenModel;
  }

  public setToken(token: TokenModel): void {
    if (!token) {
      throw new Error('no token to store');
    }

    localStorage.setItem('token', JSON.stringify(token));
  }

  public clearToken(): void {
     localStorage.removeItem('token');
  }

  public hasTokenExpired(): boolean {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      return true;
    }

    const token = JSON.parse(storedToken) as TokenModel;
    const currentDateTime = new Date();
    const tokenExpiryDateTime = new Date(token.expires_at);
    if (currentDateTime >= tokenExpiryDateTime) {
      this.clearToken();
      return true;
    }
    return false;

  }

}
