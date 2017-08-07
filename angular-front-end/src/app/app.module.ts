import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MdCheckboxModule, MaterialModule, MdNativeDateModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { JreviewModule } from './jreview/jreview.module'

import { WindowComponent } from './window.component'
import { TodoListComponent } from './todo-list.component'
import { NavbarComponent} from './navbar.component'
import { SiteMapComponent } from './site-map.component'
import { CreateNewWorkComponent} from './create-new-work.component'
import { WorkTableComponent } from './work-table.component'
import { AdminComponent } from './admin.component'
import { StudentTableComponent } from './student-table.component'
import { EditStudentComponent } from './edit-student.component'
import { SubmissionComponent } from './submission.component'
import { TipsComponent } from './tips.component'
import { ApiService } from './api.service'

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    TodoListComponent,
    NavbarComponent,
    SiteMapComponent,
    CreateNewWorkComponent,
    WorkTableComponent,
    AdminComponent,
    StudentTableComponent,
    EditStudentComponent,
    SubmissionComponent,
    TipsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MdCheckboxModule,
    MaterialModule,
    MdNativeDateModule,
    NgxDatatableModule,
    JreviewModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
