import { Book } from '../../../books/domain/entities/book.entity';
import { Author } from '../../domain/entities/author.entity';

export interface AuhorsApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  slug: string;
  birthdate: Date;
  deathdate: Date;
  biography: string;
  countryOfBirth: string;
  photoUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  books: Book[];
}

export class AuthorsMapper {
  static toDomain(author: AuhorsApiResponse): Author {
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
      author.isActive,
      author.createdAt,
      author.updatedAt,
      author.books,
    );
  }
}
