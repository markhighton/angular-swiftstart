import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { TokenService } from '../../services/token/token.service';
import { MockBackend } from '@angular/http/testing';
import { IdentityModel } from '../../models/identity.model';
import { UserModel } from '../../models/user.model';
import { TokenModel } from '../../models/token.model';

describe('LoginService', () => {

   const mockedTokenService = {
     clearToken: jasmine.createSpy('clearToken'),
     hasTokenExpired: jasmine.createSpy('hasTokenExpired')
   };

    const mockedRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LoginService,
      {provide: TokenService, useValue: mockedTokenService },
      {provide: XHRBackend, useClass: MockBackend },
      {provide: Router, useValue: mockedRouter }]
    });
  });


  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));


  it('should return an Observable<IdentityModel>',
        inject([LoginService, XHRBackend], (service, mockBackend) => {

        const mockResponse = new IdentityModel(true, [], new TokenModel('', 10, '', new UserModel('test@survey-me.com')));

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
          })));
        });

        service.login(new UserModel('test@survey-me.com')).subscribe((response) => {
          expect(response).toBeDefined();
          // expect(response.Token).toBeDefined();
          // expect(response.Token.user.email).toBe('test@survey-me.com');
        });

    }));

  it('should clear the token when we logout', inject([LoginService], (service: LoginService) => {
      service.logout();
      expect(mockedTokenService.clearToken).toHaveBeenCalled();
  }));

 it('should redirect the user when we logout', inject([LoginService], (service: LoginService) => {
      service.logout();
      expect(mockedRouter.navigate).toHaveBeenCalled();
      expect(mockedRouter.navigate).toHaveBeenCalledWith(['/login']);
  }));


  it('should check the user token expiry', inject([LoginService], (service: LoginService) => {
      service.isLoggedIn();
      expect(mockedTokenService.hasTokenExpired).toHaveBeenCalled();
  }));
});
