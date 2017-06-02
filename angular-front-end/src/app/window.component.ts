import { Component, Input } from '@angular/core';


@Component({
  selector: 'window-component',
  template: `
	<md-card class="example-card">
	  	<img height="180px" md-card-image src="../favicon.ico">
	  	<div class="window">
	  		<div class="center">
	        	<div class="window-title">
	          		<div> 
	          			{{ window_name }}
	          		</div>
	        	</div>
          		<div class="window-deadline">
            		{{ deadline }}
          		</div>

		    	<md-checkbox color="warn">Done!</md-checkbox>

	    	</div>
	  	</div>
	</md-card>
  `,
  styles: [`
	window-component {
	  border-bottom: 10px;
	  border-color: grey;
	  width: 0px;

	}

  	.example-card {
	  width: 200px;
	  margin: 10px;
	  border-bottom: grey;
	  border-width: 10px;
	}

	.example-header-image {
	  background-image: url("../favicon.ico");
	  background-size: cover;
	}

	.center {
		margin: auto;
    display: inline-block;
	}

	.window-title {
	  	font-weight: bold;
	  	font-size: 20px;
	}

	.window {
		display: inline-block;
		cursor: pointer;
	}

	.window-title:hover {
		text-decoration: underline;
	}

	.window-deadline {
	  display: inline;
	  font-style: italic;
	  font-size: 15px;
	  width: 100px;
	}

	.window-deadline:hover {
		text-decoration: underline;
	}
  `]
})
export class WindowComponent {

	@Input() window_name = "A1 Submission";
	@Input() deadline = "May 29, 2017";


}