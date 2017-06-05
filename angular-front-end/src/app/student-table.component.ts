import { Component } from '@angular/core'

@Component({
	selector: 'student-table',
	template: `
      <ngx-datatable>
      </ngx-datatable>
	`,
	styles: [`
	`]
})

export class StudentTableComponent {
	table_content = [
		["A0", "Marks Released (950/950)", 3, "May 31, 2017"],
		["A1", "Open Submission (678/899)", 3, "June 22, 2017"],
		["A2", "Created", "-", null]
	]
}