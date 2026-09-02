import { Observable } from 'rxjs';
import { BooksRepository } from '../../../../domain/repositories/books.repository';
import { CreateBookDto } from './create-book.dto';
import { Injectable } from '@angular/core';
import { Book } from '../../../../domain/entities/book.entity';

@Injectable({
  providedIn: 'root',
})
export class CreateBookUseCase {
  constructor(private readonly repository: BooksRepository) {}

  execute(data: CreateBookDto): Observable<Book> {
    return this.repository.create(data);
  }
}
