import { Injectable } from '@angular/core';

import { APIRoutingService } from './api-routing.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class SessionUserService {
  session_user_id: String = ""
  session_user_type: String = ""
  loggedIn = false;
  constructor(private _cookieService:CookieService) {
    try {
      let session = JSON.parse(this._cookieService.get('cr_session_user'))
      this.session_user_id = session.session_user_id;
      this.session_user_type = session.session_user_type;
      this.loggedIn = true;
    } catch (e) {

    }
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
}
