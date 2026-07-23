import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeftSolid,
  heroEnvelopeSolid,
  heroPaperAirplaneSolid,
} from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIcon, RouterLink],
  providers: [provideIcons({ heroEnvelopeSolid, heroArrowLeftSolid, heroPaperAirplaneSolid })],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {}
