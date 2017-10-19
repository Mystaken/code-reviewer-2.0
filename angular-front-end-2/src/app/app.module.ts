import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { CookieModule } from 'ngx-cookie';
import { MHeaderModule } from './m-header/m-header.module';
import { MDashboardModule } from './m-dashboard/m-dashboard.module';
import { MNotFoundModule } from './m-notfound/m-notfound.module';
import { MAssignmentsModule } from './m-assignments/m-assignments.module';
import { MStudentsModule } from './m-students/m-students.module';
import { MTasModule } from './m-tas/m-tas.module';
import { MSubmissionsModule } from './m-submissions/m-submissions.module';
import { RoutingModule } from './routing.module';

import { CookieService } from 'ngx-cookie';
import { APIRoutingService } from './services/api-routing.service';
import { SessionUserService } from './services/session-user.service';
import { ValidationService } from './services/validation.service';
import { AdminGuard } from './guards/admin-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { NotLoginGuard } from './guards/notlogin-guard.service';
import { AuthService } from './services/auth/auth.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    MHeaderModule,
    MDashboardModule,
    MNotFoundModule,
    MAssignmentsModule,
    MStudentsModule,
    MTasModule,
    MSubmissionsModule,
    CookieModule.forRoot()
  ],
  providers: [
    APIRoutingService,
    SessionUserService,
    ValidationService,
    CookieService,
    AuthService,
    AdminGuard,
    AuthGuard,
    NotLoginGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
