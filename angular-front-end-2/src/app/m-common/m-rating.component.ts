import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-rating',
  templateUrl: './m-rating.component.html',
  styleUrls: ['./m-rating.component.css']
})
export class MRatingComponent {
  @Input() class = "";
  @Input() settings = {};
  rating;
  constructor(private _el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.rating = $(this._el.nativeElement.children[0]).rating(this.settings);
  }

  getRating() {
    return this.rating.rating('get rating');
  }

  setRating(rating) {
    this.rating.rating('set rating', rating);
  }
}