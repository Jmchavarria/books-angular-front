import { Component, computed, OnInit, signal } from '@angular/core';
import { Author } from '../../../domain/entities/author.entity';

import { GetAllAuthorsUseCase } from '../../../application/use-cases/admin/get-all-authors/get-all-authors.use-case';
import {
  objectData,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { ModalComponent } from '../../../../../core/components/modal/modal.component';
import { FormContainerComponent } from '../../../../../core/components/form-container/form-container.component';
import { CreateAuthorUseCase } from '../../../application/use-cases/admin/create-author/create-author.use-case';
import { TableAction } from '../../../../../core/types/table.type';
import { PaginatedResult } from '../../../../../core/types/paginated-response';
import { ModalMode } from '../../../../../core/types/modal-mode.type';
import { TableUtilsService } from '../../../../../core/services/table-utils.service';
import { DropdownComponent } from '../../../../../core/components/dropdown/dropdown.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { PaginationComponent } from '../../../../../core/components/pagination/pagination.component';
import { AUTHORS_COLUMNS, AUTHORS_TABLE_ACTIONS } from '../../../config/author-table.config';
import { GetAllAuthorsDto } from '../../../application/use-cases/admin/get-all-authors/get-all-authors.dto';
import { ModalHeader } from '../../../../../core/types/modal.type';
import { AuthorsModalHeaders } from '../../../config/author-modal.config';
import { AuthorFormData } from '../../../types/authors-form-types';
import { UpdateAuthorUseCase } from '../../../application/use-cases/admin/update-author/update-author.use-case';
import { UserFormComponent } from '../../../components/author-form/author-form.component';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { heroEllipsisVerticalSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [
    provideIcons({
      heroEllipsisVerticalSolid,
    }),
  ],
  imports: [
    TableComponent,
    ButtonComponent,
    ModalComponent,
    DropdownComponent,
    NgIcon,
    PaginationComponent,
    UserFormComponent,
    SearchBarComponent,
  ],
  templateUrl: './authors.component.html',
})
export class AuthorsComponent implements OnInit {
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  authors = signal<objectData<Author>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  modalMode = signal<ModalMode>(null);
  isModalOpen = signal<boolean>(false);
  selectedAuthor = signal<Author | null>(null);
  readonly columns = AUTHORS_COLUMNS;
  readonly actions = AUTHORS_TABLE_ACTIONS;

  constructor(
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
    private readonly createAuhtorUseCase: CreateAuthorUseCase,
    private readonly updateAuthorUseCase: UpdateAuthorUseCase,
    public readonly tableUtilsService: TableUtilsService<Author>,
  ) {}

  readonly modalHeader = computed<ModalHeader>(() => {
    const mode: Exclude<ModalMode, null> | null = this.modalMode();

    if (mode === null) {
      return {
        title: '',
        description: '',
      };
    }

    return AuthorsModalHeaders[mode];
  });

  onAction(event: { action: TableAction; item: Author }) {
    switch (event.action.key) {
      case 'edit':
        this.openEdit(event.item);
        break;
    }
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  saveAuthor(author: AuthorFormData): void {
    switch (this.modalMode()) {
      case 'create':
        this.createAuthor(author);
        break;

      case 'edit':
        this.updateAuthor(author);
        break;
    }
  }

  private createAuthor(author: AuthorFormData): void {
    this.isLoading.set(true);

    this.createAuhtorUseCase
      .execute({
        firstName: author.firstName,
        lastName: author.lastName,
        birthdate: author.birthdate,
        countryOfBirth: author.countryOfBirth,
        biography: author.biography,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.loadAuthors();
          this.closeModal();
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error(err);
        },
      });
  }

  private updateAuthor(authorForm: AuthorFormData): void {
    const author = this.selectedAuthor();

    if (!author) {
      return;
    }

    this.isLoading.set(true);

    this.updateAuthorUseCase
      .execute({
        id: author.id,
        firstName: authorForm.firstName,
        lastName: authorForm.lastName,
        biography: authorForm.biography,
        birthdate: authorForm.birthdate,
        countryOfBirth: authorForm.countryOfBirth,
      })
      .subscribe({
        next: () => {
          this.loadAuthors();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  loadAuthors(filters?: GetAllAuthorsDto): void {
    this.getAllAuthorsUseCase.execute(filters).subscribe({
      next: (response: PaginatedResult<Author>) => {
        this.authors.set(response);
      },
      error: (err) => console.error(err),
    });
  }

  openEdit(author: Author): void {
    this.selectedAuthor.set(author);

    this.modalMode.set('edit');
  }

  openCreate(): void {
    this.selectedAuthor.set(null);
    this.modalMode.set('create');
  }

  openDetail(author: Author): void {
    this.selectedAuthor.set(author);
    this.modalMode.set('detail');
  }
}
