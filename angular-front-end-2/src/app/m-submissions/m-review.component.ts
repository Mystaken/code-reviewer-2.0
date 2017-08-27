import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

import { MCodeComponent } from '../m-common/m-code.component';
import { MSubmissionsService } from './m-submissions.service';
import { MAssignmentsService } from '../m-assignments/m-assignments.service';

@Component({
  selector: 'm-review',
  templateUrl: './m-review.component.html',
  styleUrls: ['./m-review.component.css']
})
export class MReviewComponent {
  /* the feedback for this review */
  @Input() review;
  /* The submission of this review */
  submission: any = {};
  /* The selected file */
  selectedFile: number = -1;
  /* The codeblock */
  @ViewChild('codeblock') codeblock: MCodeComponent;
  /* All annotations for this review */
  allAnnotations: any = {};
  /* The annotations for the current selected file. */
  annotations = [];
  /* the current review (to check for changes) */
  oldReview;
  /* The feedback questions */
  feedbackQuestions = [];
  /* The feedbacks */
  feedbacks = [];

  constructor(private _submissionsAPI: MSubmissionsService,
              private _assignmentsAPI: MAssignmentsService) {
  }

  ngOnInit() {
    $('.comment.button').mousedown(function(event) {
      event.preventDefault();
    });
    this.oldReview = this.review;
    this.getSubmission(0);
    this.getFeedbackQuestions();
    //this.getNewFeedbacks(this.oldReview);
  }

  ngOnChanges(val) {
    
    this.updateFeedbacks(this.oldReview);

    if (this.submission.submission_id && 
      this.allAnnotations.annotations &&
      this.review) {
      if (this.review.feedback_id !== this.oldReview.feedback_id) {
        this.getSubmission(this.selectedFile)
      } else {
        this.selectFile(this.selectedFile);
      }
      this.oldReview = this.review;
    }
  }

  getSubmission(i) {
    return this._submissionsAPI.getSubmission({
        work_id: this.review.work_id,
        author_id: this.review.author
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
              this.selectFile(i);
            })
          })
      });
  }
  selectFile(i) {
    this.selectedFile = i;
    this.annotations = this.allAnnotations.annotations.filter((annotation) => {
      return annotation.submission_file_id == this.submission.files[i].submission_file_id;
    });
  }

  newAnnotation(annotation) {
    let newAnnotation =  {
      submission_id: this.submission.submission_id,
      submission_file_id: this.submission.files[this.selectedFile].submission_file_id,
      annotation: annotation.annotation,
      start: annotation.start,
      end: annotation.end
    }
    this._submissionsAPI.addAnnotation(newAnnotation)
      .subscribe((res) => {
        this.annotations = this.annotations.concat([newAnnotation]);
        this.allAnnotations.annotations.push(newAnnotation);
      });
  }

  getFeedbackQuestions() {
    this._assignmentsAPI.getAssignment({
      work_id: this.review.work_id
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

  updateFeedbacks(review) {
    if (review) {
      this._submissionsAPI.updateFeedbacks({
        feedback_id: review.feedback_id,
        feedbacks: this.feedbacks,
        mark : 0 // TODO
      }).subscribe((res) => {
        return this.getNewFeedbacks(this.review);
      })
    } else {
      return this.getNewFeedbacks(this.review);
    }
  }

  getNewFeedbacks(review) {
    this.feedbacks = review.feedbacks;
    // fill out with "" if feedbacks === []
    if (this.feedbacks.length === 0) {
      for (var i = 0; i < this.feedbackQuestions.length; i ++) {
        this.feedbacks.push("");
      }
    }
  }
}
