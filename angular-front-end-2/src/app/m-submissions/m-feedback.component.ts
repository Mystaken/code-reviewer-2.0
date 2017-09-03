import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MCodeComponent } from '../m-common/m-code.component';
import { MSubmissionsService } from './m-submissions.service';

@Component({
  selector: 'm-feedback',
  templateUrl: './m-feedback.component.html',
  styleUrls: ['./m-feedback.component.css']
})
export class MFeedbackComponent {
  /* the feedback for this feedback */
  @Input() feedback;
  /* The submission of this feedback */
  submission: any = {};
  /* The selected file */
  selectedFile: number = -1;
  /* All annotations for this feedback */
  allAnnotations: any = {};
  /* The annotations for the current selected file. */
  annotations = [];

  constructor(private _submissionsAPI: MSubmissionsService) {}

  ngOnInit() {
    return this._submissionsAPI.getSubmission({
        work_id: this.feedback.work_id,
        author_id: this.feedback.author
      }).subscribe((res) => {
        this.submission = res;
        return Observable.forkJoin(
            this.submission.files.map((file_id) => this._submissionsAPI.getSubmissionFile({ submission_file_id: file_id }))
          ).subscribe((res) => {
            this.submission.files = res;
            this._submissionsAPI.getAllAnnotations({
              submission_id: this.submission.submission_id
            }).subscribe((res) => {
              this.allAnnotations = res;
              this.selectFile(0);
            })
          })
      });
  }
  ngOnChanges(val) {
  console.log(this.feedback);
    if (this.submission.submission_id && 
      this.allAnnotations.annotations &&
      this.feedback)
    this.selectFile(this.selectedFile);
  }

  selectFile(i) {
    this.selectedFile = i;
    console.log(1);
    this.annotations = this.allAnnotations.annotations.filter((annotation) => {
      return annotation.submission_file_id == this.submission.files[i].submission_file_id &&
        annotation.review_by == this.feedback.review_by;
    });
  }
}
