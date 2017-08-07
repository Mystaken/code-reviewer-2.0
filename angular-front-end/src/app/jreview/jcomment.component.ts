import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'j-comment',
    host: {
    '(document:click)': 'close($event)',
    },
    templateUrl: './jcomment.component.html',
    providers: [],
    styles : [],
    styleUrls: [
        './jcomment.component.css'
    ]
})
export class JcommentComponent {
    @Input() 
    comments;
    show: Boolean;

    constructor(private el: ElementRef) {
        this.show = false;
    }
    open() {
        console.log(1);
        this.show = true;
    }
    close(event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.show = false;
        }
    }
}