import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-checkbox',
  templateUrl: './m-checkbox.component.html',
  styleUrls: ['./m-checkbox.component.css']
})
export class MCheckboxComponent {
  @Input() class = '';
  @Input() settings: checkboxOptions;
  @Input() value;
  //@Input() onChange;
  dropdown: HTMLElement;
  constructor(private _el: ElementRef) {}

  ngAfterViewInit(): void {
    $(this._el.nativeElement.children[0]).checkbox(this.settings);
  }
}

export interface checkboxOptions {
}

