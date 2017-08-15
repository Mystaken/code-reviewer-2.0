import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MSubmissionsService } from './m-submissions.service';
import { MAssignmentsService } from '../m-assignments/m-assignments.service';
import { SessionUserService } from '../services/session-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'm-submissions',
  templateUrl: './m-submissions.component.html',
  styleUrls: ['./m-submissions.component.css']
})
export class MSubmissionsComponent {
  work_id;
  exists = false;
  assignment;
  submission;
  selected = ""
  selectedFile;

  constructor(private _assignmentsAPI: MAssignmentsService,
    private _submissionsAPI: MSubmissionsService,
    private route:ActivatedRoute,
    private _userService: SessionUserService
    ) {
    this.work_id = this.route.snapshot.params['id'];
    this._assignmentsAPI.getAssignment({
      work_id: this.work_id
    }).subscribe((res) => {
      this.assignment = res;
      this.assignment.required_files = res.required_files.map(function(file) {
        return { name: file, has_uploaded: false };
      });
      this.exists = true;
    });
  }
  ngOnInit() {
    this.submissionFeedback();
  }

  submissionFeedback() {
    return this._submissionsAPI.getSubmission({
        work_id: this.work_id,
        author_id: this._userService.getUserID()
      }).subscribe((res) => {
        this.submission = res;
        return Observable.forkJoin(
          this.submission.files.map((file_id) => this._submissionsAPI.getSubmissionFile({ submission_file_id: file_id }))
        ).subscribe(res => {
          this.exists = true;
          this.submission.files = res;
          this.assignment.required_files.forEach((file) => {
            let fList = this.submission.files.filter((f) => (f.name === file.name));
            file.has_uploaded = fList.length > 0;
            if (file.has_uploaded) {
              file.submission_file_id = fList[0].submission_file_id;
            }
          });
          this.selected = 'feedback';
        });
      });
  }

  selectFile(file, i) {
    if (!file.has_uploaded) {
      return;
    }
    this.assignment.required_files.forEach((f) => f.selected = false);
    file.selected = true;
    this.selectedFile = i;
  }
}
