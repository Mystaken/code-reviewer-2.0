import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JreviewComponent } from './jreview.component';
import { JcommentComponent } from './jcomment.component'; //remove me later
import { JcommentDialogComponent } from './jcommentDialog.component';
@NgModule({
    declarations: [
        JreviewComponent,
        JcommentDialogComponent,
        JcommentComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    exports: [
        JreviewComponent
    ],
    providers: [],
    bootstrap: [ JreviewComponent ],
    entryComponents: [ JcommentDialogComponent ]
})
export class JreviewModule {

}
