import { Author } from '../../../authors/domain/entities/author.entity';
import { Categories } from '../../../categories/domain/entities/categories.entity';
import { Book } from '../../domain/entities/book.entity';

export interface BookApiResponse {
  id: number;
  title: string;
  author: Author;
  description: string;
  pages: number;
  price: number;
  coverImageUrl: string;
  publishedYear: number;
  category: Categories;
}

export class BookMapper {
  static toDomain(raw: BookApiResponse): Book {
    return new Book(
      raw.id,
      raw.title,
      raw.author,
      raw.description,
      raw.pages,
      raw.price,
      raw.coverImageUrl,
      raw.publishedYear,
      raw.category,
    );
  }
}
