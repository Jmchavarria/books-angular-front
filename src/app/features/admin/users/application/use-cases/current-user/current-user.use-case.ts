import { Injectable } from '@angular/core';
import { UsersRepository } from '../../../domain/repositories/users.repository';
import { RoleTypeEnum } from '../../../../../../core/enums/role.enum';
import { Observable } from 'rxjs';
import { UserAuth } from '../../../../../auth/domain/interfaces/user-auth';

@Injectable()
export class GetUserRoleUseCase {
  constructor(private readonly repository: UsersRepository) {}

  execute(): Observable<UserAuth | null > {
    return this.repository.currentUser();
  }
}
