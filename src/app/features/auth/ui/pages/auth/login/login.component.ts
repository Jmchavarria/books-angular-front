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
import { RouterLink } from '@angular/router';
import { GoogleAuthService } from '../../../../../../core/services/google-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIcon, RouterLink],
  providers: provideIcons({
    heroEnvelopeSolid,
    heroArrowRightSolid,
    heroEyeSlashSolid,
    heroEyeSolid,
    heroLockClosedSolid,
  }),
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  showPassword = false;

  constructor(private readonly googleAuthService: GoogleAuthService) {}

  ngOnInit(): void {
    // Inicializa Google Sign-In y renderiza el botón en el contenedor especificado
    this.googleAuthService.initializeGoogleSignIn();
  }
}
