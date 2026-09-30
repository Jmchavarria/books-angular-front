import { Injectable } from '@angular/core';
import { AuthorsRepository } from '../../../../domain/repositories/authors.repository';
import { Observable } from 'rxjs';
import { Author } from '../../../../domain/entities/author.entity';
import { PaginatedResult } from '../../../../../../core/types/paginated-response';
import { GetAllAuthorsDto } from './get-all-authors.dto';
@Injectable({
  providedIn: 'root',
})
export class GetAllAuthorsUseCase {
  constructor(private readonly repository: AuthorsRepository) {}

  execute(filters?: GetAllAuthorsDto): Observable<PaginatedResult<Author>> {
    return this.repository.getAll(filters);
  }
}
