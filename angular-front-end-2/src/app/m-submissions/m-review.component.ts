import { 
  Component,
  ElementRef,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MSubmissionsService } from './m-submissions.service';
import * as hljs from 'highlight.js';
import * as $ from 'jquery';

@Component({
  selector: 'm-review',
  templateUrl: './m-review.component.html',
  styleUrls: ['./m-review.component.css']
})
export class MReviewComponent {
  @Input() submission;
  selectedFile = 0;
  annotations = [];
  seperatedComments = [];
  displayCode = "";
  changed = false;
  constructor(private _submissionsAPI: MSubmissionsService, private el: ElementRef) {

  }
  ngOnInit() {
    this.selectFile(0);
  }

  selectFile(idx) {
    this._submissionsAPI.getAllAnnotations({
      submission_id: this.submission.submission_id
    }).subscribe((res) => {
      this.annotations = res.annotations;
      this.updateComments();
    });
  }
  ngAfterViewInit() {
      setTimeout(_=>this.updateComments());
  }
  ngAfterViewChecked() {
      if (this.changed) {
          hljs.highlightBlock(this.el.nativeElement.querySelector("#code"));
          this.changed = false;
      }
      $('.jcomment').on('click', function() {
          $( this ).children('.jmessage').addClass('show')
      });
  }
  updateComments() {
    console.log(this.annotations);
    console.log(this.submission);
    this.seperatedComments = this.seperateIntervals(this.annotations);
    this.displayCode = this.updateCodeComments(this.submission.files[0].code, this.seperatedComments);
    console.log(this.displayCode);
  }

  /*
   * Helper function for seperateIntervals
   */
  minInterval(l) {
    if (!l) { return; }
    var currVal = Number.MAX_SAFE_INTEGER,
      res = 0,
      state,
      i;

    for (i = 0; i < l.length; i++) {
      if (currVal > l[i].start) {
        state = 'start'
        currVal = l[i].start;
        res = i;
      }
      if (currVal > l[i].end) {
        state = 'end'
        currVal = l[i].end;
        res = i;
      }
    }
    return {
      idx: res,
      state: state
    };
  }
  /*
   * Usage:
   * Input:[{start: 0, end: 5}, {start: 3, end: 7}]
   * Output: [{start: 0, end: 3, annotations: [0]},
              {start: 3, end: 5, annotations: [0, 1]},
              {start: 5, end: 7, annotations: [1]}]
   */
  seperateIntervals(l) {
    var data = l.map(function(obj) {
        if (null === obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
      }),
      curr = this.minInterval(l),
      comments = new Set(),
      res = [],
      prevIdx = Number.MAX_SAFE_INTEGER,
      currIdx;

    while(curr.state) {
      currIdx = data[curr.idx][curr.state];
      if (prevIdx < currIdx) {
        res.push({
          start: prevIdx,
          end: currIdx,
          annotations: new Set(comments)
        });
      }
      if (curr.state === 'start') {
        comments.add(curr.idx);
      } else if (curr.state === 'end') {
        comments.delete(curr.idx);
      }
      prevIdx = currIdx;
      delete data[curr.idx][curr.state];
      curr = this.minInterval(data);
    }
    return res.map(function (e) {
      var comments = [];
      e.annotations.forEach(function(e) {
        comments.push(e);
      });
      e.annotations = comments;
      return e;
    }).filter(function(e) {
      return e.annotations.length > 0;
    });
  }

  /* Adds highlights to code */
  updateCodeComments(code, comments) {
    var reversed = comments.sort(function(a, b){ return b.end - a.end;}),
        displayComments,
        i;
    for (i = 0; i < reversed.length; i++) {
      displayComments = '<div class="jmessage"><div class="jcontent"><div class="jitem">' +
        reversed[i].annotations
          .map(i => this.annotations[i].annotation)
          .join('</div><div class="jitem">') +
        '</div></div></div>';
      code = code.slice(0, reversed[i].start) +
        '<div class="jcomment">' +
        code.slice(reversed[i].start, reversed[i].end) +
        displayComments +
        '</div>' +
        code.slice(reversed[i].end);
    }
    return code;
  }
}
