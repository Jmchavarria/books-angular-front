import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { Author } from '../entities/author.entity';

export abstract class AuthorsRepository {
  abstract getAll(): Observable<PaginatedResponse<Author[]>>;
}
