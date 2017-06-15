import { Component,ViewEncapsulation, ViewChild, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { ApiService } from './api.service'


@Component({
    selector: 'work-table',
    templateUrl: './work-table.component.html',
    styleUrls: ['./work-table.component.css']
})



export class WorkTableComponent {

  data_from_service: any[];

  constructor(private _apiService: ApiService) {
    this.getData();
  }

  getData(): void {
    this._apiService
        .getPost()
        .subscribe(res => this.data_from_service = res.data);
    // console.log(result);
  }

  ngOnInit(): void {
  }




  @ViewChild('myTable') table: any;

  fold = true;


  rows = [
        {
            "id": 0,
            "name": "A0",
            "stage": "Marks Released",
            "deadline": "no deadline",
            "address": {
                "state": "South Carolina",
                "city": "Glendale"
            }
        },
        {
            "id": 1,
            "name": "A1",
            "stage": "Peer Review",
            "deadline": "June 15, 2017",
            "address": {
                "state": "Arizona",
                "city": "Beaverdale"
            }
        },
        {
            "id": 2,
            "name": "A2",
            "stage": "Submission",
            "deadline": "June 7, 2017",
            "address": {
                "state": "New Mexico",
                "city": "Grazierville"
            }
        }
    ];


  expanded: any = {};
  timeout: any;







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