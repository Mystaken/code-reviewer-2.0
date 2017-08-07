import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})


export class AppComponent {
  
  comments;
  file_name="a1.py";
  title=`class Book():
    '''A class representing a book.'''
    def __init__(self, author, title, retail_cost, sale_cost):
        '''(Book, str, str, int, int) -> NoneType

        Initialize this book with an author's name (author), the book's
        title (title), the retail price of the book (retail_cost) and the
        price it's being sold for currently (sale_cost).

        NOTE: prices are in CAD
        REQ: original_price >= sale_price >= 0
        '''
        self._author = author
        self._title = title
        self._retail_cost = retail_cost
        self._sale_cost = sale_cost`;
  constructor(private http: Http) {
    this.comments = []/*"0,20,abc".split('\n').map(function(comment) {
            var cmt = comment.split(',');
            return {
                start: parseInt(cmt[0]),
                end: parseInt(cmt[1]),
                comment: cmt[2]
            };
        });*/
    console.log(this.comments)
  }
}
