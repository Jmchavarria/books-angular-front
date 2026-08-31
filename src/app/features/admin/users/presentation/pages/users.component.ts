import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users/get-all-users.use-case';
import { User } from '../../domain/entities/users.entity';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import {
  TableAction,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { RoleTypeEnum } from '../../../../../core/enums/role.enum';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { CreateUserDto } from '../../application/use-cases/create-user/create-user.dto';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';
import { Book } from '../../../../books/domain/entities/book.entity';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, TableComponent, ReactiveFormsModule, NgIcon],
  providers: [
    provideIcons({
      heroXMark,
    }),
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  usersform: FormGroup;
  isSubmitted = signal<boolean>(false);
  isLoading = signal(false);
  protected readonly RoleTypeEnum = RoleTypeEnum;
  users = signal<User[]>([]);
  isModalOpen = signal<boolean>(false);
  selectedUser: User | null = null;

  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly fb: FormBuilder,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {
    // Validadores corregidos y limpios
    this.usersform = this.fb.group({
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
      role: ['', [Validators.required]],
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

        console.log('vamos a ver que es lo que pasa', response)

        
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

    const emptyUser = this.getEmptyForm();

    // Se reestablece el formulario con los parámetros esperados
    this.usersform.reset({
      firstName: emptyUser.firstName,
      lastName: emptyUser.lastName,
      email: emptyUser.email,
      phone: emptyUser.phone,
      password: emptyUser.password,
      role: emptyUser.role,
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

    // Setea los datos en el Formulario Reactivo
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

    if (this.usersform.invalid) {
      this.usersform.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, phone, role, password } = this.usersform.value;

    this.isLoading.set(true);

    if (this.selectedUser === null) {
      this.createUserUseCase
        .execute({
          firstName,
          lastName,
          email,
          phone,
          role,
          password,
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

  private getEmptyForm(): CreateUserDto {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: RoleTypeEnum.admin,
      password: '',
    };
  }
}
