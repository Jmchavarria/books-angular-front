import { Component, OnInit, NgZone } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
})
export class GoogleSignInComponent implements OnInit {
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }, // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
    // response.credential is the JWT token
    console.log('Encoded JWT ID token: ' + response.credential);

    // You can decode the JWT token here or send it to your backend for verification
    // For demonstration, we'll just log it

    // If using NgZone, ensure any UI updates are run inside Angular's zone
    this.ngZone.run(() => {
      // Update your application state here, e.g., store user info, navigate, etc.
    });
  }
}
