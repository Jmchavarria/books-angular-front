import { Observable } from 'rxjs';
import { Categories } from '../entities/categories.entity';
import { CreateCategoryProps, UpdateCategoryProps } from '../entities/categories.props';
import { FiltersDto } from '../../../../core/interfaces/filters.interface';
import { PaginatedResult } from '../../../../core/types/paginated-response';

export abstract class CategoriesRepository {
  abstract getAll(filters?: FiltersDto[]): Observable<PaginatedResult<Categories>>;
  abstract create(input: CreateCategoryProps): Observable<Categories>;
  abstract update(input: UpdateCategoryProps): Observable<Categories>;
}
