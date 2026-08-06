import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BooksHttpRepository } from './features/books/infrastructure/repositories/books-http.repository';
import { BooksRepository } from './features/books/domain/repositories/books.repository';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: BooksRepository, useClass: BooksHttpRepository },
  ],
};
