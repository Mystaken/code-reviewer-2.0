import { Component } from '@angular/core'

@Component({
    selector: 'edit-student',
    template: `
        <form>
            <md-input-container>
                <input mdInput placeholder="First Name" value="Alice">
            </md-input-container>

            <md-input-container>
                <input mdInput placeholder="Last Name" value="Harrington">
            </md-input-container>

            <md-select placeholder="Current Status">
                <md-option *ngFor="let status of status_list" [value]="status">
                    {{ status }}
                </md-option>
            </md-select>

            <div>
                <button type="submit" class="btn btn-success">Submit</button>

                <button type="reset" class="btn btn-success">Reset</button>
            </div>
        </form>

    `,

})


export class EditStudent {

    status_list = ["Active", "Inactive", "Suspended"];
}