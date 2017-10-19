import { Component, ViewChild, OnInit } from '@angular/core';

import { MStudentsAllComponent } from './m-students-all.component';

import { MStudentsService } from './m-students.service';
import { ValidationService } from '../services/validation.service';


@Component({
  selector: 'm-students',
  templateUrl: './m-students.component.html',
  styleUrls: ['./m-students.component.css']
})
export class MStudentsComponent {
  constructor(private _studentAPI: MStudentsService, private _validator: ValidationService) {
    this._studentAPI
      .getAllStudents({});
  }
}
