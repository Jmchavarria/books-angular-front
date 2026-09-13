import { Observable } from 'rxjs';
import { CreateUserAddressProps } from '../../../../domain/entities/user-addresses.props';
import { UserAddressesRepository } from '../../../../domain/repositories/user-adresses.repository';
import { UserAddresses } from '../../../../domain/entities/user-addresses.entity';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateUserAddressUseCase {
  constructor(private readonly repository: UserAddressesRepository) {}

  execute(input: CreateUserAddressProps): Observable<UserAddresses> {
    return this.repository.create(input);
  }
}
