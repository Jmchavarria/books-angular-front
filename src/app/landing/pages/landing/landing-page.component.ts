import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { LandingPageBestsellersComponent } from './components/bestsellers/landing-page-bestsellers.component';
import { RecentReleasesComponent } from './components/recent-releases/recent-releases.component';
import { BuildPersonalLibrary } from "./components/build-personal-library/build-personal-library.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-landing-page',
  imports: [HeroSectionComponent, LandingPageBestsellersComponent, RecentReleasesComponent, BuildPersonalLibrary, FooterComponent],
  standalone: true,
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
