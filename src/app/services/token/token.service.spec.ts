import { TestBed, inject } from '@angular/core/testing';
import { TokenService } from './token.service';
import { TokenModel } from '../../models/token.model';
import { UserModel } from '../../models/user.model';

describe('TokenService', () => {
  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [TokenService]
      });

      let store = {};
      spyOn(localStorage, 'getItem').and.callFake((key) => {
        return store[key];
      });
      spyOn(localStorage, 'setItem').and.callFake((key, value) => {
        return store[key] = value + '';
      });
      spyOn(localStorage, 'removeItem').and.callFake(() => {
          store = {};
      });
  });

  it('should ...', inject([TokenService], (service: TokenService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to set the token', inject([TokenService], (service: TokenService) => {
     service.clearToken();
     const fakeToken = new TokenModel('', 10, '', new UserModel('test@email.com'));
     service.setToken(fakeToken);
     expect(service.getToken()).toBeTruthy();
  }));

  it('should get the users token', inject([TokenService], (service: TokenService) => {
     service.clearToken();
     service.setToken(new TokenModel('', 10, '', new UserModel('test@email.com')));
     const fakeToken =  service.getToken();
     expect(fakeToken.user).toBeDefined();
     expect(fakeToken.user.email).toBe('test@email.com');
  }));

  it('should clear the users token', inject([TokenService], (service: TokenService) => {
     service.setToken(new TokenModel('', 10, '', new UserModel('test@email.com')));
     service.clearToken();
     expect(() => service.getToken()).toThrow(new Error('no token exists'));
  }));

  it('should throw an exception when trying to get an empty token', inject([TokenService], (service: TokenService) => {
     expect(() => service.getToken()).toThrow(new Error('no token exists'));
  }));

  it('should clear the token if it has expired',  inject([TokenService], (service: TokenService) => {
      service.setToken(new TokenModel('', 10, '2016-05-31T15:20:00Z', new UserModel('test@email.com')));
      const expired = service.hasTokenExpired();
      expect(expired).toBe(true);
      expect(() => service.getToken()).toThrow(new Error('no token exists'));
  }));

  it('should keep the token stored if it has not expired',  inject([TokenService], (service: TokenService) => {
      service.setToken(new TokenModel('', 10, '2999-05-31T15:20:00Z', new UserModel('test@email.com')));
      const expired = service.hasTokenExpired();
      expect(expired).toBe(false);
      expect(service.getToken()).toBeDefined();
  }));
});
