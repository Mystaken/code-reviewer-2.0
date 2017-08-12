import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MNotFoundComponent } from './m-notfound.component';
import { MNotFoundItemComponent } from './m-notfound-item.component';

@NgModule({
  declarations: [
    MNotFoundComponent,
    MNotFoundItemComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    MNotFoundComponent,
    MNotFoundItemComponent
  ],
  providers: []
})
export class MNotFoundModule { }
