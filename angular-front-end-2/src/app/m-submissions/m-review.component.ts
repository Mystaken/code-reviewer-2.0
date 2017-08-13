import { 
  Component,
  ElementRef,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MModalComponent } from '../m-common/m-modal.component';
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
  @ViewChild('newAnnotation') modal: MModalComponent;
  selectedFile;
  allAnnotations = []
  annotations = [];
  seperatedComments = [];
  displayCode = "";
  changed = false;
  annotation_input = "";

  constructor(private _submissionsAPI: MSubmissionsService, private el: ElementRef) {

    $(document).on('click', function(event) {
        $('.jcomment').each(function (i, c) {
            if(!c.contains(event.target)) {
                $(c).children('.jmessage').removeClass('show');
            }
        });
    });
  }
  ngOnInit() {
    this._submissionsAPI.getAllAnnotations({
      submission_id: this.submission.submission_id
    }).subscribe((res) => {
      this.allAnnotations = res.annotations;
      this.selectFile(0);
    });
  }

  selectFile(idx) {
    this.selectedFile = idx;
    this.annotations = this.allAnnotations.filter((annotation) => {
      return annotation.submission_file_id === this.submission.files[idx].submission_file_id;
    });
    this.updateComments();
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
    this.seperatedComments = this.seperateIntervals(this.annotations);
    this.displayCode = this.updateCodeComments(this.submission.files[0].code, this.seperatedComments);
    this.changed = true;
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
  updateCodeComments(code, annotations) {
    var reversed = annotations.sort(function(a, b){ return b.end - a.end;}),
      displayComments,
      i;
    for (i = 0; i < reversed.length; i++) {
      displayComments = '<div class="jmessage"><div class="ui list">' +
        reversed[i].annotations
          .map(i => '<a class="item"><i class="comment icon"></i><div class="content"><div class="description">' + 
            this.annotations[i].annotation +'</div></div></a>').join('') + '</div></div>'
        code = code.slice(0, reversed[i].start) +
        '<span class="jcomment">' +
        code.slice(reversed[i].start, reversed[i].end) +
        displayComments +
        '</span>' +
        code.slice(reversed[i].end);
    }
    return code;
  }
  getSelectionCharOffsetsWithin(element) {
    var start = 0, end = 0;
    var sel, range, priorRange;
    sel = window.getSelection();
    if (typeof sel != "undefined" && sel && sel.rangeCount) {
      range =  sel.getRangeAt(0);
      priorRange = range.cloneRange();
      priorRange.selectNodeContents(element);
      priorRange.setEnd(range.startContainer, range.startOffset);
      start = priorRange.toString().length;
      end = start + range.toString().length;
    }
    return {
      start: start,
      end: end
    };
  }

  addComment() {
    var interval = this.getSelectionCharOffsetsWithin(this.el.nativeElement.querySelector("#code")),
      sc = this.seperatedComments,
      start = interval.start,
      end = interval.end,
      cmts = this.annotations,
      tmp,
      i;

    for (i = sc.length - 1; i >= 0; i--) {
      tmp = 0;
      sc[i].annotations.forEach(function(i) {
        tmp += cmts[i].annotation.length;
      });
      if (start - tmp > sc[i].start) {
        start -= tmp;
      }
      if (end - tmp >= sc[i].end) {
        end -= tmp;
      }
    }
    if (end > 0 && end - start > 3) {
      this.modal.show({
        onApprove: (value) => {
          let submission_id = this.submission.submission_id;
          let submission_file_id = this.submission.files[this.selectedFile].submission_file_id;
          let comment = this.annotation_input;
          this._submissionsAPI.addAnnotation({
            start: start,
            end: end,
            annotation: comment,
            submission_id: submission_id,
            submission_file_id: submission_file_id
          }).subscribe((res) => {
            cmts.push({
              annotation: comment,
              annotation_id: res,
              end: end,
              start: start,
              submission_file_id: submission_file_id,
              submission_id: submission_id
            });
            this.updateComments();
          })
        },
        onHide: () => this.annotation_input = ""
      });
    }
  }
}
