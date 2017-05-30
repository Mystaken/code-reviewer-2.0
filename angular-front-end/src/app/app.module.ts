import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MdCheckboxModule, MaterialModule } from '@angular/material';

import { WindowComponent } from './window.component'
import { TodoListComponent } from './todo-list.component'
import { NavbarComponent} from './navbar.component'


@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    TodoListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MdCheckboxModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
