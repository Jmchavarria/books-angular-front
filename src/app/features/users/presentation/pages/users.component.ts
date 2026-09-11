import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users/get-all-users.use-case';
import { User } from '../../domain/entities/users.entity';
import {
  objectData,
  TableComponent,
} from '../../../../core/layouts/admin-layouts/table/table.component';
import { RoleTypeEnum } from '../../../../core/enums/role.enum';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { provideIcons } from '@ng-icons/core';
import { heroEyeSlashSolid, heroEyeSolid } from '@ng-icons/heroicons/solid';
import { GetAllUsersDto } from '../../application/use-cases/get-all-users/get-all-users.dto';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserDetailComponent } from '../../components/user-detail/user.detail.component';
import { UserModalMode } from '../../types/user-modal.type';
import { USER_TABLE_ACTIONS } from '../../config/user-table.config';
import { UserFormData } from '../../types/user-form.type';
import { TableAction } from '../../../../core/types/table.type';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { ModalHeader } from '../../../../core/types/modal.type';
import { booksModalHeaders } from '../../../books/config/book-modal.config';

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [
    provideIcons({
      heroEyeSlashSolid,
      heroEyeSolid,
    }),
  ],
  imports: [
    FormsModule,
    TableComponent,
    ReactiveFormsModule,
    ModalComponent,
    ButtonComponent,
    SearchBarComponent,
    UserFormComponent,
    UserDetailComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  protected readonly RoleTypeEnum = RoleTypeEnum;
  users = signal<objectData<User>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  readonly actions = USER_TABLE_ACTIONS;
  selectedUser = signal<User | null>(null);
  modalMode = signal<UserModalMode>(null);

  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  readonly modalHeader = computed<ModalHeader>(() => {
    const mode = this.modalMode();

    return mode ? booksModalHeaders[mode] : { title: '', description: '' };
  });

  openEdit(user: User): void {
    this.selectedUser.set(user);

    this.isSubmitted.set(false);
    this.modalMode.set('edit');
  }

  openCreate(): void {
    this.selectedUser.set(null);
    this.modalMode.set('create');
  }

  onAction(event: { action: TableAction; item: User }) {
    switch (event.action.key) {
      case 'edit':
        this.openEdit(event.item);
        break;
      case 'view detail':
        this.openDetail(event.item);
        break;
    }
  }

  openDetail(user: User): void {
    this.selectedUser.set(user);
    this.modalMode.set('detail');
  }

  loadUsers(filters?: GetAllUsersDto[]): void {
    this.getAllUsersUseCase.execute(filters).subscribe({
      next: (response: PaginatedResponse<User>) => {
        this.users.set({
          data: response.data,
          limit: response.limit,
          page: response.page,
          total: response.total,
          totalPages: response.totalPages,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeModal() {
    this.modalMode.set(null);
    this.selectedUser.set(null);
  }

  private createUser(user: UserFormData): void {
    this.isLoading.set(true);

    this.createUserUseCase
      .execute({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: `+57${user.phone}`,
        role: user.role,
        password: user.password,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error(err);
        },
      });
  }

  private updateUser(usersForm: UserFormData): void {
    const user = this.selectedUser();

    if (!user) {
      return;
    }

    this.isLoading.set(true);

    this.updateUserUseCase
      .execute({
        id: user.id,
        firstName: usersForm.firstName,
        lastName: usersForm.lastName,
        email: usersForm.email,
        phone: `+57${usersForm.phone}`,
        role: usersForm.role,
      })
      .subscribe({
        next: () => {
          this.loadUsers();
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

  saveUser(user: UserFormData): void {
    this.isSubmitted.set(true);

    switch (this.modalMode()) {
      case 'create':
        this.createUser(user);
        break;

      case 'edit':
        this.updateUser(user);
        break;
    }
  } 
}
