import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BooksRepository } from './books/domain/repositories/books.repository';
import { BooksHttpRepository } from './books/infrastructure/repositories/books-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    { provide: BooksRepository, useClass: BooksHttpRepository },
  ],
};