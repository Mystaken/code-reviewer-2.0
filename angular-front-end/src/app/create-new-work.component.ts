import { Component } from '@angular/core'

@Component({
	selector: 'create-new-work',
	template: `
		<div>
			<md-input-container>
 				<input mdInput placeholder="Work Name" value="A0">
			</md-input-container>
			<md-select placeholder="Number of Peers">
 				<md-option *ngFor="let num of num_peers_options">
    				{{ num }}
  				</md-option>
			</md-select>

			<!-- deadlines -->
			<br>
			<md-checkbox>
				Enable Student Submission:
			</md-checkbox>
			<md-input-container>
				<input mdInput [mdDatepicker]="student_submission" placeholder="Submission Deadline">
				<button mdSuffix [mdDatepickerToggle]="student_submission"></button>
			</md-input-container>
			<md-datepicker #student_submission></md-datepicker>

			<br>
			<md-checkbox>
				Enable Self Review:
			</md-checkbox>
			<md-input-container>
				<input mdInput [mdDatepicker]="self_review" placeholder="Self Review Deadline">
				<button mdSuffix [mdDatepickerToggle]="self_review"></button>
			</md-input-container>
			<md-datepicker #self_review></md-datepicker>

			<br>
			<md-checkbox>
				Enable Peer Review:
			</md-checkbox>
			<md-input-container>
				<input mdInput [mdDatepicker]="peer_review" placeholder="Peer Review Deadline">
				<button mdSuffix [mdDatepickerToggle]="peer_review"></button>
			</md-input-container>
			<md-datepicker #peer_review></md-datepicker>

		</div>
	`,
	styles: [`

	`]
})



export class CreateNewWorkComponent {
	num_peers_options = [0, 1, 2, 3, 4, 5, 6, 7];
}