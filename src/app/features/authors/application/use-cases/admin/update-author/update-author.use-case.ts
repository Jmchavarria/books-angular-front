import { Injectable } from '@angular/core';
import { AuthorsRepository } from '../../../../domain/repositories/authors.repository';
import { UpdateAuthorDto } from './update-author.dto';
import { Author } from '../../../../domain/entities/author.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateAuthorUseCase {
  constructor(private readonly repository: AuthorsRepository) {}

  execute(input: UpdateAuthorDto): Observable<Author> {
    return this.repository.update(input);
  }
}
