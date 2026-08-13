import { Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { UserAuth } from '../../domain/interfaces/user-auth';
import { Observable } from 'rxjs';

@Injectable()
export class GetUserAuthUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(): Observable<UserAuth | null> {
    return this.repository.getUserAuth();
  }
}
