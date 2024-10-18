// src/app/google-auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor() {}

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
}
