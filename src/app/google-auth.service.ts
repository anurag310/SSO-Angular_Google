// src/app/google-auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(private http: HttpClient, private router: Router) {}

  // Google login
  loginWithGoogle() {
    const authWindow = window.open(
      'https://localhost:7127/api/Account/login', // Backend Google login URL
      '_blank',
      'width=500,height=600'
    );

    this.listenForAuthResponse();
  }

  // Facebook login
  loginWithFacebook() {
    const authWindow = window.open(
      'https://localhost:7127/api/Account/login/facebook', // Backend Facebook login URL
      '_blank',
      'width=500,height=600'
    );

    this.listenForAuthResponse();
  }

  // Common function to listen for messages from the authentication windows
  listenForAuthResponse() {
    window.addEventListener('message', (event) => {
      // You can dynamically check the origin in production
      if (event.origin !== 'https://localhost:7127') {
        return;
      }

      const user = event.data;
      if (user) {
        console.log('User authenticated:', user);

        // Store token in localStorage
        localStorage.setItem('authToken', user.Token);
        console.log('Token stored successfully:', user.Token);

        // Optionally navigate to a different page after successful login
        this.router.navigate(['/home']);
      }
    });
  }

  // (Optional) Call backend to handle the Google response
  handleGoogleResponse() {
    this.http.get<any>('/api/Account/GoogleResponse').subscribe(
      (response) => {
        // Store token in localStorage
        localStorage.setItem('authToken', response.Token);
        console.log('Google Token stored successfully:', response.Token);

        // Optionally navigate to another page
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error during Google authentication:', error);
      }
    );
  }

  // (Optional) Call backend to handle the Facebook response
  handleFacebookResponse() {
    this.http.get<any>('/api/Account/FacebookResponse').subscribe(
      (response) => {
        // Store token in localStorage
        localStorage.setItem('authToken', response.Token);
        console.log('Facebook Token stored successfully:', response.Token);

        // Optionally navigate to another page
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error during Facebook authentication:', error);
      }
    );
  }
}
