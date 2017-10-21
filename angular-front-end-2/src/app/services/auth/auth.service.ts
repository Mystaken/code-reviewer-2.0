import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackURL,
      responseType: 'token id_token',
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      params: {
        // scoope defines info included in access_token
        scope: 'openid email'
      }
    }
  });

  constructor(public router: Router, private http: Http) {}

  public login(): void {
    this.lock.show();
  }


  // Call this method in app.component.ts
  // if using path-based routing
  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      }
    });
    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    });
  }

  // set tokens in localStorage
  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  // create a Header with tokens
  public createHeaders(): Headers {
    if (this.isAuthenticated()) {
      let headers = new Headers();
      let access_token = localStorage.getItem('access_token');
      headers.append('access_token', 'Bearer ' + access_token);

      return headers;
    }
  }
}
