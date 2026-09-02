import { Component, OnInit, signal } from '@angular/core';
import { Author } from '../../../domain/entities/author.entity';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GetAllAuthorsUseCase } from '../../../application/use-cases/get-all-authors/get-all-authors.use-case';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import {
  TableAction,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';

interface AuthorsForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  biography: FormControl<string | null>;
  birthdate: FormControl<Date | null>;
  countryOfBirth: FormControl<string | null>;
  // literaryGenre:FormControl< string | null>
  // photoUrl:FormControl< string | null>
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, NgIcon, ReactiveFormsModule],
  providers: [
    provideIcons({
      heroXMark,
    }),
  ],
  templateUrl: './authors.component.html',
})
export class AuthorsComponent implements OnInit {
  authorsForm: FormGroup<AuthorsForm>;
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  authors = signal<Author[]>([]);
  isModalOpen = signal<boolean>(false);
  selectedAuthor: Author | null = null;

  constructor(
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
    private readonly fb: FormBuilder,
  ) {
    this.authorsForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      biography: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      birthdate: [
        null as Date | null,
        [
          Validators.required,
          // dateInPastValidator(), // No permite fechas futuras
          // minimumAgeValidator(12) // Opcional: Requiere una edad mínima (ej: 12 años)
        ],
      ],
      countryOfBirth: ['', Validators.required],
    });
  }

  actions: TableAction[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: 'pencil-square',
    },
  ];

  onAction(event: { action: TableAction; item: Author }) {
    switch (event.action.key) {
      case 'edit':
        // this.editCategory(event.item);
        break;
    }
  }

  ngOnInit(): void {
    this.loadAuthors();
  }
  saveAuthor() {
    this.isSubmitted.set(true);
    if (this.authorsForm.invalid) {
      this.authorsForm.markAllAsTouched();
      return;
    }
    const rawValues = this.authorsForm.getRawValue();
  }
  editAuthor(author: Author) {
    this.selectedAuthor = author;

    this.authorsForm.patchValue({
      firstName: author.firstName,
      lastName: author.lastName,
      biography: author.biography,
      birthdate: author.birthdate,
      countryOfBirth: author.countryOfBirth,
    });
  }
  openModal() {
    this.selectedAuthor = null;
    this.isSubmitted.set(false);

    this.authorsForm.reset({
      firstName: '',
      lastName: '',
      biography: '',
      birthdate: null,
      countryOfBirth: '',
    });

    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }

  loadAuthors(): void {
    this.getAllAuthorsUseCase.execute().subscribe({
      next: (response: PaginatedResponse<Author[]>) => {
        this.authors.set(response.data);
      },
      error: (err) => console.error(err),
    });
  }
}
