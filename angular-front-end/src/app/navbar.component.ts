import { Component } from '@angular/core'
import { Http } from '@angular/http';
@Component({
  selector: 'navbar',
  template: `
  <div class="navbar">

    <div class="stage-buttons">
      <div *ngFor="let tab of tabs">
        <button md-raised-button [mdMenuTriggerFor]="menu" class="ui blue button">
            {{ tab.tab_name }}
            <a class="ui orange circular label">2</a>
        </button>

        <!-- dropdown -->
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
    </div>
    <div class="utility-buttons">
      <button md-raised-button class="ui blue button">
        {{ username }}
      </button>
      <button md-raised-button class="ui blue button">
        Logout
      </button>
    </div>
  </div>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
    }
    .stage-buttons {
      text-align: left;
      display: flex;
    }
    .utility-buttons {
      text-align: right;
    }

  `]
})




export class NavbarComponent {
  // color of buttons
  color = ["Red", "Orange", "Yellow", "Olive", "Green"];
  username = "The Student's Name"
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
    tab_name: "Review My Peers",
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
    tab_name: "How My Code Is Reviewed",
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
    tab_name: "Quality of My Reviews",
        sub_tab_names: [
      {
        id: "workId:kkasdlkfjasldkfj",
        name: "Assignment 0"
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
