import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { heroArrowRightSolid } from '@ng-icons/heroicons/solid';
import { FooterComponent } from '../../../../landing/pages/landing/components/footer/footer.component';
import { TopBarComponent } from '../../../../shared/components/topbar/topbar.component';

@Component({
  selector: 'app-books-bestsellers',
  standalone: true,
  imports: [TopBarComponent, NgIcon, FooterComponent],
  providers: [provideIcons({ heroChevronDown, heroArrowRightSolid })],
  templateUrl: './books-bestsellers.component.html',
})
export class BooksBestsellersComponents {
  bestsellers = [
    {
      id: 1,
      title: 'Silent Architecture',
      author: 'Elena Rossi',
      price: '34.00',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Winter Dialogues',
      author: 'Marcus Thorne',
      price: '28.00',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'The Form of Color',
      author: 'Sarah J. Miller',
      price: '45.00',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'Botanical Echoes',
      author: 'Clara Vance',
      price: '32.00',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop',
    },
  ];
}
