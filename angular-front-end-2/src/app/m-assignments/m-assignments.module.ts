import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MHeaderModule } from '../m-header/m-header.module';
import { MCommonModule } from '../m-common/m-common.module';
import { MFooterModule } from '../m-footer/m-footer.module';

import { MAssignmentsAllComponent } from './m-assignments-all.component';
import { MAssignmentsAddComponent } from './m-assignments-add.component';
import { MAssignmentsComponent } from './m-assignments.component';


import { MAssignmentsService } from './m-assignments.service';

@NgModule({
  declarations: [
    MAssignmentsAllComponent,
    MAssignmentsComponent,
    MAssignmentsAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MHeaderModule,
    MFooterModule,
    MCommonModule
  ],
  exports: [
    MAssignmentsAllComponent,
    MAssignmentsComponent
  ],
  providers: [
    MAssignmentsService
  ]
})
export class MAssignmentsModule { }
