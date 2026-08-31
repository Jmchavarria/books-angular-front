import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleTypeEnum } from '../enums/role.enum';
import { map, take } from 'rxjs';
import { AuthRepositoryImpl } from '../../features/auth/infrastructure/repositories/auth.repository-impl';

export const rolesGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const requiredRole = route.data['role'] as RoleTypeEnum;

  const userAuth = inject(AuthRepositoryImpl);

  const currentUser = userAuth.currentUser();

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  if (currentUser.role === requiredRole) {
    return true;
  }

  if (currentUser.role === RoleTypeEnum.admin) {
    router.navigate(['/dashboard']);
  } else {
    router.navigate(['/']);
  }

  return false;
};
