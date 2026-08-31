import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../../../../../../core/types/paginated-response';
import { Categories } from '../../../domain/entities/categories.entity';
import { CategoriesRepository } from '../../../domain/repositories/categories.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAllCategoriesUseCase {
  constructor(private readonly repository: CategoriesRepository) {}

  execute(): Observable<PaginatedResponse<Categories[]>> {
    return this.repository.getAll();
  }
}
