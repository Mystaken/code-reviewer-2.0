import { Component, EventEmitter, Output } from '@angular/core';

import { MStudentsService } from './m-students.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'm-students-add',
  templateUrl: './m-students-add.component.html',
  styleUrls: ['./m-students-add.component.css']
})
export class MStudentsAddComponent {
  @Output() studentAdded = new EventEmitter();
  addingStudent = false;
  newStudentMsg = {
    show: false,
    type: 'warning',
    message: ''
  };
  pendingStudent: any;
  allStudents: any[];
  displayStudents: any[];
  addNew = false;


  constructor(private _studentAPI: MStudentsService, private _validator: ValidationService) {
    this.newStudent();
  }

  newStudent() {
    this.pendingStudent = {
      first_name: {
        content: "",
        error: false,
        type: 'string'
      },
      last_name: {
        content: "",
        error: false,
        type: 'string'
      },
      email: {
        content: "",
        error: false,
        type: 'string'
      },
      utorid: {
        content: "",
        error: false,
        type: 'string'
      },
      student_number: {
        content: "",
        error: false,
        type: 'number'
      }
    };
  }

  addStudent() {
    var i,
      content,
      error,
      validation;
    for (i in this.pendingStudent) {
      if (this.pendingStudent.hasOwnProperty(i)) {
        content = this.pendingStudent[i].content;
        if (this.pendingStudent[i].type === 'string') {
          validation = this._validator.validateString(content, { empty: true });
          if (validation.errors.length) {
            this.pendingStudent[i].error = true;
            error = true;
          } else {
            this.pendingStudent[i].content = validation.content;
          }
        } else if (this.pendingStudent[i].type === 'number') {
          validation = this._validator.validateString(content, { empty: true });
          if (validation.errors.length) {
            this.pendingStudent[i].error = true;
            error = true;
          } else {
            this.pendingStudent[i].content = validation.content;
          }
        }
      }
    }
    if (error) {
      return;
    }
    this.addingStudent = true;
    return this._studentAPI
      .addStudent({
        first_name: this.pendingStudent.first_name.content,
        last_name: this.pendingStudent.last_name.content,
        utorid: this.pendingStudent.utorid.content,
        email: this.pendingStudent.email.content,
        student_number: this.pendingStudent.student_number.content,
      }).subscribe(response => {
          this.showStudentMsg({
            type: 'green',
            message: 'Successfully added student.'
          });
          this.newStudent();
          this.studentAdded.emit(response);
          this.addingStudent = false;
        },
        error => {
          this.showStudentMsg({
            type: 'red',
            message: 'Failed to add student.'
          });
          this.addingStudent = false;
      });
  }

  showStudentMsg(opt) {
    this.newStudentMsg.type = opt.type;
    this.newStudentMsg.message = opt.message;
    this.newStudentMsg.show = true;
  }

  closeStudentMsg() {
    this.newStudentMsg.show = false;
  }
}
