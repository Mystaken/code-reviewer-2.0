import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MHeaderModule } from '../m-header/m-header.module';
import { MFooterModule } from '../m-footer/m-footer.module';
import { MCommonModule } from '../m-common/m-common.module';

import { MStudentsService } from './m-students.service';

import { MStudentsAddComponent } from './m-students-add.component';
import { MStudentsComponent } from './m-students.component';
import { MStudentsAllComponent } from './m-students-all.component';

@NgModule({
  declarations: [
    MStudentsAllComponent,
    MStudentsComponent,
    MStudentsAddComponent
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
    MStudentsAllComponent,
    MStudentsComponent,
    MStudentsAddComponent
  ],
  providers: [
    MStudentsService
  ]
})
export class MStudentsModule { }
