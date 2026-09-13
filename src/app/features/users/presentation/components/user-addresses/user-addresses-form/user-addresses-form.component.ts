import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormContainerComponent } from '../../../../../../core/components/form-container/form-container.component';
import { IUserAddresses } from '../../../../types/user-addresses.type';

interface UserAddressesForm {
  alias: FormControl<string>;
  userId: FormControl<number>;
  streetAddress: FormControl<string>;
  apartmentOrSuite: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  postalCode: FormControl<string>;
  country: FormControl<string>;
  isDefault: FormControl<boolean>;
}
@Component({
  selector: 'app-addresses-form',
  standalone: true,
  imports: [FormContainerComponent, ReactiveFormsModule],
  templateUrl: './user-addresses-form.component.html',
})
export class UserAddressesFormComponent implements OnChanges {
  userAddressesForm: FormGroup<UserAddressesForm>;
  userAddresses = input<IUserAddresses | null>(null);
  isLoading = input(false);
  isSubmitted = false;
  showPassword = false;
  cancelled = output<void>();
  submitted = output<IUserAddresses>();

  constructor(private fb: FormBuilder) {
    this.userAddressesForm = this.fb.nonNullable.group({
      alias: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      userId: [0, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]], 

      streetAddress: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      apartmentOrSuite: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
      ],
      city: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      postalCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      country: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      isDefault: [true, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['userAddresses']) {
      return;
    }

    const userAddresses = this.userAddresses();

    console.log('mira que si se envian los datos a editar', this.userAddresses());
    this.isSubmitted = false;

    if (userAddresses) {
      this.userAddressesForm.patchValue({
        alias: userAddresses.alias,
        apartmentOrSuite: userAddresses.apartmentOrSuite,
        city: userAddresses.city,
        country: userAddresses.country,
        postalCode: userAddresses.postalCode,
        state: userAddresses.state,
        streetAddress: userAddresses.streetAddress,
        isDefault: userAddresses.isDefault,
      });
    } else {
      this.resetForm();
    }
  }

  private resetForm() {
    this.userAddressesForm.reset({
      alias: '',
      apartmentOrSuite: '',
      city: '',
      country: '',
      postalCode: '',
      state: '',
      streetAddress: '',
      isDefault: true,
    });
  }

  handleSubmit(): void {
    this.isSubmitted = true;

    this.userAddressesForm.markAllAsTouched();
    this.userAddressesForm.updateValueAndValidity();

    if (this.userAddressesForm.invalid) {
      return;
    }

    this.submitted.emit(this.userAddressesForm.getRawValue());
  }
}
