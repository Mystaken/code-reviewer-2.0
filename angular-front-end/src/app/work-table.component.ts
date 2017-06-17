import { Component,ViewEncapsulation, ViewChild, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { ApiService } from './api.service'


@Component({
    selector: 'work-table',
    templateUrl: './work-table.component.html',
    styleUrls: ['./work-table.component.css']
})


export class WorkTableComponent {

    rows: any[];

    constructor(private _apiService: ApiService) {
        this.getWorks();
    } 

    getWorks(): void {
        this._apiService
            .getWorks()
            .subscribe(data => this.rows = data);
    }

    ngOnInit(): void {
        this.getWorks();
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
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }

}