import { Component, OnInit, signal } from '@angular/core';
import { Author } from '../../../domain/entities/author.entity';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GetAllAuthorsUseCase } from '../../../application/use-cases/admin/get-all-authors/get-all-authors.use-case';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import {
  objectData,
  TableAction,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { ModalComponent } from '../../../../../core/components/modal/modal.component';
import { FormContainerComponent } from '../../../../../core/components/form-container/form-container.component';
import { CreateAuthorUseCase } from '../../../application/use-cases/admin/create-author/create-author.use-case';
import { FiltersDto } from '../../../../../core/interfaces/filters.interface';

interface AuthorsForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  biography: FormControl<string>;
  birthdate: FormControl<Date>;
  countryOfBirth: FormControl<string>;
  literaryGenre: FormControl<string>;
  photoUrl: FormControl<string>;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableComponent,
    ReactiveFormsModule,
    ButtonComponent,
    ModalComponent,
    FormContainerComponent,
  ],
  templateUrl: './authors.component.html',
})
export class AuthorsComponent implements OnInit {
  authorsForm: FormGroup<AuthorsForm>;
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  authors = signal<objectData<Author>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  isModalOpen = signal<boolean>(false);
  selectedAuthor: Author | null = null;

  constructor(
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
    private readonly createAuthorUseCase: CreateAuthorUseCase,
    private readonly fb: FormBuilder,
  ) {
    this.authorsForm = this.fb.nonNullable.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      biography: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      birthdate: [
        new Date(),
        [
          Validators.required,
          // dateInPastValidator(), // No permite fechas futuras
          // minimumAgeValidator(12) // Opcional: Requiere una edad mínima (ej: 12 años)
        ],
      ],
      literaryGenre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      photoUrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
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

    const { biography, birthdate, countryOfBirth, firstName, lastName, literaryGenre, photoUrl } =
      this.authorsForm.getRawValue();

    if (this.selectedAuthor) {
    } else {
      this.createAuthorUseCase
        .execute({
          firstName,
          lastName,
          birthdate,
          countryOfBirth,
          biography,
          literaryGenre,
          photoUrl,
        })
        .subscribe({
          next: () => {
            this.isLoading.set(false);
            this.loadAuthors();
            this.isModalOpen.set(false);
          },
        });
    }
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
      birthdate: new Date(),
      countryOfBirth: '',
    });

    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }

  loadAuthors(filters?: FiltersDto[]): void {
    this.getAllAuthorsUseCase.execute(filters).subscribe({
      next: (response: PaginatedResponse<Author[]>) => {
        this.authors.set(response);
      },
      error: (err) => console.error(err),
    });
  }
}
