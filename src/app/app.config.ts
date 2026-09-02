import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BooksRepositoryImpl } from './features/books/infrastructure/repositories/books.repository-impl';
import { BooksRepository } from './features/books/domain/repositories/books.repository';
import { AuthRepository } from './features/auth/domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './features/auth/infrastructure/repositories/auth.repository-impl';
import { UsersRepository } from './features/users/domain/repositories/users.repository';
import { UsersRepositoryImpl } from './features/users/infrastructure/repositories/users.repository-impl';
import { CategoriesRepository } from './features/categories/domain/repositories/categories.repository';
import { CategoriesRepositoryImpl } from './features/categories/infrastructure/repositories/categories.repository-impl';
import { AuthorsRepository } from './features/authors/domain/repositories/authors.repository';
import { AuthorsRepositoryImpl } from './features/authors/infrastructure/repositories/authors.repository-impl';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: BooksRepository, useClass: BooksRepositoryImpl },
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: UsersRepository, useClass: UsersRepositoryImpl },
    { provide: CategoriesRepository, useClass: CategoriesRepositoryImpl },
    { provide: BooksRepository, useClass: BooksRepositoryImpl },
    { provide: AuthorsRepository, useClass: AuthorsRepositoryImpl },
  ],
};
