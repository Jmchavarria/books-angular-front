import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import { Categories } from '../entities/categories.entity';
import { CreateCategoryProps, UpdateCategoryProps } from '../entities/categories.props';

export abstract class CategoriesRepository {
  abstract getAll(): Observable<PaginatedResponse<Categories[]>>;
  abstract create(input: CreateCategoryProps): Observable<Categories>;
  abstract update(input: UpdateCategoryProps): Observable<Categories>;
}
