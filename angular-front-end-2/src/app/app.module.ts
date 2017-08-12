import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { MHeaderModule } from './m-header/m-header.module';
import { MDashboardModule } from './m-dashboard/m-dashboard.module';
import { MNotFoundModule } from './m-notfound/m-notfound.module';
import { MAssignmentsModule } from './m-assignments/m-assignments.module';
import { MStudentsModule } from './m-students/m-students.module';
import { MSubmissionsModule } from './m-submissions/m-submissions.module'
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    MHeaderModule,
    MDashboardModule,
    MNotFoundModule,
    MAssignmentsModule,
    MStudentsModule,
    MSubmissionsModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
