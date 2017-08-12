import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MHeaderModule } from '../m-header/m-header.module';
import { MFooterModule } from '../m-footer/m-footer.module';
import { MDashboardComponent } from './m-dashboard.component';
import { MAnnouncementComponent } from './m-announcement.component';
import { MDashboardSidebarComponent } from './m-dashboard-sidebar.component';

@NgModule({
  declarations: [
    MDashboardComponent,
    MAnnouncementComponent,
    MDashboardSidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MHeaderModule,
    MFooterModule
  ],
  exports: [
    MDashboardComponent
  ],
  providers: [],
  bootstrap: []
})
export class MDashboardModule { }
