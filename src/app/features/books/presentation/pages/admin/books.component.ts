import { Component, signal, inject, OnInit } from '@angular/core';
import { Book } from '../../../domain/entities/book.entity';
import { GetAllBooksUseCase } from '../../../application/use-cases/admin/get-all-books/get-all-books.use-case';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateBookUseCase } from '../../../application/use-cases/admin/create-book/create-book.use-case';
import {
  objectData,
  TableAction,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { GetAllAuthorsUseCase } from '../../../../authors/application/use-cases/admin/get-all-authors/get-all-authors.use-case';
import { Author } from '../../../../authors/domain/entities/author.entity';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { Categories } from '../../../../categories/domain/entities/categories.entity';
import { GetAllCategoriesUseCase } from '../../../../categories/application/admin/use-cases/get-all-categories/get-all-categories-use-case';
import { FiltersDto } from '../../../../../core/interfaces/filters.interface';
import { ModalComponent } from '../../../../../core/components/modal/modal.component';
import { FormContainerComponent } from '../../../../../core/components/form-container/form-container.component';

export interface BookForm {
  title: FormControl<string>;
  pages: FormControl<number>;
  publishedYear: FormControl<number>;
  description: FormControl<string>;
  author: FormControl<number | null>; // Permitir null inicialmente
  category: FormControl<number | null>; // Permitir null inicialmente
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ModalComponent,
    FormContainerComponent,
  ],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  booksForm: FormGroup<BookForm>;
  isLoading = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);
  books = signal<objectData<Book>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });

  authors = signal<Author[]>([]);
  categories = signal<Categories[]>([]);
  isModalOpen = signal<boolean>(false);
  selectedBook: Book | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {
    // Agregamos todos los campos de la interfaz BookForm para evitar errores de consistencia
    this.booksForm = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      publishedYear: [0, [Validators.required, Validators.min(1000), Validators.max(2026)]],
      pages: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.maxLength(255)]],
      author: [null as number | null, [Validators.required]],
      category: [null as number | null, [Validators.required]],
    });
  }

  actions: TableAction[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: 'pencil-square',
    },
  ];

  onAction(event: { action: TableAction; item: Book }) {
    switch (event.action.key) {
      case 'edit':
        this.editBook(event.item);
        break;
    }
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
    this.loadCategories();
  }

  loadAuthors(): void {
    this.getAllAuthorsUseCase.execute().subscribe({
      next: (response: PaginatedResponse<Author[]>) => {
        this.authors.set(response.data);
      },
      error: (err) => console.error(err),
    });
  }

  loadCategories(): void {
    this.getAllCategoriesUseCase.execute().subscribe({
      next: (response: PaginatedResponse<Categories[]>) => {
        this.categories.set(response.data);
      },
      error: (err) => console.error(err),
    });
  }

  loadBooks(filters?: FiltersDto[]): void {
    this.getAllBooksUseCase.execute(filters).subscribe({
      next: (response: PaginatedResponse<Book[]>) => {
        this.books.set(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openModal() {
    this.selectedBook = null;
    this.isSubmitted.set(false);

    this.booksForm.reset({
      title: '',
      pages: 0,
      publishedYear: 0,
      description: '',
      author: null,
      category: null,
    });

    this.isModalOpen.set(true);
  }

  editBook(book: Book) {
    this.selectedBook = book;

    this.booksForm.patchValue({
      title: book.title,
      pages: book.pages,
      publishedYear: book.publishedYear,
      // Añade aquí description, author o category si tu entidad Book los tiene
    });

    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveBook() {
    this.isSubmitted.set(true);

    // 1. Usamos getRawValue() para obtener los tipos directos sin 'undefined'
    const rawValues = this.booksForm.getRawValue();

    if (this.selectedBook == null) {
      this.createBookUseCase.execute({
        title: rawValues.title ?? '', // Fallback por si es null
        pages: rawValues.pages ?? 0, // Fallback a número
        publishedYear: rawValues.publishedYear ?? 0, // Fallback a número
        authorId: rawValues.author ?? 0, // Mapeo de 'author' a 'authorId'
        description: rawValues.description ?? '',
        categoryId: 0, // Temporal hasta implementar la categoría real
        isActive: true,
      });
    } else {
    }
  }
}
