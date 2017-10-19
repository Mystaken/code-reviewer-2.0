import {Component, ElementRef, AfterViewInit, Output, EventEmitter, Input, Self} from '@angular/core';
import { NgModel, ControlValueAccessor  } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'm-calendar',
  template: `
        <div class="ui calendar">
          <div class="ui input left icon">
            <i class="calendar icon"></i>
            <input type="text" [placeholder]="placeholder" [value]="initialDate">
          </div>
        </div>
`,
  providers: [NgModel]
})
export class MCalendarComponent implements AfterViewInit, ControlValueAccessor {
  @Output() change: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() htmlElement: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();
  @Input() settings: CalendarOptions = {
    type: 'date',
    on: 'click',
    today: false,
    formatter: {
      date: function (date, settings) {
        let year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString(),
            day = date.getDate().toString();
        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }
        return year + '-' + month + '-' + day;
      }
    }
  };
  @Input() type: String;
  @Input() formatter: Function;
  @Input() on: String;
  @Input() initialDate: Date;
  @Input() placeholder: String;
  @Input() today: Boolean;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  private selectedDate: Date;
  constructor(private parentElement: ElementRef, @Self() private self: NgModel){
    this.self.valueAccessor = this;
  }
  ngAfterViewInit(): void {
    this.settings.onChange = (date: Date) => {
      this.writeValue(date);
    };
    if (this.type) {
      this.settings.type = this.type;
    }
    if (this.formatter) {
      this.settings.formatter = this.formatter;
    }
    if (this.on) {
      this.settings.on = this.on;
    }
    if (this.today) {
      this.settings.today = this.today;
    }
    let calandarElement: HTMLElement = this.parentElement.nativeElement.children[0];
    this.htmlElement.emit(calandarElement);
    $(calandarElement).calendar(this.settings);
  }
  writeValue (value: Date): void {
    if (value === this.selectedDate) {
      return;
    }
    this.self.viewToModelUpdate(value);
    this.change.emit(value);
    this.selectedDate = value;
  }
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
export interface CalendarOptions {
  type?: String;
  startCalendar?: HTMLElement;
  endCalendar?: HTMLElement;
  startMode?: string;
  ampm?: boolean;
  on?: String;
  minDate?: Date;
  maxDate?: Date;
  formatter?: {};
  monthFirst?: boolean;
  inline?: boolean;
  onChange?: Function;
  today: Boolean;
}
