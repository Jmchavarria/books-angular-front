import { Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MinimalTopBarComponent } from '../../../../../shared/components/minimal-top-bar/minimal-top-bar.component';
import { MinimalFooterComponent } from '../../../../../shared/components/minimal-footer/minimal-footer.component';
import { GoogleAuthService } from '../../../../../core/services/google-auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MinimalTopBarComponent, MinimalFooterComponent],
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent implements OnInit {
  showPassword = false;

  constructor(private readonly googleAuthService: GoogleAuthService) {}

  ngOnInit(): void {
    this.googleAuthService.initializeGoogleSignIn();
  }
}
