import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-modal',
  templateUrl: './m-modal.component.html',
  styleUrls: ['./m-modal.component.css']
})
export class MModalComponent {
  @Input() settings: ModalOptions;
  @Input() modalClass = "";
  modal: HTMLElement
  constructor(private parentElement: ElementRef) {}

  ngAfterViewInit(): void {
    this.modal = this.parentElement.nativeElement.children[0];
    $(this.modal).modal(this.settings)
  }

  show() {
    $(this.modal).show()
  }
}
export interface ModalOptions {
}