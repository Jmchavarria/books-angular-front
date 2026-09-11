import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Categories } from '../../../../domain/entities/categories.entity';
import { CategoriesRepository } from '../../../../domain/repositories/categories.repository';
import { FiltersDto } from '../../../../../../core/interfaces/filters.interface';
import { PaginatedResponse } from '../../../../../../core/types/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class GetAllCategoriesUseCase {
  constructor(private readonly repository: CategoriesRepository) {}

  execute(filters?: FiltersDto[]): Observable<PaginatedResponse<Categories>> {
    return this.repository.getAll(filters);
  }
}
