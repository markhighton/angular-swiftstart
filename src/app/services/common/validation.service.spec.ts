import { TestBed, inject } from '@angular/core/testing';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService]
    });
  });

  it('should ...', inject([ValidationService], (service: ValidationService) => {
    expect(service).toBeTruthy();
  }));

  describe('isValidEmail()', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ValidationService]
      });
    });

    it('should validate the email string', inject([ValidationService], (service: ValidationService) => {
        expect(service.isValidEmail('validemail@email.com')).toBe(true);
    }));


    it('should invalidate the email string', inject([ValidationService], (service: ValidationService) => {
        expect(service.isValidEmail('')).toBe(false);
        expect(service.isValidEmail('123')).toBe(false);
        expect(service.isValidEmail('test')).toBe(false);
    }));

  });
});
