// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CreateAccountComponent } from './features/auth/ui/pages/auth/create-account/create-account.component';
import { LoginComponent } from './features/auth/ui/pages/auth/login/login.component';
import { ResetPasswordComponent } from './features/auth/ui/pages/auth/reset-password/reset-password.component';
import { BooksBestsellersComponents } from './features/books/presentation/pages/books-bestsellers/books-bestsellers.component';
import { BooksCatalogComponent } from './features/books/presentation/pages/books-catalog/books-catalog.component';
import { BooksCollectionsComponent } from './features/books/presentation/pages/books-collections/books-collections.component';
import { ShoppingCartComponent } from './features/shopping-cart/presentation/pages/shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksCatalogComponent },
  { path: 'catalog', component: BooksCatalogComponent },
  { path: 'collections', component: BooksCollectionsComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'bestsellers', component: BooksBestsellersComponents },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'create-account', component: CreateAccountComponent },

  //esta seria la forma de asignar el auth guard a una ruta especifica
  // { path: 'users-management', component: CreateAccountComponent, canActivate: [AuthGuard] },
];
