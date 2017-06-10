import { Component, ElementRef, OnInit } from '@angular/core'

@Component({
    selector: 'edit-student',
    template: `
        <div>
            <md-input-container>
                <input mdInput placeholder="First Name" value="Alice">
            </md-input-container>

            <md-input-container>
                <input mdInput placeholder="Last Name" value="Harrington">
            </md-input-container>

            <md-select placeholder="Current Status" id="selection" [(ngModel)]="status">
                <md-option *ngFor="let status of status_list" [value]="status">
                    {{ status }}
                </md-option>
            </md-select>

            <div>
                <button type="submit" class="btn btn-success">Submit</button>

                <button type="reset" class="btn btn-success">Reset</button>
            </div>
        </div>

    `

})


export class EditStudent {

    status = "Active"; // populate from api

    status_list = ["Active", "Inactive", "Suspended"];

    constructor (private el: ElementRef) {

    }
    

    ngAfterViewInit() {
        var a = this.el.nativeElement.querySelector("#selection");
        console.log(a)
    }
}