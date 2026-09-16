import { Injectable } from '@angular/core';
import { UserAddressesRepository } from '../../../../domain/repositories/user-adresses.repository';
import { PaginatedResult } from '../../../../../../core/types/paginated-response';
import { UserAddresses } from '../../../../domain/entities/user-addresses.entity';
import { Observable } from 'rxjs';
import { GetAllUserAdrressesDto } from './get-all-user-addresses.dto';

@Injectable({
  providedIn: 'root',
})
export class GetAllUserAddressesUseCase {
  constructor(private readonly repository: UserAddressesRepository) {}

  execute(filters?: GetAllUserAdrressesDto): Observable<PaginatedResult<UserAddresses>> {
    return this.repository.getAll(filters);
  }
}
