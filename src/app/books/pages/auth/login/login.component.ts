import { jwtDecode } from 'jwt-decode';
import { Component, NgZone, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightSolid,
  heroEnvelopeSolid,
  heroEyeSlashSolid,
  heroEyeSolid,
  heroLockClosedSolid,
} from '@ng-icons/heroicons/solid';
import { MinimalTopBarComponent } from '../../../../shared/components/minimal-top-bar/minimal-top-bar.component';
import { MinimalFooterComponent } from '../../../../shared/components/minimal-footer/minimal-footer.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIcon, MinimalTopBarComponent, MinimalFooterComponent, RouterLink],
  providers: provideIcons({
    heroEnvelopeSolid,
    heroLockClosedSolid,
    heroArrowRightSolid,
    heroEyeSlashSolid,
    heroEyeSolid,
  }),
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  showPassword = false;

  constructor(
    private readonly ngZone: NgZone,
    private readonly http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  loginWithGoogle() {
    google.accounts.id.prompt(); // abre el popup de Google
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large', shape: 'rectangular' }, // customization attributes
    );
    0;

    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
    // response.credential is the JWT token
    const token = response.credential;
    const decoded: any = jwtDecode(token);
    console.log('Encoded JWT ID token: ' + response.credential);

    const user = {
      email: decoded.email,
      given_name: decoded.given_name,
      family_name: decoded.family_name,
    };

    this.http.post(`${environment.apiUrl}/auth/verify-token-google`, { token }).subscribe({
      next: (res) => {
        // Handle successful authentication
        console.log('Autenticación exitosa');
      },
      error: (err) => {
        console.error('error', err);
      },
    });

    // You can decode the JWT token here or send it to your backend for verification
    // For demonstration, we'll just log it

    // If using NgZone, ensure any UI updates are run inside Angular's zone
    this.ngZone.run(() => {
      // Update your application state here, e.g., store user info, navigate, etc.
    });
  }
}
