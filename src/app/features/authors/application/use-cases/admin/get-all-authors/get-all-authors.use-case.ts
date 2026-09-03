import { Injectable } from '@angular/core';
import { AuthorsRepository } from '../../../../domain/repositories/authors.repository';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../../../core/types/paginated-response';
import { Author } from '../../../../domain/entities/author.entity';

@Injectable({
  providedIn: 'root',
})
export class GetAllAuthorsUseCase {
  constructor(private readonly repository: AuthorsRepository) {}

  execute(): Observable<PaginatedResponse<Author[]>> {
    return this.repository.getAll();
  }
}
