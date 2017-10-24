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
  constructor(private userService: SessionUserService,
    private router: Router) {}
  canActivate() {
    console.log(this.userService.getUserID());
    console.log(this.userService.getUserType());
    if (this.userService.getUserType() !== 'admin') {
      this.router.navigate(['/error']);
    }
    return this.userService.getUserType() === 'admin';
  }
}
