import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { FormContainerComponent } from '../../../../../core/components/form-container/form-container.component';
import { RoleTypeEnum } from '../../../../../core/enums/role.enum';
import { User } from '../../../domain/entities/users.entity';
import { UsersForm, UserFormData } from '../../../types/user-form.type';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormContainerComponent, NgIcon],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnChanges {
  usersForm: FormGroup<UsersForm>;

  isLoading = input(false);
  isEdit = input(false);
  user = input<User | null>(null);

  isSubmitted = false;
  showPassword = false;

  cancelled = output<void>();
  submitted = output<UserFormData>();

  protected readonly RoleTypeEnum = RoleTypeEnum;

  constructor(private fb: FormBuilder) {
    this.usersForm = this.fb.nonNullable.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      role: [RoleTypeEnum.admin, [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['user']) {
      return;
    }

    const user = this.user();

    this.isSubmitted = false;

    if (user) {
      this.usersForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone.replace(/^\+57/, ''),
        role: user.role,
      });

      this.usersForm.controls.password.clearValidators();
      this.usersForm.controls.password.updateValueAndValidity();

      this.showPassword = false;
    } else {
      this.resetForm();
    }
  }

  handleSubmit(): void {
    this.isSubmitted = true;

    this.usersForm.markAllAsTouched();
    this.usersForm.updateValueAndValidity();

    if (this.usersForm.invalid) {
      return;
    }

    this.submitted.emit(this.usersForm.getRawValue());
  }

  private resetForm(): void {
    this.usersForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      role: RoleTypeEnum.admin,
    });

    this.usersForm.controls.password.setValidators([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]);

    this.usersForm.controls.password.updateValueAndValidity();

    this.isSubmitted = false;
    this.showPassword = false;
  }
}

 