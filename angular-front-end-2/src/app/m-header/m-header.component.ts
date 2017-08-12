import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-header',
  templateUrl: './m-header.component.html',
  styleUrls: ['./m-header.component.css']
})
export class MHeaderComponent {
  @Input()
  selected;
}
