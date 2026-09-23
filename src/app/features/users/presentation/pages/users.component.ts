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
import { GetAllUsersDto } from '../../application/use-cases/get-all-users/get-all-users.dto';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { USER_TABLE_ACTIONS, USERS_COLUMNS } from '../../config/user-table.config';
import { UserFormData } from '../../types/user-form.type';
import { TableAction } from '../../../../core/types/table.type';
import { ModalHeader } from '../../../../core/types/modal.type';
import { UserAddressesComponent } from '../components/user-addresses/user-addresses.component';
import { UserCartComponent } from '../components/user-cart/user-cart.component';
import { UserDetailComponent } from '../components/user-detail/user.detail.component';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { UsersOrdersComponent } from '../components/user-orders/user-orders.component';
import { UserReviewsComponent } from '../components/user-reviews/user-reviews.component';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { ModalMode } from '../../types/user-modal.type';
import { TableUtilsService } from '../../../../core/services/table-utils.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEllipsisVerticalSolid } from '@ng-icons/heroicons/solid';
import { DropdownComponent } from '../../../../core/components/dropdown/dropdown.component';
import { USER_DETAIL_TABS, UsersmodalHeaders } from '../../config/user-modal.config';

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [
    provideIcons({
      heroEllipsisVerticalSolid,
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
    UserAddressesComponent,
    UsersOrdersComponent,
    UserReviewsComponent,
    UserCartComponent,
    PaginationComponent,
    NgIcon,
    DropdownComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
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
  readonly columns = USERS_COLUMNS;
  readonly detailTabs = USER_DETAIL_TABS;
  selectedUser = signal<User | null>(null);
  modalMode = signal<ModalMode>(null);
  currentTab = signal<string>('info');
  isMenuOpen = signal<boolean>(false);

  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    public readonly tableUtilsService: TableUtilsService<User>,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  toggleMenu() {
    this.isMenuOpen.update((value: boolean) => !value);
  }

  readonly modalHeader = computed<ModalHeader>(() => {
    const mode: Exclude<ModalMode, null> | null = this.modalMode();

    if (mode === null) {
      return {
        title: '',
        description: '',
      };
    }

    return UsersmodalHeaders[mode];
  });

  openEdit(user: User): void {
    this.selectedUser.set(user);

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

  loadUsers(filters?: GetAllUsersDto): void {
    this.getAllUsersUseCase.execute(filters).subscribe({
      next: (response: PaginatedResult<User>) => {
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
    this.currentTab.set('info');
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
