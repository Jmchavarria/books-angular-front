import { Routes } from '@angular/router';
import { CreateAccountComponent } from './features/auth/presentation/pages/auth/create-account/create-account.component';
import { LoginComponent } from './features/auth/presentation/pages/auth/login/login.component';
import { ResetPasswordComponent } from './features/auth/presentation/pages/auth/reset-password/reset-password.component';
import { ShoppingCartComponent } from './features/shopping-cart/presentation/pages/shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { rolesGuard } from './core/guards/role.guard';
import { RoleTypeEnum } from './core/enums/role.enum';
import { AdminLayoutComponent } from './core/layouts/admin-layouts/admin-layout.component';
import { BooksBestsellersComponents } from './features/books/presentation/pages/client/books-bestsellers/books-bestsellers.component';
import { BooksCatalogComponent } from './features/books/presentation/pages/client/books-catalog/books-catalog.component';
import { BooksCollectionsComponent } from './features/books/presentation/pages/client/books-collections/books-collections.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksCatalogComponent },
  { path: 'catalog', component: BooksCatalogComponent },
  { path: 'collections', component: BooksCollectionsComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'bestsellers', component: BooksBestsellersComponents },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'register', component: CreateAccountComponent },

  // Rutas asignadas solo para el acceso a usuarios logueados con rol Admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/presentation/pages/admin/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        data: { role: RoleTypeEnum.admin },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/presentation/pages/users.component').then(
            (m) => m.UsersComponent,
          ),
        // canActivate: [rolesGuard],
        data: { role: RoleTypeEnum.admin },
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/presentation/pages/admin/categories.component').then(
            (m) => m.CategoriesComponent,
          ),
        // canActivate: [rolesGuard],
        data: { role: RoleTypeEnum.admin },
      },
      {
        path: 'books',
        loadComponent: () =>
          import('./features/books/presentation/pages/admin/books.component').then(
            (m) => m.BooksComponent,
          ),
        // canActivate: [rolesGuard],
        data: { role: RoleTypeEnum.admin },
      },
      {
        path: 'authors',
        loadComponent: () =>
          import('./features/authors/presentation/pages/admin/authors.component').then(
            (m) => m.AuthorsComponent,
          ),
        // canActivate: [rolesGuard],
        data: { role: RoleTypeEnum.admin },
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/presentation/pages/admin/orders.component').then(
            (m) => m.OrdersComponent,
          ),
        // canActivate: [rolesGuard],
        data: { role: RoleTypeEnum.admin },
      },
    ],
    // canActivate: [rolesGuard],
  },
  { path: '**', redirectTo: 'admin/dashboard' },

  //esta seria la forma de asignar el auth guard a una ruta especifica
  // { path: 'users-management', component: CreateAccountComponent, canActivate: [AuthGuard] },
];
