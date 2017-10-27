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

  isLoggedIn = true;

  myForm = new FormGroup({
    email: new FormControl('', [
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
    return this._api.post('login', {
      email: this.email,
      password: this.password
    })
      .subscribe(res => {
        // set token and expire time in local storage
        localStorage.setItem('access_token', res.access_token);
        const expiresAt = JSON.stringify((res.expires_in * 1000) + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);
        this._userService.setUserInfo();
        this.router.navigate(['/']);
      });
  }

}


