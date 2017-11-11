import { SessionUserService } from './../services/session-user.service';
import { Router } from '@angular/router';
import { APIRoutingService } from './../services/api-routing.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'm-notloggedin',
  templateUrl: './m-notloggedin.component.html',
  styleUrls: ['./m-notloggedin.component.css']
})
export class MNotLoggedInComponent {

  // message for failed login
  errorMessage: String = '';

  myForm = new FormGroup({
    email: new FormControl('@mail.utoronto.ca', [
      Validators.required
    ]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private _api: APIRoutingService,
    private _userService: SessionUserService,
    public router: Router
  ) {}

  get email() {
    return this.myForm.get('email').value;
  }

  get password() {
    return this.myForm.get('password').value;
  }

  login() {
    // both email and password are required for authentication
    if (!this.email)
      return this.errorMessage = 'Please enter your official utormail.';
    if (!this.password)
      return this.errorMessage = 'Please enter a password.';

    // assume email and passwords are given
    return this._api.post('login', {
      email: this.email,
      password: this.password
    })
      .subscribe(res => {
        // login fail message
        if (res.message) this.errorMessage = res.message;
        // set token and expire time in local storage
        localStorage.setItem('access_token', res.access_token);
        this._userService.setUserInfo();
        this.router.navigate(['/']);
      });
  }

  // hide and clear error message for failed login
  closeErrorMessage() {
    this.errorMessage = '';
  }

}
