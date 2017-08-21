import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAssignmentsService } from '../m-assignments/m-assignments.service';
import { MSubmissionsService } from './m-submissions.service';
import { SessionUserService } from '../services/session-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'm-submissions',
  templateUrl: './m-submissions.component.html',
  styleUrls: ['./m-submissions.component.css']
})
export class MSubmissionsComponent {
  /* The work_id inputted from url */
  work_id;
  /* If work exists */
  exists = false;
  /* The work */
  work;
  /* Index of selected file */
  selectedFile;
  /* Reviews this user needs to review. */
  reviews
  /* The selected review */
  selectedReview = -1;
  /* Feedbacks this user has got from others */
  feedbacks;
  constructor(private _assignmentsAPI: MAssignmentsService,
    private _submissionsAPI: MSubmissionsService,
    private route:ActivatedRoute,
    private _userService: SessionUserService) {}

  ngOnInit(){
    this.work_id = this.route.snapshot.params['id'];
    this._assignmentsAPI.getAssignment({
      work_id: this.work_id
    }).subscribe((res) => {
      this.exists = true;
      this.work = res;
      this.work.required_files;
      this._submissionsAPI.getSubmissionFeedback({
        work_id: this.work.work_id
      }).subscribe(res => {
        this.reviews = res.filter((review) => {
          return review.review_by === this._userService.getUserID()
        });
        this.feedbacks = res.filter((review) => {
          return review.review_by !== this._userService.getUserID()
        });
      });
    });
  }

}
