import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { Author } from '../entities/author.entity';
import {
  CreateAuthorProps,
  GetAllAuthorsProps,
  UpdateAuthorsProps,
} from '../entities/authors.props';

export abstract class AuthorsRepository {
  abstract getAll(filters?: GetAllAuthorsProps): Observable<PaginatedResult<Author>>;
  abstract create(input: CreateAuthorProps): Observable<Author>;
  abstract update(input: UpdateAuthorsProps): Observable<Author>;
}
