import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-modal',
  templateUrl: './m-modal.component.html',
  styleUrls: ['./m-modal.component.css']
})
export class MModalComponent {
  @Input() class = "";
  constructor(private parentElement: ElementRef) {}

  ngAfterViewInit(): void {
  }

  show(settings) {
    $('.ui.modal').modal(settings).modal('show');
  }
}