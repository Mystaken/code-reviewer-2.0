import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'm-notloggedin',
  templateUrl: './m-notloggedin.component.html',
  styleUrls: ['./m-notloggedin.component.css']
})
export class MNotLoggedInComponent {

  constructor(public auth: AuthService) {
    console.log(auth);
    // Comment out this method call if using
    // hash-based routing
    auth.handleAuthentication();
    
    // Uncomment this method call if using
    // hash-based routing
    // auth.handleAuthenticationWithHash();
  }

  showStatus() {
    console.log(this.auth.isAuthenticated());
  }


  toLogin(){
    window.open("http://localhost:3000/api", "_blank");
  }


}
