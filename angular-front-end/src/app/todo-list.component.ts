import { Component, Input } from '@angular/core'


@Component({
	selector: 'todo-list',
	template: `
		<div class="todo-list">
			<window-component *ngFor="let todo_item of todo_list"
			[window_name]="todo_item.window_name"
			[deadline]="todo_item.deadline"></window-component>
		<div>
	`,
	styles: [`
	.todo-list {
		display: flex;
	}
	`]
})


export class TodoListComponent {
	@Input() todo_list = [{
		window_name: "A2 Submission",
		deadline: "June 1, 2017"
	},{
		window_name: "A1 Peer Review",
		deadline: "June 5, 2017"
	}];
}