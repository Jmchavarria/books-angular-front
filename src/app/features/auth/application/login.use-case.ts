import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../domain/repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(email: string, password: string): Observable<any> {
    return this.repository.login(email, password);
  }
}
