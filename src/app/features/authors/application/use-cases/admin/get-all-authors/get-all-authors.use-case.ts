import { Injectable } from '@angular/core';
import { AuthorsRepository } from '../../../../domain/repositories/authors.repository';
import { Observable } from 'rxjs';
import { Author } from '../../../../domain/entities/author.entity';
import { FiltersDto } from '../../../../../../core/interfaces/filters.interface';
import { PaginatedResult } from '../../../../../../core/types/paginated-response';
@Injectable({
  providedIn: 'root',
})
export class GetAllAuthorsUseCase {
  constructor(private readonly repository: AuthorsRepository) {}

  execute(filters?: FiltersDto[]): Observable<PaginatedResult<Author>> {
    return this.repository.getAll(filters);
  }
}
