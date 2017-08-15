import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MAssignmentsService } from '../m-assignments/m-assignments.service';

@Component({
  selector: 'm-dashboard-sidebar',
  templateUrl: './m-dashboard-sidebar.component.html',
  styleUrls: ['./m-dashboard-sidebar.component.css']
})
export class MDashboardSidebarComponent {
  assignments = [];
  constructor(private _assignmentsAPI: MAssignmentsService, private router: Router) {
    this._assignmentsAPI
      .getAllAssignments({})
      .subscribe((res) => {
        this.assignments = res;
      });
  }

  selectAssignment(work_id) {
    this.router.navigate(['/submissions/' + work_id]);
  }
}
