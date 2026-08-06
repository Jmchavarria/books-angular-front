import { jwtDecode } from 'jwt-decode';
import { Component, NgZone, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightSolid,
  heroEnvelopeSolid,
  heroEyeSlashSolid,
  heroEyeSolid,
} from '@ng-icons/heroicons/solid';
import { RouterLink } from '@angular/router';
import { MinimalFooterComponent } from '../../../../../shared/components/minimal-footer/minimal-footer.component';
import { MinimalTopBarComponent } from '../../../../../shared/components/minimal-top-bar/minimal-top-bar.component';
import { GoogleAuthService } from '../../../../../core/services/google-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIcon, MinimalTopBarComponent, MinimalFooterComponent, RouterLink],
  providers: provideIcons({
    heroEnvelopeSolid,
    heroArrowRightSolid,
    heroEyeSlashSolid,
    heroEyeSolid,
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
