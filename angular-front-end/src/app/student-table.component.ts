import { Component,ViewEncapsulation, ViewChild } from '@angular/core'
import { Http } from '@angular/http'
import { ApiService } from './api.service'

@Component({
	selector: 'student-table',
	templateUrl: './student-table.component.html',
    styleUrls: ['./work-table.component.css']
})


export class StudentTableComponent {

    rows : any[];

    constructor(private _apiService: ApiService) {
        this.getStudents();
    }

    getStudents(): void {
        this._apiService
            .getStudents()
            .subscribe(data => this.rows = data);
    }

    ngOnInit(): void {
    }

    test() {
        console.log(this.rows);
    }

    expanded: any = {};
    timeout: any;


    @ViewChild('myTable') table: any;


    fold = true;

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          console.log('paged!', event);
        }, 100);
    }

    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }

}