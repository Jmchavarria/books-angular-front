import { Injectable, NgZone, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthUseCase } from '../../features/auth/application/auth.use-case';
import { environment } from '../../../enviroments/enviroment';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor(
    private readonly ngZone: NgZone,
    private readonly http: HttpClient,
    private readonly authUseCase: AuthUseCase,
  ) {}

  /**
   * Inicializa el SDK de Google y renderiza opcionalmente el botón oficial
   * @param elementId ID opcional del elemento HTML donde se renderizará el botón de Google
   */
  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }, // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  /**
   * Procesa la respuesta de credenciales enviada por Google
   */
  private handleCredentialResponse(response: any): void {
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
        console.log('Autenticación exitosa');

        // Garantizamos la ejecución en la Zona de Angular para actualizar el estado global
        this.ngZone.run(() => {
          this.authUseCase.setAuthState(true);
        });
      },
      error: (err) => {
        console.error('error', err);
      },
    });
  }
}
