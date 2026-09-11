import { Observable } from 'rxjs';
import { UsersRepository } from '../../../domain/repositories/users.repository';
import { User } from '../../../domain/entities/users.entity';
import { Injectable } from '@angular/core';
import { GetAllUsersDto } from './get-all-users.dto';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersUseCase {
  constructor(private readonly repository: UsersRepository) {}
  execute(filters?: GetAllUsersDto[]): Observable<PaginatedResponse<User>> {
    return this.repository.getAll(filters);
  }
}
