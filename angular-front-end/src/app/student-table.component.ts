import { Component,ViewEncapsulation, ViewChild, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { ApiService } from './api.service'
import 'rxjs/add/operator/map';

@Component({
	selector: 'student-table',
	templateUrl: './student-table.component.html',
    styleUrls: ['./work-table.component.css']
})


export class StudentTableComponent {

    rows: any[];

    constructor(private _apiService: ApiService) {
        this.getStudents();
    }

    getStudents(): void {
        this._apiService
            .getStudents({})
            .subscribe(data => this.rows = data);
    }

    ngOnInit(): void {
        this.getStudents();
    }

    test() {
        console.log(this.rows);
    }

    expanded: any = {};
    timeout: any;

    @ViewChild('myTable') table: any;

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
        row.fold = !row.fold;
    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }

}