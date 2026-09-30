import { IBook } from '../../../books/domain/interfaces/book.interfaces';
import { UserStatusTypeEnum } from '../../../users/domain/enums/users-status-type.enum';

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
  status: UserStatusTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  books: IBook[];
}
