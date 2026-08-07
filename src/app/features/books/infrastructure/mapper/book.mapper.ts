import { Author } from '../../../authors/domain/entities/author.entity';
import { Category } from '../../../categories/domain/entities/category.entitie';
import { Book } from '../../domain/entities/book.entity';

export interface BookApiResponse {
  id: number;
  title: string;
  author: Author; 
  description: string;
  pages: number;
  publishedYear: number;
  category: Category;
}

export class BookMapper {
  static toDomain(raw: BookApiResponse): Book {
    return new Book(
      raw.id,
      raw.title,
      raw.author,
      raw.description,
      raw.pages,
      raw.publishedYear,
      raw.category,
    );
  }
}
