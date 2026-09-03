import { Injectable } from '@angular/core';
import { AuthorsRepository } from '../../../../domain/repositories/authors.repository';
import { CreateAuthorDto } from './create-author.dto';
import { Author } from '../../../../domain/entities/author.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateAuthorUseCase {
  constructor(private readonly repository: AuthorsRepository) {}

  execute(input: CreateAuthorDto): Observable<Author> {
    return this.repository.create(input);
  }
}
