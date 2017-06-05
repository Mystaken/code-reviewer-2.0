import { Component } from '@angular/core'

@Component({
	selector: 'work-table',
	template: `
		<table class="ui selectable inverted table">
			<thead>
				<tr>
					<th>Work name</th>
					<th>Status</th>
					<th>Number of peers</th>
					<th>Next deadline</th>
				</tr>
			</thead>

			<tbody>
				<tr *ngFor="let row of table_content">
					<td *ngFor="let data of row">
						{{ data }}
					</td>
				</tr>
				<tr>
					<td colspan="4">
						<b> add a new work ... </b>
					</td>
				</tr>
			</tbody>
		</table>
	`,
	styles: [`
	`]
})

export class WorkTableComponent {
	table_content = [
		["A0", "Marks Released (950/950)", 3, "May 31, 2017"],
		["A1", "Open Submission (678/899)", 3, "June 22, 2017"],
		["A2", "Created", "-", null]
	]

	data = `alice1,Alice,Harrington,1001232131,alice.harrington@mail.utoronto.ca
bob1,Bob,Cheng,100235656,bob.cheng@mail.utoronto.ca
carol1,Carol Estrada,100564651,carol.estrada@mail.utoronto.ca
david1,David Tafliovich,10006565456,david.tafliovich@mail.utoronto.ca
eve,Eve Brestcher,1000654654,eve.brestcher@mail.utoronto.ca
frank1,Frank Pancer,1000654654,frank.pancer@mail.utoronto.ca
grace1,Grace Sans,10000897,grace.sans@mail.utoronto.ca
heidi1,Heidi Shroeder,100065203984,heidi.shroeder@mail.utoronto.ca`.split('\n')
	.map(e=>e.split(','))
	.map(function(row) {
		return {
			id: row[0],
			first_name: row[1],
			last_name: row[2],
			student_number: row[3],
			email: row[4]
		}
	});

	constructor() {
		console.log(this.data);
	}
}
