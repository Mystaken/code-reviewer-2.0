import { Component } from '@angular/core'

@Component({
	selector: 'site-map',
	template: `
		<div class="site-map">
			<div class="stage-list" *ngFor="let work of works">
				<window-component *ngFor="let stage of stages"
				[window_name]="work + ' ' +stage"
				[deadline]="May"></window-component>
			</div>
		</div>
	`,
	styles: [`
	.stage-list {
		display: flex;
	}
	`]
})



export class SiteMapComponent {
	stages = ["My Work", "Review My Own Work", "Review My Peers", 
				"How My Code Is Reviewed", "Quality of My Reviews"];

	// in chronological order
	works = ["ex1", "a1", "a2"];


}