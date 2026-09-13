import { Injectable } from '@angular/core';
import { UserAddressesRepository } from '../../../../domain/repositories/user-adresses.repository';
import { UpdateUserAddressDto } from './update-user-address.dto';
import { UserAddresses } from '../../../../domain/entities/user-addresses.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserAddressUseCase {
  constructor(private readonly repository: UserAddressesRepository) {}

  execute(input: UpdateUserAddressDto): Observable<UserAddresses> {
    return this.repository.update(input);
  }
}
