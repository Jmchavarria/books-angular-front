import { Component, ElementRef, output, Signal, ViewChild } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { heroMagnifyingGlassSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

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
  imports: [NgIcon, ReactiveFormsModule],
})
export class SearchBarComponent {
  @ViewChild('searchInput')
  searchInput!: ElementRef<HTMLInputElement>;
  searchControl = new FormControl('');

  searchValue = outputFromObservable(
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((text) => (text ? [{ name: 'search', value: text }] : undefined)),
    ),
  );
  clearSearch() {
    this.searchControl.setValue('');
    this.searchInput.nativeElement.focus();
  }
}
