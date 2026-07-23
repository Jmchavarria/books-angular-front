import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRightSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ heroArrowRightSolid })],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {}
