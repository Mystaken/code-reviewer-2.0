import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { SessionUserService } from '../services/session-user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _userService: SessionUserService,
    private router: Router) {}
  canActivate() {
    if (this._userService.getUserType() !== 'admin') {
      this.router.navigate(['/error']);
    }
    return this._userService.getUserType() === 'admin';
  }
}
