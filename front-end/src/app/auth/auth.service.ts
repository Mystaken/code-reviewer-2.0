import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Subscription
} from 'rxjs';

@Injectable()
export class AuthService {
  profile: any;
  isLoggedIn: boolean;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);
  refresh: Subscription;

  get hasExpired(): boolean {
    return;
  }

  get accessToken(): string {
    return;
  }

  get idToken(): string {
    return;
  }

  private loginURL: string = `${environment.domain}/login`;

  constructor() {}

  setLoggedIn(val: boolean) {

  }

  authenticate() {

  }

  logout(redirect?: string) {

  }

  renewToken() {

  }

  scheduleRenewal() {

  }

  unscheduleRenewal() {

  }

  private setSession(authInfo, profile?) {

  }


}