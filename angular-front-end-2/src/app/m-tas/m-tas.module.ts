import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MHeaderModule } from '../m-header/m-header.module';
import { MFooterModule } from '../m-footer/m-footer.module';
import { MCommonModule } from '../m-common/m-common.module';

import { MTasService } from './m-tas.service';

import { MTasAddComponent } from './m-tas-add.component';
import { MTasComponent } from './m-tas.component';
import { MTasAllComponent } from './m-tas-all.component';

@NgModule({
  declarations: [
    MTasAllComponent,
    MTasComponent,
    MTasAddComponent
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
    MTasAllComponent,
    MTasComponent,
    MTasAddComponent
  ],
  providers: [
    MTasService
  ]
})

export class MTasModule { }
