import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

import { LoginService } from '../app/services/login/login.service';
import { TokenService } from '../app/services/token/token.service';
import { LoginGuard } from '../app/guards/login.guard';
import { DashboardService } from '../app/services/dashboard/dashboard.service';
import { ValidationService } from '../app/services/common/validation.service';

import { AppRoutingModule, RoutableComponents } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RoutableComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    LoginService,
    TokenService,
    DashboardService,
    LoginGuard,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



