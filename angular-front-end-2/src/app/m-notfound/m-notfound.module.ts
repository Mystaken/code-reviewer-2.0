import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MNotFoundComponent } from './m-notfound.component';
import { MNotFoundItemComponent } from './m-notfound-item.component';
import { MNotLoggedInComponent } from './m-notloggedin.component';
@NgModule({
  declarations: [
    MNotFoundComponent,
    MNotFoundItemComponent,
    MNotLoggedInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MNotFoundComponent,
    MNotFoundItemComponent,
    MNotLoggedInComponent
  ],
  providers: []
})
export class MNotFoundModule { }
