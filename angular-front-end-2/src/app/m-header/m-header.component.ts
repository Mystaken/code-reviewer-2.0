import { AuthService } from './../services/auth/auth.service';
import { Component, Input } from '@angular/core';
import { SessionUserService } from '../services/session-user.service';

@Component({
  selector: 'm-header',
  templateUrl: './m-header.component.html',
  styleUrls: ['./m-header.component.css']
})
export class MHeaderComponent {
  @Input()
  selected;
  userType;
  userTypeDisplay;
  crIcon;
  constructor(private _userService: SessionUserService, private authService: AuthService) {
    this.userType = this._userService.getUserType();
    if (this.userType === 'admin') {
      this.crIcon = 'assets/images/icon-circle-green.png';
      this.userTypeDisplay = 'Administrator';
    } else if (this.userType === 'student') {
      this.crIcon = 'assets/images/icon-circle-blue.png';
      this.userTypeDisplay = 'Student';
    }
  }

  logout() {
    this.authService.logout();
  }
}
