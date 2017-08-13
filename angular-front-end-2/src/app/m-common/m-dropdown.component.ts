import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-dropdown',
  templateUrl: './m-dropdown.component.html',
  styleUrls: ['./m-dropdown.component.css']
})
export class MDropdownComponent {
  @Input() modalClass = "";
  @Input() settings: dropdownOptions;
  dropdown: HTMLElement
  constructor(private parentElement: ElementRef) {}

  ngAfterViewInit(): void {
    $('.ui.dropdown').dropdown(this.settings);
  }
}
export interface dropdownOptions {
  actions?: String
}