// import { Component, EventEmitter, Output } from '@angular/core';

// import { MAssignmentsService } from './m-assignments.service';
// import { ValidationService } from '../services/validation.service';

// @Component({
//   selector: 'm-feedbacks-add',
//   templateUrl: './m-feedbacks-add.component.html',
//   styleUrls: ['./m-feedbacks-add.component.css']
// })
// export class MFeedbacksAddComponent {
//   @Output() assignmentAdded = new EventEmitter();
//   submittingAssignment = false;
//   pendingFeedbackQuestions;
//   addNew = false;
//   newFeedbackQuestionsMsg = {
//     show: false,
//     type: 'warning',
//     message: ''
//   };

//   constructor(private _assignmentsAPI: MAssignmentsService,
//     private _validator: ValidationService) {
//   }

//   addFeedbackQuestions() {
//     var err,
//       errors = false,
//       feedback = this.pendingFeedbackQuestions;
//     // validation
//     err = this._validator.validateString(feedback.content, {empty: true});
//     if (err.errors.length) {
//       feedback.error = true;
//       errors = true;
//     }

//     if (errors) {
//       return;
//     }

//     //api request
//     return this._assignmentsAPI
//       .addFeedbackQuestions({
//         feedback: this.pendingFeedbackQuestions.content
//       }).subscribe(response => {
//           this.showFeedbackQuestionsMsg({
//             type: 'green',
//             message: 'Successfully added Feedback Question.'
//           });
//           this.assignmentAdded.emit(response);
//           this.pendingFeedbackQuestions.content = "";
//         },
//         error => {
//           this.showFeedbackQuestionsMsg({
//             type: 'red',
//             message: 'Failed to add Feedback Question.'
//           });
//       });
//   }

//   showFeedbackQuestionsMsg(opt) {
//     this.newFeedbackQuestionsMsg.type = opt.type;
//     this.newFeedbackQuestionsMsg.message = opt.message;
//     this.newFeedbackQuestionsMsg.show = true;
//   }
//   closeFeedbackQuestionsMsg() {
//     this.newFeedbackQuestionsMsg.show = false;
//   }
// }
