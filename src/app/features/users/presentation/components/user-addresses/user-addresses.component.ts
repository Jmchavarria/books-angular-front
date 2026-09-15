import { Component, input, signal } from '@angular/core';
import { UserAddressesFormComponent } from './user-addresses-form/user-addresses-form.component';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { CreateUserAddressUseCase } from '../../../application/use-cases/user-addresses/create-user-address/create-user-address.use-case';
import { UserAddresses } from '../../../domain/entities/user-addresses.entity';
import { IUserAddresses } from '../../../types/user-addresses.type';
import { UpdateUserAddressUseCase } from '../../../application/use-cases/user-addresses/update-user-address/update-user-address.use-case';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [ButtonComponent, UserAddressesFormComponent, SearchBarComponent, NgIcon],
  providers: [
    provideIcons({
      heroPencilSquare,
      heroTrash,
      heroPlus,
    }),
  ],
  templateUrl: './user-addresses.component.html',
})
export class UserAddressesComponent {
  userAddresses = input<UserAddresses[]>([]);
  userId = input.required<number>();

  addresses = signal<UserAddresses[]>([]);

  modeView = signal<'create' | 'edit' | 'info'>('info');
  isLoading = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);
  selectedAddress = signal<UserAddresses | null>(null);

  constructor(
    private readonly createUserAddressUseCase: CreateUserAddressUseCase,
    private readonly updateUserAddressUseCase: UpdateUserAddressUseCase,
  ) {}

  ngOnInit(): void {
    this.addresses.set(this.userAddresses());
  }

  private createUserAddress(address: IUserAddresses): void {
    this.isLoading.set(true);

    this.createUserAddressUseCase
      .execute({
        ...address,
        userId: this.userId(),
      })
      .subscribe({
        next: (newAddress: UserAddresses) => {
          this.addresses.update((addresses) => [...addresses, newAddress]);

          this.closeForm();
        },

        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },

        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  private updateUserAddress(address: IUserAddresses): void {
    const userAddress = this.selectedAddress();

    if (!userAddress) {
      return;
    }

    this.isLoading.set(true);

    this.updateUserAddressUseCase
      .execute({
        ...address,
        id: userAddress.id,
        userId: userAddress.userId,
      })
      .subscribe({
        next: (updatedAddress: UserAddresses) => {
          console.log(updatedAddress);

          this.addresses.update((addresses) =>
            addresses.map((item) => (item.id === updatedAddress.id ? updatedAddress : item)),
          );

          this.closeForm();
        },

        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },

        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  openEdit(address: UserAddresses): void {
    this.selectedAddress.set(address);
    this.isSubmitted.set(false);
    this.modeView.set('edit');
  }

  saveAddress(address: IUserAddresses): void {
    this.isSubmitted.set(true);

    switch (this.modeView()) {
      case 'create':
        this.createUserAddress(address);
        break;

      case 'edit':
        this.updateUserAddress(address);
        break;
    }
  }

  closeForm(): void {
    this.modeView.set('info');
    this.selectedAddress.set(null);
  }
}
