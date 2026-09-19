import { IAuthor } from '../../../authors/domain/interfaces/author.interface';
import { ICatetegories } from '../../../categories/domain/interfaces/categories.interfaces';

export interface IBook {
  id: number;
  title: string;
  author: IAuthor;
  description: string;
  pages: number;
  price: number;
  coverImageUrl: string;
  publishedYear: number;
  category: ICatetegories;
}
