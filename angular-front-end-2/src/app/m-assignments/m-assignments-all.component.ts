import { Component, ViewChild } from '@angular/core';

import { MAssignmentsService } from './m-assignments.service';
import { MModalComponent } from '../m-common/m-modal.component';

@Component({
  selector: 'm-assignments-all',
  templateUrl: './m-assignments-all.component.html',
  styleUrls: ['./m-assignments-all.component.css']
})
export class MAssignmentsAllComponent {
  assignments = [];
  feedbackQuestions = {};
  xx = true;
  actionsDropdown = {
    action: 'combo'
  };
  currentAssignment = {
    name: '',
    work_id: ''
  };
  currentLoadedSubmissions = 0;
  currentDistributedStudent = 0;

  @ViewChild('management') management: MModalComponent;
  constructor(private _assignmentsAPI: MAssignmentsService) {}

  ngOnInit() {
    this._assignmentsAPI.getAllAssignments({})
      .subscribe((res) => {
        this.assignments = res;
      });

    this._assignmentsAPI.getAllFeedbackQuestions({})
      .subscribe((res) => {
        for (let i = 0; i < res.length; i ++) {
          this.feedbackQuestions[res[i].feedback_question_id] = res[i].feedback_question;
        }
      });
  }


  // test(event, assignment){
  //   var text;
  //   if (!event.target.innerText) {
  //     text = event.target.parentNode.innerText;
  //   } else {
  //     text = event.target.innerText;
  //   }


  //   if (text === "Load Works") return this.loadSubmissions(assignment);
  //   if (text === "Load Files") return this.loadSubmissionFiles(assignment);
  //   if (text === "Distribute") return this.distribute(assignment);
  //   if (text === "Delete") return this.deleteWork(assignment);

  // }

  release(assignment, type) {
    let params = {
      work_id: assignment.work_id
    };
    params[type] = !assignment[type];
    return this._assignmentsAPI.updateAssignment(params).subscribe(
      (res) => assignment[type] = params[type]);
  }

  updateAssignment(assignment, type) {
    let self = this;
    return function(value) {
      let params = {
        work_id: assignment.work_id
      };
      params[type] = value;
      return self._assignmentsAPI.updateAssignment(params).subscribe(
        (res) => assignment[type] = value);
    };
  }

  addAssignment(work_id) {
    console.log('what');
    return this._assignmentsAPI.getAssignment({
      work_id: work_id
    }).subscribe((res) => {
      this.assignments.push(res);
      // this.loadSubmissions({'work_id':work_id});
    });
  }

  loadSubmissionsAndFiles() {
    if (this.currentAssignment) {
      return this._assignmentsAPI.dropSubmissions(this.currentAssignment)
      .subscribe((res) => {
        return this._assignmentsAPI.dropSubmissionFiles(this.currentAssignment)
        .subscribe((res) => {
          return this._assignmentsAPI.dropFeedbacks(this.currentAssignment)
          .subscribe((res) => {
            return this._assignmentsAPI.loadSubmissions(this.currentAssignment)
            .subscribe((res) => {
              return this._assignmentsAPI.loadSubmissionFiles(this.currentAssignment)
              .subscribe((res) => {
                console.log('doneee');
              });
            });
          });
        });
      });
    }
  }


  distribute() {
    if (this.currentAssignment) {
      return this._assignmentsAPI.dropFeedbacks(this.currentAssignment)
      .subscribe((res) => {
        return this._assignmentsAPI.distribute(this.currentAssignment)
        .subscribe((res) => {console.log(res);
        });
      });

    }
  }

  deleteWork() {
    if (this.currentAssignment) {
      return this._assignmentsAPI.dropSubmissions(this.currentAssignment)
      .subscribe((res) => {
        return this._assignmentsAPI.dropSubmissionFiles(this.currentAssignment)
        .subscribe((res) => {
          return this._assignmentsAPI.dropFeedbacks(this.currentAssignment)
          .subscribe((res) => {
            console.log(res);
          });
        });
      });
    }


  }

   showManagement(assignment) {
     this.currentAssignment = assignment;
     this.management.show({});
    // return this._assignmentsAPI.getSubmissions({work_id: this.currentAssignment.work_id}).subscribe((res) => {
    //   this.currentLoadedSubmissions = res.length;

    //   this.management.show({});
    // });

  }

}

// 1
// student1
// student1
// student1  student1  2017-09-03 01:38:33  59ab5d19fa75e02448ee6202
// 2
// student2
// student2
// student2  student2  2017-09-03 01:38:44  59ab5d24fa75e02448ee6203
// 3
// student3
// student3
// student3  student3  2017-09-03 01:38:53  59ab5d2dfa75e02448ee6204
// 4
// student4
// student4
// student4  student4  2017-09-03 01:39:12  59ab5d40fa75e02448ee6205
// 5
// student5
// student5
// student5  student5  2017-09-03 01:39:23  59ab5d4bfa75e02448ee6206