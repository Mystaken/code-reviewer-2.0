import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-dropdown',
  templateUrl: './m-dropdown.component.html',
  styleUrls: ['./m-dropdown.component.css']
})
export class MDropdownComponent implements AfterViewInit {
  @Input() class = '';
  @Input() settings = {};
  constructor(private _el: ElementRef) {}

  ngAfterViewInit(): void {
    $(this._el.nativeElement.children[0]).dropdown(this.settings);
  }
}
