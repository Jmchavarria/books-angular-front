import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroArrowRightSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-build-personal-library',
  standalone: true,
  providers: [provideIcons({ heroArrowRightSolid })],
  templateUrl: './build-personal-library.component.html',
})
export class BuildPersonalLibrary {}
