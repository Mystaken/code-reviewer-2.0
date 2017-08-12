import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'm-assignments',
  templateUrl: './m-assignments.component.html',
  styleUrls: ['./m-assignments.component.css']
})
export class MAssignmentsComponent {
  constructor(private route:ActivatedRoute) {
    console.log(this.route.snapshot.params);
  }
}
