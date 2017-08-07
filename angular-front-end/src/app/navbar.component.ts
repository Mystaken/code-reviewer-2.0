import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})




export class NavbarComponent {
  ngOnInit() {
    var stageMapping = {
        'Submit': 'submission',
        'Reflect': '',
        'Review': 'j-review',
        'Results': '',
        'Admin stuff': 'admin',
    };

    Object.keys(stageMapping).forEach(function(nextStage) {
      if (stageMapping[nextStage]) {
        $(stageMapping[nextStage]).hide();
      }
    });
  }

  username = 'Student Name';
  tabs = [
    {
      tab_name: 'Submit',
      sub_tab_names: [
        {
          value: 'a1',
          name: 'Assignment 1',
        },
      ],
    },
    {
      tab_name: 'Reflect',
      sub_tab_names: [
        {
          value: 'a1',
          name: 'Assignment 1',
        },
      ],
    },
    {
      tab_name: 'Review',
      sub_tab_names: [
        {
          value: 'a1',
          name: 'Assignment 1',
        },
      ],
    },
    {
      tab_name: 'Results',
      sub_tab_names: [
        {
          id: 'a1',
          name: 'Assignment 1',
        },
      ],
    },
  ];

  onClick = function(stage, workId) {
    var stageMapping = {
        'Submit': 'submission',
        'Reflect': '',
        'Review': 'j-review',
        'Results': '',
        'Admin stuff': 'admin',
    };

    if (stageMapping[stage]) {
      Object.keys(stageMapping).forEach(function(nextStage) {
        if (nextStage === stage) {
          $(stageMapping[nextStage]).show();
        } else {
          $(stageMapping[nextStage]).hide();
        }
      });
    } else {
      alert('Comming soon');
    }
  }

  constructor (private http: Http) {
  }
  // an example of ajax request
    // title = this.http.get('localhost:3000/api');
}
