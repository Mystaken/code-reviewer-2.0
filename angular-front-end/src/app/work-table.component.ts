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
  // work_name = "";
  // num_peers = 0;

  @ViewChild('myTable') table: any;

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    row.self_review_message = this.createMessage(row.self_review);
    row.peer_review_message = this.createMessage(row.peer_review);
    row.mark_review_message = this.createMessage(row.mark_review);
    // this.work_name = row.name;
    // this.num_peers = row.num;
    this.table.rowDetail.toggleExpandRow(row);
    this.test();
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
      work_id: row.work_id,
      self_review: row.self_review,
      peer_review: row.peer_review,
      mark_review: row.mark_review
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
      console.log(row);
    return this._apiService
      .editWork(this.createQuery(row))
      .subscribe(function(data) {
      });
  }

  delete(row) {
    return this._apiService
      .deleteWork({'work_id': row.work_id})
      .subscribe(function(data) {
      });
  }


  createMessage(self_review){
    console.log("***", self_review);
    return self_review ? "enabled" : "disabled"
  }

  // !!!!!!!! 
  distributeStudent(row) {
    this._apiService
      .getSubmissions(row.work_id, null)
      .subscribe(function(submissions) {
        // SUFFLE  
        var len = submissions.lenth;
        var current_index = len, temp, random_index;
        // While there remain elements to shuffle...
        while (0 !== current_index) {
          // Pick a remaining element...
          random_index = Math.floor(Math.random() * current_index);
          current_index -= 1;
          // And swap it with the current element.
          temp = submissions[current_index];
          submissions[current_index] = submissions[random_index];
          submissions[random_index] = temp;
        }

        // DISTRIBUTE 
        for (var i = 0; i < len; i ++) { // TODO!!! comfirm num_peers (popup)
          for (var j = 1; j <= row.num_peers; j ++) {

            var query = {
              'submission_id': submissions[i].submission_id,
              'author': submissions[i].author_id,
              'review_by': submissions[(i + j) % len].author_id
            }

            this._apiService
              .createFeedback(query)
              .subscribe(data => data)
          }
        }
      })
  }

  // test() {
  //   var x = null;
  //   if (x) console.log("!!!!!!!!!!!!!!");

  //   var submissions = [1, 2, 3, 4, 5, 6, 7]
  //       var current_index = submissions.length, temp, random_index;
  //       // While there remain elements to shuffle...
  //       while (0 !== current_index) {
  //         // Pick a remaining element...
  //         random_index = Math.floor(Math.random() * current_index);
  //         current_index -= 1;
  //         // And swap it with the current element.
  //         temp = submissions[current_index];
  //         submissions[current_index] = submissions[random_index];
  //         submissions[random_index] = temp;
  //       }
  //       console.log(submissions);
  // }
}
