import { Component, signal, OnInit, computed } from '@angular/core';
import { Book } from '../../../domain/entities/book.entity';
import { GetAllBooksUseCase } from '../../../application/use-cases/admin/get-all-books/get-all-books.use-case';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBookUseCase } from '../../../application/use-cases/admin/create-book/create-book.use-case';
import {
  objectData,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { GetAllAuthorsUseCase } from '../../../../authors/application/use-cases/admin/get-all-authors/get-all-authors.use-case';
import { Author } from '../../../../authors/domain/entities/author.entity';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { Categories } from '../../../../categories/domain/entities/categories.entity';
import { GetAllCategoriesUseCase } from '../../../../categories/application/admin/use-cases/get-all-categories/get-all-categories-use-case';
import { FiltersDto } from '../../../../../core/interfaces/filters.interface';
import { ModalComponent } from '../../../../../core/components/modal/modal.component';
import { TableAction } from '../../../../../core/types/table.type';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import { BOOK_TABLE_ACTIONS } from '../../../config/books-table.config';
import { BookFormData } from '../../../types/book-form.type';
import { UserModalMode } from '../../../types/book-modal.type';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { ModalHeader } from '../../../../../core/types/modal.type';
import { booksModalHeaders } from '../../../config/book-modal.config';
import { UserFormComponent } from '../../../components/book-form/books-form.component';
import { UserDetailComponent } from '../../../../users/components/user-detail/user.detail.component';
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ModalComponent,
    SearchBarComponent,
    UserFormComponent,
    // UserDetailComponent
  ],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  isLoading = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);
  books = signal<objectData<Book>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  authors = signal<objectData<Author>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  categories = signal<objectData<Categories>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  isModalOpen = signal<boolean>(false);
  selectedBook = signal<Book | null>(null);
  readonly actions = BOOK_TABLE_ACTIONS;
  modalMode = signal<UserModalMode>(null);

  constructor(
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  onAction(event: { action: TableAction; item: Book }) {
    switch (event.action.key) {
      case 'edit':
        this.openEdit(event.item);
        break;
    }
  }

  readonly modalHeader = computed<ModalHeader>(() => {
    const mode = this.modalMode();

    return mode ? booksModalHeaders[mode] : { title: '', description: '' };
  });

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
    this.loadCategories();
  }

  loadAuthors(): void {
    this.getAllAuthorsUseCase.execute().subscribe({
      next: (response: PaginatedResponse<Author>) => {
        console.log(response);
        this.authors.set(response);
      },
      error: (err) => console.error(err),
    });
  }

  loadCategories(): void {
    this.getAllCategoriesUseCase.execute().subscribe({
      next: (response: PaginatedResponse<Categories>) => {
        console.log(response);
        this.categories.set(response);
      },
      error: (err) => console.error(err),
    });
  }

  loadBooks(filters?: FiltersDto[]): void {
    this.getAllBooksUseCase.execute(filters).subscribe({
      next: (response: PaginatedResponse<Book>) => {
        this.books.set(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  openEdit(book: Book): void {
    this.selectedBook.set(book);

    this.isSubmitted.set(false);
    this.modalMode.set('edit');
  }

  private createBook(book: BookFormData): void {
    this.isLoading.set(true);

    // Cambiar los nombres de los campos por authorId y categoryId en la interfaz de bookformData
    this.createBookUseCase
      .execute({
        title: book.title,
        authorId: book.author,
        description: book.description,
        pages: book.pages,
        publishedYear: book.publishedYear,
        categoryId: book.category,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.loadBooks();
          this.closeModal();
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error(err);
        },
      });
  }

  openCreate(): void {
    this.selectedBook.set(null);
    this.modalMode.set('create');
  }

  closeModal() {
    this.modalMode.set(null);
    this.selectedBook.set(null);
  }

  saveBook(book: BookFormData): void {
    this.isSubmitted.set(true);
    switch (this.modalMode()) {
      case 'create':
        this.createBook(book);
    }
  }
}
