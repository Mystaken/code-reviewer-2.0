import { Component, EventEmitter, Output } from '@angular/core';

import { MAssignmentsService } from './m-assignments.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'm-assignments-add',
  templateUrl: './m-assignments-add.component.html',
  styleUrls: ['./m-assignments-add.component.css']
})
export class MAssignmentsAddComponent {
  @Output() assignmentAdded = new EventEmitter();
  submittingAssignment = false;
  pendingAssignment;

  feedbackQuestions;

  newFeedback = "";
  newRequiredFile = "";
  addNew = false;
  test;
  newAssignmentsMsg = {
    show: false,
    type: 'warning',
    message: ''
  };

  actionsDropdown = {
    useLabels: false
  }

  constructor(private _assignmentsAPI: MAssignmentsService,
    private _validator: ValidationService) {
    this.newAssignment();
    this.getAllFeedbackQuestions();
  }

  showTest() {
    console.log("**", this.test);
  };

  addAssignment() {
    var err,
      errors = false,
      assignment = this.pendingAssignment;
    // validation
    err = this._validator.validateString(assignment.name.content, {empty: true});
    if (err.errors.length) {
      assignment.name.error = true;
      errors = true;
    }
    err = this._validator.validateString(assignment.repo_path.content, {empty: true});
    if (err.errors.length) {
      assignment.repo_path.error = true;
      errors = true;
    }
    err = this._validator.validateString(assignment.folder_name.content, {empty: true});
    if (err.errors.length) {
      assignment.folder_name.error = true;
      errors = true;
    }

    err = this._validator.validateInt(assignment.num_peers.content, {min: 1});
    if (err.errors.length) {
      assignment.num_peers.error = true;
      errors = true;
    }
    if (errors) {
      return;
    }

    //api request
    return this._assignmentsAPI
      .addAssignment({
        name: this.pendingAssignment.name.content,
        num_peers: parseInt(this.pendingAssignment.num_peers.content),
        required_files: this.pendingAssignment.required_files.content,
        feedback_questions: this.pendingAssignment.feedback_questions.content,
        repo_path: this.pendingAssignment.repo_path.content,
        folder_name: this.pendingAssignment.folder_name.content,
      }).subscribe(response => {
          this.showAssignmentsMsg({
            type: 'green',
            message: 'Successfully added assignment.'
          });
          this.assignmentAdded.emit(response);
          this.newAssignment();
        },
        error => {
          this.showAssignmentsMsg({
            type: 'red',
            message: 'Failed to add assignment.'
          });
      });
  }

  newAssignment() {
    this.pendingAssignment = {
      repo_path: {
        content: "",
        error: false
      },
      folder_name: {
        content: "",
        error: false
      },
      feedback_questions: {
        content: [],
        error: false
      },
      required_files: {
        content: [],
        error: false
      },
      name: {
        content: "",
        error: false
      },
      num_peers: {
        content: 0,
        error: false
      },
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      submission_deadline: {
        content: null,
        error: false
      },
      peer_review_deadline: {
        content: null,
        error: false
      },
      mark_release_date: {
        content: null,
        error: false
      }
    };
  }


  createFeedbackQuestion() {
    if (this.newFeedback) {
      this._assignmentsAPI
        .createFeedbackQuestion({
          feedback_question: this.newFeedback
        }).subscribe(response => {
          this.getAllFeedbackQuestions();
          this.newFeedback = "";
        });
    }
  }
  addRequiredFile() {
    if (this.newRequiredFile) {
      this.pendingAssignment.required_files.content.push(this.newRequiredFile);
      this.newRequiredFile = "";
    }
  }

  showAssignmentsMsg(opt) {
    this.newAssignmentsMsg.type = opt.type;
    this.newAssignmentsMsg.message = opt.message;
    this.newAssignmentsMsg.show = true;
  }
  closeAssignmentsMsg() {
    this.newAssignmentsMsg.show = false;
  }

  getAllFeedbackQuestions() {
    this._assignmentsAPI
      .getAllFeedbackQuestions({})
      .subscribe(response => {
        this.feedbackQuestions = response;
      });
  }

  addFeedbackQuestion(feedback_question) {
    var index = this.pendingAssignment.feedback_questions.content.indexOf(feedback_question);
    if (index > -1) {
      this.pendingAssignment.feedback_questions.content.splice(index, 1);
    } else {
      this.pendingAssignment.feedback_questions.content.push(feedback_question);
    }
    console.log(this.pendingAssignment.feedback_questions.content);
  }
}
