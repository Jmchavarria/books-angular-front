import { IBook } from '../../../books/domain/interfaces/book.interfaces';

export interface IAuthor {
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
  books: IBook[];
}
