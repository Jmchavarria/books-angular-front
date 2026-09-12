import { Component, input } from '@angular/core';
import { UserAddresses } from '../../domain/entities/user-addresses.entity';

@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [],
  templateUrl: './user-addresses.component.html',
})
export class UserAddressesComponent {
  addresses = input<UserAddresses[]>([]);
}
