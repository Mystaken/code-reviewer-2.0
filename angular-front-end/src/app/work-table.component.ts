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

    getWorks() {
        this._apiService
            .getWorks()
            .subscribe(data => this.rows = data);
    }

    ngOnInit() {
        this.getWorks();
    }


    expanded: any = {};
    timeout: any;
    num_peers_options = [0, 1, 2, 3, 4, 5, 6, 7];
    work_name = "";
    num_peers = 0;

    @ViewChild('myTable') table: any;

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }

    toggleExpandRow(row) {
        console.log(this.table.rowDetail);
        console.log('Toggled Expand Row!', row);
        this.work_name = row.name;
        this.num_peers = row.num;
        console.log(this.work_name);
        this.table.rowDetail.toggleExpandRow(row);
    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }


    // to remove row.$$expanded and row.$$index
    createQuery(row) {
        var query = {
            name: row.name,
            num_peers: row.num_peers,
            status: row.status,
            feedback_questions: row.feedback_questions,
            required_files: row.required_files,
            work_id: row.work_id
        };
        return query;

    }

    loadSubmission(row) {
        //TODO:
        // read file `row.repo_path + "/" + utorid + "/" + required_file` i forgot..

        // you will need to call this._apiService.createSubmission(..) 
        // and this._apiService.createSubmissionFile(...)
        // those two functions are not implemented.. I will do it when I wake up 
        // just assume they are there.
        // or you can simple console what you read from file for testing

        // show a message saying successful loaded..

    }

    edit(row) {
        console.log(row.work_id);
        console.log(row);

        return this._apiService
            .editWork(this.createQuery(row))
            .subscribe(function(data) {

            });
    }

}