import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-dropdown',
  templateUrl: './m-dropdown.component.html',
  styleUrls: ['./m-dropdown.component.css']
})
export class MDropdownComponent {
  @Input() class = "";
  @Input() settings = {};
  dropdown: HTMLElement
  constructor(private parentElement: ElementRef) {}

  ngAfterViewInit(): void {
    $('.ui.dropdown').dropdown(this.settings);
//     $('.no.label.example .ui.dropdown')
//   .dropdown({
//     useLabels: false
//   })
// ;
  }
}