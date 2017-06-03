import { Component } from '@angular/core'
import { Http } from '@angular/http';
@Component({
  selector: 'navbar',
  template: `
  <div class="navbar">

    <div class="stage-buttons">
      <ul>
        <li *ngFor="let tab of tabs" md-raised-button [mdMenuTriggerFor]="menu">
          <a href="#">{{ tab.tab_name }}</a>

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
        </ul>
    </div>
    <div class="user-info">
        {{ username }}&nbsp;(<a href="#">Logout</a>)
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
    .user-info {
      margin: 18px 20px 0 0;
    }

    ul {
      margin: 0px;
      padding: 0px;
    }

    ul li {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      width: 100px;
      margin: 0 10px 0 0;
      text-indent: 35px;
      position: relative;
    }

    ul li:before {
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      left: -2px;
      border-style: solid;
      border-width: 25px 0 25px 25px;
      border-color: transparent transparent transparent #fff;
      z-index: 0;
    }

    ul li:first-child:before {
      border-color: transparent;
    }

    ul li a:after {
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      right: -25px;
      border-style: solid;
      border-width: 25px 0 25px 25px;
      border-color: transparent transparent transparent #ccc;
      z-index: 10;
    }

    ul li.active a {
      background: #4fc3f7;
      z-index: 100;
    }

    ul li.active a:after {
      border-left-color: #4fc3f7;
    }

    ul li a {
      display: block;
      background: #ccc;
      padding-left: 5px;
    }

    ul li a:hover {
      background: #4fc3f7;
    }

    ul li a:hover:after {
      border-color: transparent transparent transparent #4fc3f7;
    }

  `]
})




export class NavbarComponent {
  // color of buttons
  color = ["Red", "Orange", "Yellow", "Olive", "Green"];
  username = "The Student's Name"
  tabs = [{
    tab_name: "Submit",
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
    tab_name: "Review",
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
    tab_name: "Reflect",
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
    tab_name: "Marks",
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
