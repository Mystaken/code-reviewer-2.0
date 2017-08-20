import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MHeaderModule } from '../m-header/m-header.module';
import { MFooterModule } from '../m-footer/m-footer.module';
import { MCommonModule } from '../m-common/m-common.module';
import { MNotFoundModule } from '../m-notfound/m-notfound.module';

import { MSubmissionsComponent } from './m-submissions.component';
import { MReviewComponent } from './m-review.component';

import { MAssignmentsService } from '../m-assignments/m-assignments.service';
import { MSubmissionsService } from './m-submissions.service';


@NgModule({
  declarations: [
    MSubmissionsComponent,
    MReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MHeaderModule,
    MFooterModule,
    MCommonModule,
    MNotFoundModule
  ],
  exports: [
    MSubmissionsComponent,
    MReviewComponent
  ],
  providers: [
    MAssignmentsService,
    MSubmissionsService
  ]
})
export class MSubmissionsModule { }
