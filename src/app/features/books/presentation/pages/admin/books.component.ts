import { Component, signal, inject, OnInit } from '@angular/core';
import { Book } from '../../../domain/entities/book.entity';
import { GetAllBooksUseCase } from '../../../application/use-cases/admin/get-all-books/get-all-books.use-case';
import { GetAllBooksProps } from '../../../domain/repositories/books.repository';
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
  TableAction,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { NgIcon } from '@ng-icons/core';
import { GetAllAuthorsUseCase } from '../../../../authors/application/use-cases/get-all-authors/get-all-authors.use-case';
import { Author } from '../../../../authors/domain/entities/author.entity';

export interface BookForm {
  title: FormControl<string | null>;
  pages: FormControl<number | null>;
  publishedYear: FormControl<number | null>;
  description: FormControl<string | null>;
  author: FormControl<number | null>; // Permitir null inicialmente
  category: FormControl<string | null>; // Permitir null inicialmente
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, TableComponent, ReactiveFormsModule, NgIcon],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  booksForm: FormGroup<BookForm>;
  isLoading = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);
  books = signal<Book[]>([]);
  authors = signal<Author[]>([]);
  isModalOpen = signal<boolean>(false);
  selectedBook: Book | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
  ) {
    // Agregamos todos los campos de la interfaz BookForm para evitar errores de consistencia
    this.booksForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      publishedYear: [
        null as number | null,
        [Validators.required, Validators.min(1000), Validators.max(2026)],
      ],
      pages: [null as number | null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.maxLength(255)]],
      author: [null as number | null, [Validators.required]],
      category: ['', [Validators.required]],
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
  }

  loadAuthors(): void {
    this.getAllAuthorsUseCase.execute().subscribe({
      next: (response: PaginatedResponse<Author[]>) => {
        this.authors.set(response.data);
      },
      error: (err) => console.error(err),
    });
  }

  loadBooks(input: GetAllBooksProps = {}): void {
    this.getAllBooksUseCase.execute(input).subscribe({
      next: (response: PaginatedResponse<Book[]>) => {
        this.books.set(response.data);
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
      pages: null,
      publishedYear: null,
      description: '',
      author: null,
      category: '',
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

  saveUser() {
    this.isSubmitted.set(true);

    if (this.booksForm.invalid) {
      this.booksForm.markAllAsTouched();
      return;
    }

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
