import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
  private email_regex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor() { }

  public isValidEmail(email: string): boolean {
    return this.email_regex.test(email);
  }

}
