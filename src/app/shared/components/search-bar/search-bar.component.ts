import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-search-bar',
  providers: [
    provideIcons({
      heroMagnifyingGlassSolid,
      heroXMarkSolid,
    }),
  ],
  standalone: true,
  templateUrl: './search-bar.component.html',
  imports: [NgIcon, FormsModule],
})
export class SearchBarComponent {
  isSearchOpen = false;
  searchTerm = '';

  @ViewChild('searchInput')
  searchInput!: ElementRef<HTMLInputElement>;

  openSearch(): void {
    this.isSearchOpen = true;

    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    });
  }

  clearSearch(event: Event): void {
    event.stopPropagation();

    this.searchTerm = '';

    this.searchInput?.nativeElement.focus();
  }
}
