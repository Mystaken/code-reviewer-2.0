import { Component } from '@angular/core';

import { MAssignmentsService } from './m-assignments.service';

@Component({
  selector: 'm-assignments-all',
  templateUrl: './m-assignments-all.component.html',
  styleUrls: ['./m-assignments-all.component.css']
})
export class MAssignmentsAllComponent {
  assignments = []
  constructor(private _assignmentsAPI: MAssignmentsService) {}

  ngOnInit() {
    this._assignmentsAPI.getAllAssignments({})
      .subscribe((res) => {
        this.assignments = res;
        console.log(res)
      });
  }

  updateAssignment(assignment, type) {
    var self = this;
    return function(value) {
      var params = {
        work_id: assignment.work_id
      };
      params[type] = value
      return self._assignmentsAPI.updateAssignment(params).subscribe(
        (res) => assignment[type]=value);
    }
  }

  addAssignment(work_id) {
    return this._assignmentsAPI.getAssignment({
      work_id: work_id
    }).subscribe((res) => {
      this.assignments.push(res);
      this.loadSubmissions({'work_id':work_id});
    });
  }

  loadSubmissions(assignment) {
    //console.log(assignment);
    return this._assignmentsAPI.loadSubmissions(assignment).subscribe((res) => {console.log("DONEEEEE")});
  }

  loadSubmissionFiles(assignment) {
    //console.log(assignment);
    return this._assignmentsAPI.loadSubmissionFiles(assignment).subscribe((res) => {console.log("DONEEEEE")});
  }

  distribute(assignment) {
    console.log("ts");
    //console.log(assignment);
    return this._assignmentsAPI.distribute(assignment).subscribe((res) => {console.log(res)});
  }



  // distributeStudent(row) {
  //   return this._assignmentsAPI
  //     .getSubmissions({ 'work_id': row.work_id })
  //     .subscribe(function(submissions) {
  //       // SUFFLE  
  //       var len = submissions.lenth;
  //       var current_index = len, temp, random_index;
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

  //       // DISTRIBUTE 
  //       for (var i = 0; i < len; i ++) { // TODO!!! comfirm num_peers (popup)
  //         for (var j = 1; j <= row.num_peers; j ++) {

  //           var query = {
  //             'submission_id': submissions[i].submission_id,
  //             'author': submissions[i].author_id,
  //             'review_by': submissions[(i + j) % len].author_id
  //           }

  //           this._apiService
  //             .createFeedback(query)
  //             .subscribe(data => data)
  //         }
  //       }
  //     })
  // }
}
