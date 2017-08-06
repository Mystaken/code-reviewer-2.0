import { Component } from '@angular/core'
import { Http } from '@angular/http'
import { ApiService } from './api.service'

@Component({
	selector: 'create-new-work',
	template: `
		<div>

			<md-input-container>
				<input mdInput placeholder="Work name" [(ngModel)]="work_name">
			</md-input-container>

			<md-select placeholder="Number of peers" [(ngModel)]="num_peers">
 				<md-option *ngFor="let num of num_peers_options" [value]="num">
    				{{ num }}
  				</md-option>
			</md-select>

			<!-- deadlines 
			<br>
			<md-checkbox>
				Enable student submission:
			</md-checkbox>
			<md-input-container>
				<input mdInput [mdDatepicker]="student_submission" placeholder="Submission deadline">
				<button mdSuffix [mdDatepickerToggle]="student_submission"></button>
			</md-input-container>
			<md-datepicker #student_submission></md-datepicker>

			<br>
			<md-checkbox>
				Enable self review:
			</md-checkbox>
			<md-input-container>
				<input mdInput [mdDatepicker]="self_review" placeholder="Self review deadline">
				<button mdSuffix [mdDatepickerToggle]="self_review"></button>
			</md-input-container>
			<md-datepicker #self_review></md-datepicker>

			<br>
			<md-checkbox>
				Enable peer review:
			</md-checkbox>
			<md-input-container>
				<input mdInput [mdDatepicker]="peer_review" placeholder="Peer review deadline">
				<button mdSuffix [mdDatepickerToggle]="peer_review"></button>
			</md-input-container>
			<md-datepicker #peer_review></md-datepicker>
-->
			<div>
				<div type="submit" class="btn btn-success" (click)="submit();">Submit</div>


				<div type="reset" class="btn btn-success">Reset</div>
			</div>

		</div>
	`,
	styles: [`

	`]
})



export class CreateNewWorkComponent {

	num_peers_options = [0, 1, 2, 3, 4, 5, 6, 7];

	work_name = "enter work name here";
	num_peers = 0;

	submit() {
		console.log(1);
		console.log(this.work_name, this.num_peers);
		return this.apiService
			.createNewWork(this.work_name, this.num_peers)
			.subscribe(p=>p);
	}


	constructor(private apiService: ApiService) {
    }

}
