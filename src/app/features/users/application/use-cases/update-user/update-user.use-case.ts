import { Injectable } from '@angular/core';
import { UsersRepository } from '../../../domain/repositories/users.repository';
import { UpdateUserDto } from './update-user.dto';
import { User } from '../../../domain/entities/users.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}
  execute(input: UpdateUserDto): Observable<User> {
    return this.repository.update(input);
  }
}
