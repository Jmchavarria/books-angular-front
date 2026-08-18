import { Injectable } from '@angular/core';
import { RegisterDto } from './register.dto';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class RegisterUseCase {
  constructor(private readonly repository: AuthRepository) {}
  execute(input: RegisterDto) {
    return this.repository.register(input);
  }
}
