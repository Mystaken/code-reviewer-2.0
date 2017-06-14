import { Component } from '@angular/core'

@Component({
    selector: 'submission',
    template: `
        <div>
            Work Name: {{ data.name }}
            Submission Deadline: {{ data.student_submission_dead_line }}
        </div>

        <table>
            <tr>
                <th> File Name </th>
                <th> Submit </th>
                <th> Deadline </th>
            </tr>

        <!-- required files (with specified names) -->
        <tr *ngFor="let required_file of data.required_files">
            <td> {{ required_file }}</td>
            <td> <button md-button>  Submit</button> </td> 
            <td> no previous submit </td>
        </tr>
        

        <!-- other files (without specified file names) -->
        <tr>
            <td>
                <md-input-container>
                    <input mdInput value="Submit New File" disabled>
                </md-input-container>
            </td>
            <td> <button md-button>  Submit</button> </td> 
            <td> no previous submit </td>
        </tr>
        </table>
    <div>
    `,
    styles : [`
        table, th, td {
            border: 1px solid black;
        }

    `]
})


export class SubmissionComponent {
    data = {
      "work_id": 123,
      "name": "Assignment 1",
      "num_peers": 5,
      "required_files": [ "a1.py", "a2.py"],
      "feedback_questions": [ "Is this good?" ],
      "repo_path": "assignment/a1",
      "student_submission_dead_line": "2017-12-17",
      "peer_review_deadline": "2017-12-30",
      "ta_review_deadline": "2017-12-30"
   }
}