import {Component} from '@angular/core';


@Component({
  selector: 'window-component',
  template: `
	 <md-card class="example-card">
	 	<!-- comment out
	  <md-card-header>
	    <div md-card-avatar class="example-header-image"></div>
	    <md-card-title>Assignment 1</md-card-title>
	    <md-card-subtitle>Dog Breed</md-card-subtitle>
	  </md-card-header>
	  		-->
	  <img md-card-image src="../favicon.ico">
	  <!-- adding description of this stage later
	  <md-card-content>
	  </md-card-content>
	  		-->
	  <div class="window">
	  	<div class="center">
	        <div class="window-title">
	          <div> A1 My Work/Submission </div>
	        </div>
          <div class="window-deadline">
            May 29, 2017 
          </div>
		    <md-checkbox color="warn">Done!</md-checkbox>
	    </div>
	  </div>
	</md-card>
  `,
  styles: [`
  	.example-card {
	  width: 400px;
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
		overflow: hidden;
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


}