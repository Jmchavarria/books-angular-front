import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users/get-all-users.use-case';
import { User } from '../../domain/entities/users.entity';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import {
  TableAction,
  TableComponent,
} from '../../../../core/layouts/admin-layouts/table/table.component';
import { RoleTypeEnum } from '../../../../core/enums/role.enum';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';
import { FormContainerComponent } from '../../../../core/components/form-container/form-container.component';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';

interface UsersForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  password: FormControl<string>;
  role: FormControl<RoleTypeEnum>;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    ReactiveFormsModule,
    FormContainerComponent,
    ModalComponent,
    ButtonComponent,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  usersform: FormGroup<UsersForm>;
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  protected readonly RoleTypeEnum = RoleTypeEnum;
  users = signal<User[]>([]);
  isModalOpen = signal<boolean>(false);
  selectedUser: User | null = null;
  selectedCategory: any;

  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly fb: FormBuilder,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {
    // Validadores corregidos y limpios
    this.usersform = this.fb.nonNullable.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      role: [RoleTypeEnum.admin, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  actions: TableAction[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: 'pencil-square',
    },
  ];

  onAction(event: { action: TableAction; item: User }) {
    switch (event.action.key) {
      case 'edit':
        this.editUser(event.item);
        break;
    }
  }

  loadUsers(): void {
    this.getAllUsersUseCase.execute().subscribe({
      next: (response: PaginatedResponse<User[]>) => {
        this.users.set(response.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openModal() {
    this.selectedUser = null;
    this.isSubmitted.set(false);

    this.usersform.reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      role: RoleTypeEnum.admin,
    });

    // Se asegura de reactivar la validación de password para nuevos usuarios
    this.usersform
      .get('password')
      ?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
    this.usersform.get('password')?.updateValueAndValidity();

    this.isModalOpen.set(true);
  }

  editUser(user: User) {
    this.selectedUser = user;

    this.usersform.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    this.usersform.get('password')?.clearValidators();
    this.usersform.get('password')?.updateValueAndValidity();

    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveUser() {
    this.isSubmitted.set(true);

    const { firstName, lastName, email, phone, role, password } = this.usersform.getRawValue();

    this.isLoading.set(true);

    if (this.selectedUser === null) {
      this.createUserUseCase
        .execute({
          firstName,
          lastName,
          email,
          phone: `+57${phone}`,
          role,
          password,
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
    } else {
      this.updateUserUseCase
        .execute({
          id: this.selectedUser.id,
          firstName,
          lastName,
          email,
          phone,
          role,
        })
        .subscribe({
          next: (response) => {
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
  }
}
