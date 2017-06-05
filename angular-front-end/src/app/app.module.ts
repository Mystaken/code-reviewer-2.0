import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MdCheckboxModule, MaterialModule, MdNativeDateModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { WindowComponent } from './window.component'
import { TodoListComponent } from './todo-list.component'
import { NavbarComponent} from './navbar.component'
import { SiteMapComponent } from './site-map.component'
import { CreateNewWorkComponent} from './create-new-work.component'
import { WorkTableComponent } from './work-table.component'
import { AdminComponent } from './admin.component'
import { StudentTableComponent } from './student-table.component'


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
    StudentTableComponent
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
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
