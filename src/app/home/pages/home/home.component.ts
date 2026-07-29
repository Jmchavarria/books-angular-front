import { Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/topbar/topbar.component';
import { LandingPageComponent } from '../../../landing/pages/landing/landing-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent, LandingPageComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
