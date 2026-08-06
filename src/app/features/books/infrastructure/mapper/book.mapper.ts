import { Book } from '../../domain/entities/book.entity';

export interface BookApiResponse {
  id: number;
  title: string;
  author: {
    name: string;
  };
  description: string;
  pages: number;
  publishedYear: number;
  category: { id: number; name: string };
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
