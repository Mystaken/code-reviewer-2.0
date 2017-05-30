import { Component } from '@angular/core'
import { Http } from '@angular/http';
@Component({
	selector: 'navbar',
	template: `
	<div *ngFor="let tab of tabs"> 
		<button md-button [mdMenuTriggerFor]="menu">
		  	{{ tab.tab_name }}
		</button>
		<md-menu #menu="mdMenu">
		  <button 
		  	md-menu-item 
		  	*ngFor="let sub_tab_name of tab.sub_tab_names"
		  	(click)="on_click(tab.tab_name ,sub_tab_name.id);"
		  	>
		    <md-icon>dialpad</md-icon>
		    <span>{{ sub_tab_name.name }}</span>
		  </button>
		</md-menu>
	</div>
	`,
	styles: [`


	`]
})

export class NavbarComponent {
	tabs = [{
		tab_name: "My Work",
		sub_tab_names: [
			{
				id: "workId:kkasdlkfjasldkfj",
				name: "Assignment 0"
			},{
				id: "workId:kkasdlkfjasldkfj",
				name: "Assignment 1"
			},{
				id: "workId:kkasdlkfjasldkfj",
				name: "Assignment 2"
			}
		]
	},{
		tab_name: "Review My Own Work",
		sub_tab_names: [
			{
				id: "workId:kkasdlkfjasldkfj",
				name: "Assignment 0"
			},{
				id: "workId:kkasdlkfjasldkfj",
				name: "Assignment 1"
			}
		]
	}, {
		tab_name: "Review My Own Work",
		sub_tab_names: [
			{
				id: "workId:kkasdlkfjasldkfj",
				name: "Assignment 0"
			},{
				id: "workId:kkasdlkfjasldkfj",
				name: "Assignment 1"
			}
		]
	}
	]

	on_click = console.log;

	constructor (private http: Http) {
	}
	// an example of ajax request
  	// title = this.http.get('localhost:3000/api');
}
