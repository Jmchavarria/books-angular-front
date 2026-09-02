import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import { UsersRepository } from '../../../domain/repositories/users.repository';
import { User } from '../../../domain/entities/users.entity';
import { Injectable } from '@angular/core';
import { ApiPaginatedResponse } from '../../../../../core/types/api-envelope';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersUseCase {
  constructor(private readonly repository: UsersRepository) {}

  execute(): Observable<PaginatedResponse<User[]>> {
    return this.repository.getAll();
  }
}
