import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'm-notloggedin',
  templateUrl: './m-notloggedin.component.html',
  styleUrls: ['./m-notloggedin.component.css']
})
export class MNotLoggedInComponent {


  constructor(public auth: AuthService) {}
  toLogin(){
    window.open("http://localhost:3000/api", "_blank");
  }
}
