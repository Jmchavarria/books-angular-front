import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Categories } from '../../../../domain/entities/categories.entity';
import { CategoriesRepository } from '../../../../domain/repositories/categories.repository';
import { PaginatedResult } from '../../../../../../core/types/paginated-response';
import { IQueryParams } from '../../../../../../core/interfaces/query-params.interface';

@Injectable({
  providedIn: 'root',
})
export class GetAllCategoriesUseCase {
  constructor(private readonly repository: CategoriesRepository) {}

  execute(filters?: IQueryParams[]): Observable<PaginatedResult<Categories>> {
    return this.repository.getAll(filters);
  }
}
