import {
  Component,
  input,
  OnInit,
  signal,
  ɵsetAllowDuplicateNgModuleIdsForTest,
} from '@angular/core';
import { UserAddressesFormComponent } from './user-addresses-form/user-addresses-form.component';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { CreateUserAddressUseCase } from '../../../application/use-cases/user-addresses/create-user-address/create-user-address.use-case';
import { UserAddresses } from '../../../domain/entities/user-addresses.entity';
import { IUserAddresses } from '../../../types/user-addresses.type';
import { CreateUserUseCase } from '../../../application/use-cases/create-user/create-user.use-case';
import { UpdateUserAddressUseCase } from '../../../application/use-cases/user-addresses/update-user-address/update-user-address.use-case';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [ButtonComponent, UserAddressesFormComponent, SearchBarComponent, NgIcon],
  providers: [
    CreateUserUseCase,
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
  modeView = signal<'create' | 'edit' | 'info'>('info');
  isLoading = signal<boolean>(false);
  isSubmitted = signal<boolean>(false);
  selectedAddress = signal<UserAddresses | null>(null);

  constructor(
    private readonly createUserAddressUseCase: CreateUserAddressUseCase,
    private readonly updateUserAddressUseCase: UpdateUserAddressUseCase,
  ) {}

  private createUserAddress(address: IUserAddresses) {
    this.createUserAddressUseCase.execute(address).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.modeView.set('info');
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  private updateUserAddress(address: IUserAddresses) {
    const userAddress = this.selectedAddress();

    if (!userAddress) {
      return;
    }

    console.log(userAddress.userId);

    this.isLoading.set(true);

    this.updateUserAddressUseCase
      .execute({
        ...address,
        id: userAddress.id,
        userId: userAddress.userId,
      })
      .subscribe({
        next: () => {
          this.closeForm();
        },

        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  openEdit(address: UserAddresses) {
    this.selectedAddress.set(address);
    this.isSubmitted.set(false);
    this.modeView.set('edit');
  }

  saveAddress(address: IUserAddresses) {
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

  closeForm() {
    this.modeView.set('info');
    this.selectedAddress.set(null);
  }
}
