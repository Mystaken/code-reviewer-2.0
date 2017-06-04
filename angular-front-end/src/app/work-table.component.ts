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
}
