import { Book } from "../../../books/domain/entities/book.entity";

export class Author {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly slug: string,
    public readonly birthdate: Date,
    public readonly deathdate: Date,
    public readonly biography: string,
    public readonly countryOfBirth: string,
    public readonly photoUrl: string,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly books: Book[],
  // public readonly genres: GenresOrmEntity[];

    
  ) {}
}
