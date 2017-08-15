import { Component } from '@angular/core';

@Component({
  selector: 'm-notloggedin',
  templateUrl: './m-notloggedin.component.html',
  styleUrls: ['./m-notloggedin.component.css']
})
export class MNotLoggedInComponent {
  toLogin(){
    window.open("http://localhost:3000/api", "_blank");
  }
}
