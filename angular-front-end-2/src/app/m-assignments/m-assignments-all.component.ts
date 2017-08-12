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
    }).subscribe((res) => this.assignments.push(res));
  }
}
