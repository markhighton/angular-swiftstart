import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { TokenService } from '../../services/token/token.service';
import { ValidationService } from '../../services/common/validation.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UserModel } from '../../models/user.model';
import { IdentityModel } from '../../models/identity.model';
import { TokenModel } from '../../models/token.model';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const fakeIdentity =
   Observable.of(new IdentityModel(true, [], new TokenModel('', 20, '' , new UserModel('test@survey-me.com'))));

  const mockedLoginService  = {
    isLoggedIn: jasmine.createSpy('isLoggedIn'),
    login: jasmine.createSpy('login')
                        .and
                        .returnValue(fakeIdentity)
  };
  const mockedTokenService = {
    setToken: jasmine.createSpy('setToken')
  };
  const mockedRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockedValidationService = new ValidationService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ LoginComponent ],
      providers: [
        {provide: LoginService, useValue: mockedLoginService},
        {provide: TokenService, useValue: mockedTokenService},
        {provide: Router, useValue: mockedRouter},
        {provide: ValidationService, useValue: mockedValidationService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an invalid login message when the password is empty', () => {
        component.email = 'validemailaddress@survey-me.com';
        component.password = '';
        component.rememberMe = false;
        mockedLoginService
          .isLoggedIn
          .and
          .returnValue(false);

        component.login();
        expect(component.messages).toContain('Password must be supplied.');
  });


  it('should display an invalid login message when the email address is empty', () => {
        component.email = '';
        component.password = '';
        component.rememberMe = false;
        mockedLoginService
          .isLoggedIn
          .and
          .returnValue(false);

        component.login();
        expect(component.messages).toContain('Email address must be supplied.');

  });

    it('should display an invalid login message when the email address is invalid', () => {
        component.email = '12234';
        component.password = '';
        component.rememberMe = false;
        mockedLoginService
          .isLoggedIn
          .and
          .returnValue(false);

        component.login();
        expect(component.messages).toContain('Invalid email address.');

  });


  describe('login()', () => {

      it('should call the login() method of the fake login service', () => {
        component.email = 'test@survey-me.com';
        component.password = 'password1';
        component.rememberMe = false;
        component.login();
        expect(mockedLoginService.login).toHaveBeenCalled();
      });

      it('should call the setToken() method of the fake token service', () => {
        component.email = 'test@survey-me.com';
        component.password = 'password1';
        component.rememberMe = false;
        component.login();
        expect(mockedTokenService.setToken).toHaveBeenCalled();
      });

      it('should call the navigate() method of the fake router', () => {
        component.email = 'test@survey-me.com';
        component.password = 'password1';
        component.rememberMe = false;
        mockedLoginService
          .isLoggedIn
          .and
          .returnValue(true);

        component.login();

        expect(mockedRouter.navigate).toHaveBeenCalled();
      });

    });


});
