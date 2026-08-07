import { BooksRepository } from '../../../domain/repositories/books.repository';

export class GetBookByIdUseCase {
  constructor(private readonly repository: BooksRepository) {}

  execute(id: number) {
    return this.repository.getById(id);
  }
}
