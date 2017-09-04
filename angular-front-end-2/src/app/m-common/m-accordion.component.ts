import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-accordion',
  templateUrl: './m-accordion.component.html',
  styleUrls: ['./m-accordion.component.css']
})
export class MAccordionComponent {
  @Input() class = "";
  @Input() settings = {};
  constructor(private _el: ElementRef) {}

  ngAfterViewInit(): void {
    $(this._el.nativeElement.children[0]).accordion(this.settings);
  }
}