// src/app/features/books/pages/books-catalog/books-catalog.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetBooksUseCase } from '../../application/use-cases/get-books.use-case';
import { Book } from '../../domain/entities/book.entity';
import { TopBarComponent } from '../../../../shared/components/topbar/topbar.component';

@Component({
  selector: 'app-books-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, TopBarComponent],
  templateUrl: './books-catalog.component.html',
})
export class BooksCatalogComponent {
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
  private getBooksUseCase = inject(GetBooksUseCase);

  books = signal<Book[]>([]);
  total = signal(0);
  totalPages = signal(1);
  page = signal(1);

  searchTerm = '';

  constructor() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.getBooksUseCase
      .execute({
        title: this.searchTerm || undefined,
        page: this.page(),
        take: 10,
      })
      .subscribe((result) => {
        this.books.set(result.data);
        this.total.set(result.total);
        this.totalPages.set(result.totalPages);
      });
  }

  onSearch() {
    this.page.set(1);
    this.fetchBooks();
  }

  goToPage(p: number) {
    this.page.set(p);
    this.fetchBooks();
  }
}
