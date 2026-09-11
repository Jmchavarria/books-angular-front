import { Observable } from 'rxjs';
import { Categories } from '../entities/categories.entity';
import { CreateCategoryProps, UpdateCategoryProps } from '../entities/categories.props';
import { FiltersDto } from '../../../../core/interfaces/filters.interface';
import { PaginatedResponse } from '../../../../core/types/paginated-response';

export abstract class CategoriesRepository {
  abstract getAll(filters?: FiltersDto[]): Observable<PaginatedResponse<Categories>>;
  abstract create(input: CreateCategoryProps): Observable<Categories>;
  abstract update(input: UpdateCategoryProps): Observable<Categories>;
}
