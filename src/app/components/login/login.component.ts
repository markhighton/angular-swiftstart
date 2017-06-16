import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { TokenService } from '../../services/token/token.service';
import { ValidationService } from '../../services/common/validation.service';
import { UserModel } from '../../models/user.model';
import { IdentityModel } from '../../models/identity.model';
import { TokenModel } from '../../models/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  public email: string;
  @Input()
  public password: string;
  @Input()
  public rememberMe: boolean;

  public messages: string[];

  constructor(
     private _loginService: LoginService,
     private _tokenService: TokenService,
     private _router: Router,
     private _validationService: ValidationService) { }

  ngOnInit() {
     this.goToDashboard();
  }

  private goToDashboard() {
     if (this._loginService.isLoggedIn()) {
          this._router.navigate(['']);
     }
  }

  public login(): void {
        this.messages = [];
        if (!this.email) {
            this.messages.push('Email address must be supplied.');
            return;
        }

        if (!this._validationService.isValidEmail(this.email)) {
            this.messages.push('Invalid email address.');
            return;
        }

        if (!this.password) {
            this.messages.push('Password must be supplied.');
            return;
        }

        const user =  new UserModel(this.email);
        user.password = this.password;
        user.rememberMe = this.rememberMe;
        this._loginService.login(user)
            .subscribe(
                (response: IdentityModel) => {

                   this.messages = response.Messages;
                   if (response.Token) {
                      this._tokenService.setToken(response.Token);
                      this.goToDashboard();
                   }
                },
                (error: any) => {
                    console.log(error);
                });
    }

}
