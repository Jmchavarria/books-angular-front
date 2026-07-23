import { Component } from '@angular/core';
import { BooksCatalogComponent } from '../../../books/pages/books-catalog/books-catalog.component';
import { TopBarComponent } from '../../../shared/components/topbar/topbar.component';
import { LandingPageComponent } from '../../../landing/pages/landing/landing-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BooksCatalogComponent,
    TopBarComponent,
    LandingPageComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
