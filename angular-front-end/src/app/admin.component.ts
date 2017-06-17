import { Component } from '@angular/core'

@Component({
	selector: 'admin',
	template: `
		<md-tab-group>

		  <md-tab label="Works">
		  	<work-table> </work-table>
		  </md-tab>

		  <md-tab label="Students">
		  	<student-table> </student-table>
		  </md-tab>

		  <md-tab label="TA's">
		  	TA's
		  </md-tab>
		  
		</md-tab-group>
	`,
	styles: [`

	`]
})


export class AdminComponent {
	tab = "works";

}