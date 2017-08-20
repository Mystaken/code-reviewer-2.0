import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MEditableComponent } from './m-editable.component';
import { MCalendarComponent } from './m-calendar.component';
import { MDropdownComponent } from './m-dropdown.component';
import { MModalComponent } from './m-modal.component';
import { MCheckboxComponent } from './m-checkbox.component';
import { MCodeComponent } from './m-code.component';

@NgModule({
  declarations: [
    MEditableComponent,
    MCalendarComponent,
    MModalComponent,
    MDropdownComponent,
    MCheckboxComponent,
    MCodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    MEditableComponent,
    MCalendarComponent,
    MModalComponent,
    MDropdownComponent,
    MCheckboxComponent,
    MCodeComponent
  ],
  providers: []
})
export class MCommonModule { }
