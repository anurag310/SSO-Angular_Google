// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { GoogleAuthService } from '../google-auth.service';

@Component({
  selector: 'app-login',
  template: `
    <button (click)="login()">Login with Google</button>
    <button (click)="loginFacebook()">Login with facebook</button>
  `,
  styles: [],
})
export class LoginComponent {
  constructor(private googleAuthService: GoogleAuthService) {}

  login() {
    debugger
    this.googleAuthService.loginWithGoogle();
  }
  handleResponse() {
    this.googleAuthService.handleGoogleResponse();
  }
  loginFacebook() {
    debugger
    this.googleAuthService.loginWithFacebook();
  }
  handlefacebookResponse() {
    this.googleAuthService.handleFacebookResponse();
  }
}
