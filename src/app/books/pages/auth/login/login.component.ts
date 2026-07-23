import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightSolid,
  heroEnvelopeSolid,
  heroEyeSlashSolid,
  heroEyeSolid,
  heroLockClosedSolid,
} from '@ng-icons/heroicons/solid';
import { FooterComponent } from '../../../../landing/pages/landing/components/footer/footer.component';
import { TopBarComponent } from '../../../../shared/components/topbar/topbar.component';
import { MinimalTopBarComponent } from '../../../../shared/components/minimal-top-bar/minimal-top-bar.component';
import { MinimalFooterComponent } from '../../../../shared/components/minimal-footer/minimal-footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIcon,
    FooterComponent,
    TopBarComponent,
    MinimalTopBarComponent,
    MinimalFooterComponent,
    RouterLink,
  ],
  providers: provideIcons({
    heroEnvelopeSolid,
    heroLockClosedSolid,
    heroArrowRightSolid,
    heroEyeSlashSolid,
    heroEyeSolid,
  }),
  templateUrl: './login.component.html',
})
export class LoginComponent {
  showPassword = false;
}
