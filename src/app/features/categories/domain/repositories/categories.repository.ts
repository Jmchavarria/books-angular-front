import { Observable } from 'rxjs';
import { Categories } from '../entities/categories.entity';
import { CreateCategoryProps, UpdateCategoryProps } from '../entities/categories.props';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { IQueryParams } from '../../../../core/interfaces/query-params.interface';

export abstract class CategoriesRepository {
  abstract getAll(filters?: IQueryParams[]): Observable<PaginatedResult<Categories>>;
  abstract create(input: CreateCategoryProps): Observable<Categories>;
  abstract update(input: UpdateCategoryProps): Observable<Categories>;
}
