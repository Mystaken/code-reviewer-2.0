import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RoutingModule } from '../routing.module';
import { MHeaderComponent } from './m-header.component';


@NgModule({
  declarations: [
    MHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RoutingModule
  ],
  exports: [
    MHeaderComponent
  ],
  providers: [],
  bootstrap: [
    MHeaderComponent
  ]
})
export class MHeaderModule { }
