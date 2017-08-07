import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { OnInit } from '@angular/core';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})




export class NavbarComponent {
  // color of buttons
  ngOnInit() {
    // ...
  }
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
