import { TestBed, async, inject } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LoginService } from '../services/login/login.service';

describe('LoginGuard', () => {

  const mockedLoginService = {
    isLoggedIn: jasmine.createSpy('isLoggedIn')
  };
  const mockedRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockedRouterState = {
    url: jasmine.createSpy('url')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard,
       { provide: LoginService, useValue: mockedLoginService},
       { provide: Router, useValue: mockedRouter }]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should allow the a user to navigate if logged in ', inject([LoginGuard], (guard: LoginGuard) => {
    mockedLoginService.isLoggedIn.and.returnValue(true);
    const result = guard.canActivate(null, null);
    expect(result).toBe(true);
  }));

});
