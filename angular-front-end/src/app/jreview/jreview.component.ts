import { 
    Component,
    ElementRef,
    Input,
    ContentChildren,
    QueryList,
    AfterViewInit,
    OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { JcommentDialogComponent } from './jcommentDialog.component';
import * as hljs from 'highlight.js';
import * as $ from 'jquery';

@Component({
    selector: 'j-review',
    templateUrl: './jreview.component.html',
    providers: [],
    styleUrls: [
        './jreview.component.css'
    ]
})
export class JreviewComponent implements AfterViewInit, OnInit  {
    @Input() 
    code;
    @Input()
    comments;
    @Input()
    file_name
    private changed = false;
    displayCode;
    seperatedComments;

    constructor(private el: ElementRef, private sanitizer:DomSanitizer, public dialog: MdDialog) {
        console.log(this.comments);
        $(document).on('click', function(event) {
            $('.jcomment').each(function (i, c) {
                if(!c.contains(event.target)) {
                    $(c).children('.jmessage').removeClass('show');
                }
            });
        });
    }
    ngOnInit() {
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
        this.seperatedComments = this.seperateIntervals(this.comments)
        this.displayCode = this.updateCodeComments(this.code, this.seperatedComments);
        this.changed = true;
    }
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
                    comments: new Set(comments)
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
            e.comments.forEach(function(e) {
                comments.push(e);
            });
            e.comments = comments;
            return e;
        }).filter(function(e) {
            return e.comments.length > 0;
        });
    }
    updateCodeComments(code, comments) {
        var reversed = comments.sort(function(a, b){ return b.end - a.end;}),
            displayComments,
            i;
        for (i = 0; i < reversed.length; i++) {
            displayComments = '<div class="jmessage"><div class="jcontent"><div class="jitem">' +
                reversed[i].comments
                    .map(i => this.comments[i].comment)
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
    addComments() {
        var interval = this.getSelectionCharOffsetsWithin(this.el.nativeElement.querySelector("#code")),
            start = interval.start,
            end = interval.end,
            i = this.seperatedComments.length - 1,
            cmts = this.comments,
            curr,
            len;
        while(i >= 0) {
            console.log(cmts);
            curr = this.seperatedComments[i].comments.reduce(function(a, b) {
                return (cmts[a] || { comment: ""}).comment.length + cmts[b].comment.length;
            }, -1);
            console.log(this.seperatedComments[i]);
            console.log(this.comments);
            console.log('--', curr);
            if (start - curr > this.seperatedComments[i].end) {
                start = start - curr;
                end = end - curr;
            }
            i--;
        }
        this.comments.push({
            start: start,
            end: end,
            comment: []
        });
        this.updateComments();
        if (end > 0 && end - start > 3) {
            let dialogRef = this.dialog.open(JcommentDialogComponent);
            dialogRef.afterClosed().subscribe(result => {
                console.log(result);
                if (result) {
                    this.comments[this.comments.length-1].comment = result
                    this.updateComments();
                } else {
                    this.comments.splice(-1, 1);
                    console.log(this.comments)
                    this.updateComments();
                }
            });
        }  else {
            this.comments.splice(-1, 1);
            console.log(this.comments)
            this.updateComments();
        }
    }
}