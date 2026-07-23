// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BooksCatalogComponent } from './books/pages/books-catalog/books-catalog.component';
import { HomeComponent } from './home/pages/home/home.component';
import { BooksCollectionsComponent } from './books/pages/books-collections/books-collections.component';
import { ShoppingCartComponent } from './books/pages/shopping-cart/shopping-cart.component';
import { BooksBestsellersComponents } from './books/pages/books-bestsellers/books-bestsellers.component';
import { LoginComponent } from './books/pages/auth/login/login.component';
import { ResetPasswordComponent } from './books/pages/auth/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksCatalogComponent },
  { path: 'catalog', component: BooksCatalogComponent },
  { path: 'collections', component: BooksCollectionsComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'bestsellers', component: BooksBestsellersComponents },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];
