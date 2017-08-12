import { Component, Output } from '@angular/core';

import { MStudentsService }   from './m-students.service';
import { ValidationService }  from '../services/validation.service';

@Component({
  selector: 'm-students-all',
  templateUrl: './m-students-all.component.html',
  styleUrls: ['./m-students-all.component.css']
})
export class MStudentsAllComponent {
  students = [];

  constructor(private _studentAPI: MStudentsService) {}
  ngOnInit() {
    this._studentAPI.getAllStudents({})
      .subscribe((res) => this.students = res);
  }

  addStudent(user_id) {
    this._studentAPI
      .getStudent({ user_id: user_id })
      .subscribe((res) => this.students.push(res));
  }

  updateStudent(student, type) {
    var self = this;
    return function(value) {
      var params = {
        user_id: student.user_id
      };
      params[type] = value
      return self._studentAPI.updateStudent(params).subscribe(
        (res) => student[type]=value);
    }
  }
}
