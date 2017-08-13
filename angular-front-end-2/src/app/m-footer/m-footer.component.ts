import { Component, Input } from '@angular/core';
import { SessionUserService } from '../services/session-user.service';

@Component({
  selector: 'm-footer',
  templateUrl: './m-footer.component.html',
  styleUrls: ['./m-footer.component.css']
})
export class MFooterComponent {
  userType;
  crIcon;
  constructor(private _userService: SessionUserService) {
    this.userType = this._userService.getUserType();
    if (this.userType === 'admin') {
      this.crIcon = 'assets/images/icon-circle-green.png';
    } else if (this.userType === 'student') {
      this.crIcon = 'assets/images/icon-circle-blue.png';
    }
  }
}
