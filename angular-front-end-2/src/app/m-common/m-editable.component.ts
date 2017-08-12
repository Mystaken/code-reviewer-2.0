import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'm-editable',
  templateUrl: './m-editable.component.html',
  styleUrls: ['./m-editable.component.css']
})
export class MEditableComponent {
  @Input() value;
  @Input() onChange;
  editting = false;
  changes;
  ngOnInit() {
    this.changes = this.value;
  }
  change() {
    this.editting = false;
    this.value = this.changes;
    this.onChange(this.changes);
  }
  reject() {
    this.changes = this.value;
    this.editting = false;
  }
  setChanged() {

  }
}
