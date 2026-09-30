import { Book } from '../../../books/domain/entities/book.entity';
import { UserStatusTypeEnum } from '../../../users/domain/enums/users-status-type.enum';
import { Author } from '../../domain/entities/author.entity';

export interface AuthorsApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  birthdate: Date;
  deathdate: Date;
  biography: string;
  countryOfBirth: string;
  photoUrl: string;
  status: UserStatusTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  books: Book[];
}

export class AuthorsMapper {
  static toDomain(author: AuthorsApiResponse): Author {
    return new Author(
      author.id,
      author.firstName,
      author.lastName,
      author.slug,
      author.birthdate,
      author.deathdate,
      author.biography,
      author.countryOfBirth,
      author.photoUrl,
      author.status,
      author.createdAt,
      author.updatedAt,
      author.books,
    );
  }
}
