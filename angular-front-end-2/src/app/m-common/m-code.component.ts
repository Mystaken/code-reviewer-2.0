import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, Input, ElementRef, ViewChild, EventEmitter, Output, SecurityContext } from '@angular/core';
import { MModalComponent } from '../m-common/m-modal.component';
import * as hljs from 'highlight.js';
import * as $ from 'jquery';

@Component({
  selector: 'm-code',
  templateUrl: './m-code.component.html',
  styleUrls: ['./m-code.component.css']
})
export class MCodeComponent {
  /* The code to be displayed. */
  @Input() code: String = '';
  /*
   * The annotations to be displayed
   * List of Object
   * object.start = the start index of the annotation
   * object.end: The end index of the annotation
   * object.annotation: The annotation
   */
  @Input() annotations: any[] = [];
  /* Modal when adding annotation */
  @ViewChild('newAnnotation') modal: MModalComponent;
  /* Event when new annotation is added */
  @Output() newAnnotation = new EventEmitter();
  /* Comments seperated by start and end points */
  seperatedComments = [];
  /* HTML Code to be displayed. */
  displayCode = '';
  /* if there is a change in code/comments */
  changed = false;
  /* The new annotation. */
  annotation_input = '';
  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {
    // Closing comments.
    $(document).on('click', function(event) {
      $('.jcomment').each(function (i, c) {
        if (!c.contains(event.target)) {
          $(c).children('.jmessage').removeClass('show');
        }
      });
    });
  }

  ngOnInit() {
    // Create keyboard shortcut "Ctrl-Enter" to submit annotation.
    $('#annotation-text-area').keydown(function (e) {
      if ($('#add-annotation-btn') && e.ctrlKey && e.keyCode == 13) {
        $('#add-annotation-btn').trigger('click');
      }
    });
  }

  ngOnChanges(val) {
    if (this.code) {
      this.updateComments();
    }
  }

  ngAfterViewInit() {
    setTimeout(_ => this.updateComments());
  }

  ngAfterViewChecked() {
    if (this.changed) {
      hljs.highlightBlock(this.el.nativeElement.querySelector('#code'));
      this.changed = false;
    }

    // show annotation
    $('.jcomment').hover( function() {
      $( this ).children('.jmessage').addClass('show');
    });

    // hide annotation
    $('.jcomment').mouseleave( function() {
      $( this ).children('.jmessage').removeClass('show');
    })
  }

  updateComments() {
    this.seperatedComments = this.seperateIntervals(this.annotations);
    this.displayCode = this.updateCodeComments(this.code, this.seperatedComments);
    this.changed = true;
  }

  /*
   * Helper function for seperateIntervals
   */
  minInterval(l) {
    if (!l) { return; }
    let currVal = Number.MAX_SAFE_INTEGER,
      res = 0,
      state,
      i;

    for (i = 0; i < l.length; i++) {
      if (currVal > l[i].start) {
        state = 'start';
        currVal = l[i].start;
        res = i;
      }
      if (currVal > l[i].end) {
        state = 'end';
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
    let data = l.map(function(obj) {
        if (null === obj || 'object' != typeof obj) return obj;
        let copy = obj.constructor();
        for (let attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
      }),
      curr = this.minInterval(l),
      comments = new Set(),
      res = [],
      prevIdx = Number.MAX_SAFE_INTEGER,
      currIdx;

    while (curr.state) {
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
      let comments = [];
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
    let reversed = annotations.sort(function(a, b){ return b.end - a.end; }),
      displayComments,
      i;
    for (i = 0; i < reversed.length; i++) {
      displayComments = '<div class="jmessage"><div class="ui list">' +
        reversed[i].annotations
          .map(i => '<a class="item"><i class="comment icon"></i><div class="content"><div class="description">' +
            this.annotations[i].annotation + '</div></div></a>').join('') + '</div></div>';
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
    let start = 0, end = 0;
    let sel, range, priorRange;
    sel = window.getSelection();
    if (typeof sel != 'undefined' && sel && sel.rangeCount) {
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

  addAnnotation() {
    let interval = this.getSelectionCharOffsetsWithin(this.el.nativeElement.querySelector('#code')),
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
          // sanitize inputs to avoid HTML tags
          let comment = this.sanitizer.sanitize(SecurityContext.HTML, this.escapeHtml(this.annotation_input));
          this.newAnnotation.emit({
            start: start,
            end: end,
            annotation: comment,
          });
        },
        onHide: () => this.annotation_input = ''
      });
      return true;
    }
    return false;
  }

  // escape some sensible characters
  private escapeHtml(unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

}
