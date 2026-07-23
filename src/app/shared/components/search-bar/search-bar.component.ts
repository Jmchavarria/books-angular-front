import { Component } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { heroMagnifyingGlassSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-search-bar',
  providers: [
    provideIcons({
      heroMagnifyingGlassSolid,
    }),
  ],
  standalone: true,
  templateUrl: './search-bar.component.html',
  imports: [NgIcon],
})
export class SearchBarComponent {}
