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
constructor (private http: Http) {}

  title = this.http.get('localhost:3000/api');
  
}
