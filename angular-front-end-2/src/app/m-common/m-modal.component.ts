import { Component, Input, AfterViewInit, ElementRef, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-modal',
  templateUrl: './m-modal.component.html',
  styleUrls: ['./m-modal.component.css']
})
export class MModalComponent {
  @Input() class = "";
  modal;
  constructor(private _el: ElementRef) {
  }

  ngOnInit() {
    this.modal = $(this._el.nativeElement.querySelector('.ui.modal'));
  }

  show(settings) {
    this.modal.modal(settings).modal('show');
  }
}