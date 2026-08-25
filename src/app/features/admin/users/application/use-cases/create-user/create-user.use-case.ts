import { Injectable } from '@angular/core';
import { UsersRepository } from '../../../domain/repositories/users.repository';
import { User } from '../../../domain/entities/users.entity';
import { Observable } from 'rxjs';
import { CreateUserDto } from './create-user.dto';

@Injectable({
  providedIn: 'root',
})
export class CreateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}

  execute(input: CreateUserDto): Observable<User> {
    return this.repository.create(input);
  }
}
