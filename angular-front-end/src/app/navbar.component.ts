import { Component } from '@angular/core'
import { Http } from '@angular/http';
@Component({
  selector: 'navbar',
  template: `
  <div class="navbar">
  <div class="navbar-desktop">
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
          <md-icon>assignment</md-icon>
          <span>{{ sub_tab_name.name }}</span>
          </button>
        </md-menu>
        </li>
      </ul>
    </div>
    <div>
      <span>{{ username }}</span>
      <button class="nav-btn">
        <md-icon>exit_to_app</md-icon>
      </button>
    </div>
  </div>
  <div class="navbar-mobile">
    <div class="overlay"></div>
    <div class="nav-btn-bar">
      <button class="nav-btn" onclick="$('.sidebar, .overlay').show();">
        <md-icon>menu</md-icon>
      </button>
    </div>
    <div class="sidebar">
      <button class="nav-btn" onclick="$('.sidebar, .overlay').hide();">
        <md-icon>clear</md-icon>
      </button>
      <hr>
      <div class="user-info-mobile">
        {{ username }}&nbsp;(<a href="#">Log&nbsp;out</a>)
      </div>
      <div>
        <hr>
        <aside id="sidebar" class="sidebar sidebar-default open" role="navigation">
          <ul class="nav sidebarnav">
            <li class="dropdown" *ngFor="let tab of tabs">
              <a class="ripple-effect dropdown-toggle" href="#" data-toggle="dropdown">
              <b class="caret"></b>
              {{ tab.tab_name }}
              </a>
              <ul class="nav sidebarnav submenu">
                <li *ngFor="let sub_tab_name of tab.sub_tab_names">
                  <a href="#" tabindex="-1">
                  {{ sub_tab_name.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
  `,
  styles: [`
    @media (max-width: 1023px) {
       div.navbar-desktop {
          display: none !important;
       }
    }

    @media (min-width: 1024px) {
       div.navbar-mobile {
          display: none !important;
       }
    }

    div.overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      z-index: 9998;
      display: none;
    }

    .navbar {
      border-width: 0px;
    }

    .navbar-desktop {
      display: flex;
      justify-content: space-between;
      overflow-x: hidden;
    }

    .navbar-desktop a {
      color: #E8EAF6;
      transition: background-color 0.3s ease;
    }

    .navbar-desktop a:hover {
      color: #E8EAF6;
      text-decoration: underline;
    }

    .navbar-desktop span {
      color: #E8EAF6;
      position: relative;
      bottom: 4px;
    }

    .stage-buttons {
      text-align: left;
      display: flex;
    }

    button.nav-btn {
      margin: 8px 10px;
    }

    button.nav-btn>md-icon {
      position: relative;
      top: 3px;
    }

    .stage-buttons ul {
      margin: 0px;
      padding: 0px;
    }

    .stage-buttons ul li {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      width: 100px;
      margin: 0 10px 0 0;
      text-indent: 35px;
      position: relative;
      left: -15px;
    }

    .stage-buttons ul li:before {
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      border-style: solid;
      border-width: 25px 0 25px 25px;
      border-color: transparent transparent transparent #3F51B5;
      z-index: 0;
    }

    .stage-buttons ul li:first-child:before {
      border-color: transparent;
    }

    .stage-buttons ul li a:after {
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      right: -25px;
      border-style: solid;
      border-width: 25px 0 25px 25px;
      border-color: transparent transparent transparent #5C6BC0;
      z-index: 10;
      transition: border-color 0.3s ease;
    }

    .stage-buttons ul li.active a {
      background: #4fc3f7;
      z-index: 100;
    }

    .stage-buttons ul li.active a:after {
      border-left-color: #4fc3f7;
    }

    .stage-buttons ul li a {
      display: block;
      background: #5C6BC0;
      padding-left: 8px;
    }

    .stage-buttons ul li a:hover {
      background: #7986CB;
    }

    .stage-buttons ul li a:hover:after {
      border-color: transparent transparent transparent #7986CB !important;
    }

    div.nav-btn-bar {
      height: 50px;
    }

    div.sidebar {
      width: 256px;
      background-color: #FFF;
      position: fixed;
      height: calc(100% + 50px);
      z-index: 9999;
      top: -50px;
      padding-top: 50px;
    }

    a.sidebar-item {
      margin-top: 50px;
      margin-left: 30px;
    }

    button+hr {
      margin-top: 0;
    }

    ul.submenu {
      display: none;
    }

    li.open ul.submenu {
      display: block;
    }

    div.sidebar {
      display: none;
    }

    div.user-info-mobile {
      padding-left: 15px;
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
    tab_name: "Results",
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
