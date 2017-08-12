import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from '../routing.module';
import { MFooterComponent } from './m-footer.component';

@NgModule({
  declarations: [
    MFooterComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  exports: [
    MFooterComponent
  ],
  providers: [],
  bootstrap: [
    MFooterComponent
  ]
})
export class MFooterModule { }
