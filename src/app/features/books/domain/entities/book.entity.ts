import { Author } from '../../../authors/domain/entities/author.entity';
import { Category } from '../../../categories/domain/entities/category.entitie';

export class Book {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly author: Author,
    public readonly description: string,
    public readonly pages: number,
    public readonly publishedYear: number,
    public readonly category: Category,
  ) {}
}
