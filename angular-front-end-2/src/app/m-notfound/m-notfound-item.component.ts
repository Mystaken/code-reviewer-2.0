import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-notfound-item',
  templateUrl: './m-notfound-item.component.html',
  styleUrls: ['./m-notfound-item.component.css']
})
export class MNotFoundItemComponent {
  @Input() name = "item"
}
