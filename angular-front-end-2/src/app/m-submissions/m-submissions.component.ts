import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MSubmissionsService } from './m-submissions.service';
import { MAssignmentsService } from '../m-assignments/m-assignments.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'm-submissions',
  templateUrl: './m-submissions.component.html',
  styleUrls: ['./m-submissions.component.css']
})
export class MSubmissionsComponent {
  exists = false;
  assignment;
  submission;
  constructor(private _assignmentsAPI: MAssignmentsService, private _submissionsAPI: MSubmissionsService, private route:ActivatedRoute) {
    this._submissionsAPI.getSubmission({
        submission_id: this.route.snapshot.params['id']
      }).subscribe((res) => {
        this.submission = res;
        return this._assignmentsAPI.getAssignment({ 
          work_id: res.work_id
        }).subscribe((res) => {
          this.assignment = res;
          this.assignment.required_files = res.required_files.map(function(file) {
            return { name: file, has_uploaded: false };
          });
          return Observable.forkJoin(
            this.submission.files.map((file_id) => this._submissionsAPI.getSubmissionFile({ submission_file_id: file_id }))
          ).subscribe(res => {
            this.exists = true;
            this.submission.files = res;
            this.assignment.required_files.forEach((file) => {
              file.has_uploaded = (this.submission.files.filter((f) => (f.name === file.name)).length > 0)
            });
          });
        });
      })
  }
}
