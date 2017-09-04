import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MCodeComponent } from '../m-common/m-code.component';
import { MSubmissionsService } from './m-submissions.service';
import { MAssignmentsService } from '../m-assignments/m-assignments.service';


@Component({
  selector: 'm-feedback',
  templateUrl: './m-feedback.component.html',
  styleUrls: ['./m-feedback.component.css']
})
export class MFeedbackComponent {
  /* the feedback for this feedback */
  @Input() feedbacks;
  /* The submission of this feedback */
  submission: any = {};
  /* The selected file */
  selectedFile: number = -1;
  /* All annotations for this feedback */
  allAnnotations: any = {};
  /* The annotations for the current selected file. */
  annotations = [];
  /* The feedback questions */
  feedbackQuestions = [];

  constructor(private _submissionsAPI: MSubmissionsService,
              private _assignmentsAPI: MAssignmentsService) {}

  ngOnInit() {
    this.getFeedbackQuestions();
    return this._submissionsAPI.getSubmission({
        work_id: this.feedbacks[0].work_id,
        author_id: this.feedbacks[0].author
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
    console.log(this.feedbacks);
    if (this.submission.submission_id && 
      this.allAnnotations.annotations &&
      this.feedbacks[0])
    this.selectFile(this.selectedFile);
  }

  selectFile(i) {
    this.selectedFile = i;
    this.annotations = this.allAnnotations.annotations.filter((annotation) => {
      console.log(annotation);
      return annotation.submission_file_id == this.submission.files[i].submission_file_id
    });
  }
   getFeedbackQuestions() {
    this._assignmentsAPI.getAssignment({
      work_id: this.feedbacks[0].work_id
    }).subscribe((work) => {
      for (var i = 0; i < work.feedback_questions.length; i++)  {
        this._submissionsAPI.getFeedbackQuestion({ 
          feedback_question_id : work.feedback_questions[i]
         }).subscribe((res) => {
           this.feedbackQuestions.push(res.feedback_question);
         })
      }
    });
  }
}
