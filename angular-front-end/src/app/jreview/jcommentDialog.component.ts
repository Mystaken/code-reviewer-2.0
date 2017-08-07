import { Component, ElementRef } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'j-comment-dialog',
    templateUrl: './jcommentDialog.component.html',
    providers: [],
    styles : [],
    styleUrls: [
        './jcommentDialog.component.css'
    ]
})
export class JcommentDialogComponent {
    constructor(private el: ElementRef, public dialogRef: MdDialogRef<JcommentDialogComponent>) {

    }

    addComment() {
        this.dialogRef.close(this.el.nativeElement.querySelector("#new-comment").value);
    }
}