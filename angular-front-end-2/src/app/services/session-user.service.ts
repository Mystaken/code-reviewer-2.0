import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIRoutingService } from './api-routing.service';
import { CookieService } from 'ngx-cookie';
import { Http } from '@angular/http';

@Injectable()
export class SessionUserService {
  session_user_id: String = '';
  session_user_type: String = '';
  loggedIn = false;

  constructor(private _api: APIRoutingService, private _router: Router) {
  }

  // get this user's user_id and user_type and
  // set them in session
  public setUserInfo(): void {
    this._api.get('users', {})
      .subscribe(result => {
        this.session_user_id = result[0].user_id;
        this.session_user_type = result[0].user_type;
        this.loggedIn = true;
        this._router.navigate(['/dashboard']);
      });
  }

  getUserID(): String {
    return this.session_user_id;
  }

  getUserType() {
    return this.session_user_type;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.session_user_id = '';
    this.session_user_type = '';
    this.loggedIn = false;
    // Go back to the home route
    this._router.navigate(['/notLoggedIn']);
  }
}
