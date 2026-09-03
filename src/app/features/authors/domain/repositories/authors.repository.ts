import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { Author } from '../entities/author.entity';
import { CreateAuthorProps } from '../entities/authors.props';

export abstract class AuthorsRepository {
  abstract getAll(): Observable<PaginatedResponse<Author[]>>;
  abstract create(input: CreateAuthorProps): Observable<Author>;
}
