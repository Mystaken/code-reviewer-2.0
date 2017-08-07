import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service'
import * as $ from 'jquery';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor(private _apiService: ApiService) {
      this.getWorks();
  }

  getWorks() {
    var tabs = [
      {
        tab_name: 'Submit',
        sub_tab_names: [],
      },
      {
        tab_name: 'Reflect',
        sub_tab_names: [],
      },
      {
        tab_name: 'Review',
        sub_tab_names: [],
      },
      {
        tab_name: 'Results',
        sub_tab_names: [],
      },
    ];

    this._apiService
      .getWorks()
      .subscribe(function(data) {
        data.forEach(function(nextWork) {
          if (nextWork.status === 'active') {
            tabs.forEach(function(nextTab) {
              nextTab.sub_tab_names.push({
                value: nextWork.work_id,
                name: nextWork.name,
              });
            });
          }
        });
      });

    return tabs;
  }

  ngOnInit() {
    var stageMapping = {
        'Submit': 'submission',
        'Reflect': '',
        'Review': 'j-review',
        'Results': '',
        'Admin': 'admin',
    };

    Object.keys(stageMapping).forEach(function(nextStage) {
      if (stageMapping[nextStage]) {
        $(stageMapping[nextStage]).hide();
      }
    });
  }

  username = 'Student Name';
  tabs = this.getWorks();

  onClick = function(stage, workId) {
    var stageMapping = {
        'Submit': 'submission',
        'Reflect': '',
        'Review': 'j-review',
        'Results': '',
        'Admin': 'admin',
    };

    if (stageMapping[stage]) {
      $('#empty-state').hide();
      Object.keys(stageMapping).forEach(function(nextStage) {
        if (nextStage === stage) {
          $(stageMapping[nextStage]).show();
        } else {
          $(stageMapping[nextStage]).hide();
        }
      });
    } else {
      alert('Coming soon');
    }
  }
}
