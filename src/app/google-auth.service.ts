// src/app/google-auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(private http: HttpClient, private router: Router) {}

  loginWithGoogle() {
    debugger
    // Open a new window for Google authentication
    const authWindow = window.open(
      'https://localhost:7127/api/Account/login', // This should be your backend login URL
      '_blank',
      'width=500,height=600'
    );

    // Listen for messages from the authentication window
    window.addEventListener('message', (event) => {
      debugger
      if (event.origin !== 'https://localhost:7127') {
        return;
      }

      // Handle the response from Google
      const user = event.data;
      if (user) {
        console.log('User authenticated:', user);
        // Do further processing here, like setting up user session or making API calls
      }
    });
  }
  handleGoogleResponse() {
    // Call the Google response endpoint to retrieve the token
    this.http.get<any>('/api/account/GoogleResponse').subscribe(
      (response) => {
        // Store token in localStorage
        localStorage.setItem('authToken', response.Token);
        console.log('Token stored successfully:', response.Token);

        // Optionally, navigate the user to a different page
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error during Google authentication:', error);
      }
    );
  }
}
