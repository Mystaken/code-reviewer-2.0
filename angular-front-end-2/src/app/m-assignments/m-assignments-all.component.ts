import { Component } from '@angular/core';

import { MAssignmentsService } from './m-assignments.service';

@Component({
  selector: 'm-assignments-all',
  templateUrl: './m-assignments-all.component.html',
  styleUrls: ['./m-assignments-all.component.css']
})
export class MAssignmentsAllComponent {
  assignments = []
  feedbackQuestions = {};
  xx = true;
  actionsDropdown = {
    action: "combo"
  }

  constructor(private _assignmentsAPI: MAssignmentsService) {}

  ngOnInit() {
    this._assignmentsAPI.getAllAssignments({})
      .subscribe((res) => {
        this.assignments = res;
      });

    this._assignmentsAPI.getAllFeedbackQuestions({})
      .subscribe((res) => {
        for (var i = 0; i < res.length; i ++) {
          this.feedbackQuestions[res[i].feedback_question_id] = res[i].feedback_question
        }
      });
  }


  test(event, assignment){
    var text;
    if (!event.target.innerText) {
      text = event.target.parentNode.innerText;
    } else {
      text = event.target.innerText;
    }

    
    if (text === "Load Works") return this.loadSubmissions(assignment);
    if (text === "Load Files") return this.loadSubmissionFiles(assignment);
    if (text === "Distribute") return this.distribute(assignment);
    if (text === "Delete") return 1

  }

  release(assignment, type) {
    var params = {
      work_id: assignment.work_id
    };
    params[type] = !assignment[type]
    return this._assignmentsAPI.updateAssignment(params).subscribe(
      (res) => assignment[type] = params[type]);
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
    console.log("what");
    return this._assignmentsAPI.getAssignment({
      work_id: work_id
    }).subscribe((res) => {
      this.assignments.push(res);
      // this.loadSubmissions({'work_id':work_id});
    });
  }

  loadSubmissions(assignment) {
    //console.log(assignment);
    return this._assignmentsAPI.loadSubmissions(assignment).subscribe((res) => {console.log("DONEEEEE")});
  }

  loadSubmissionFiles(assignment) {
    //console.log(assignment);
    return this._assignmentsAPI.loadSubmissionFiles(assignment).subscribe((res) => {console.log("doneee")});
  }

  distribute(assignment) {
    //console.log(assignment);
    return this._assignmentsAPI.distribute(assignment).subscribe((res) => {console.log(res)});
  }
}
