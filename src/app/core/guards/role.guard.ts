import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleTypeEnum } from '../enums/role.enum';
import { GetUserAuthUseCase } from '../../features/auth/application/get-user-auth/get-user-auth.use-case';
import { map, take } from 'rxjs';

export const rolesGuard: CanActivateFn = (route) => {
  const getUserAuthUseCase = inject(GetUserAuthUseCase);
  const router = inject(Router);

  const requiredRole = route.data['role'] as RoleTypeEnum;

  console.log('si se está ejecutando');

  return getUserAuthUseCase.execute().pipe(
    take(1),
    map((userAuth) => {
      if (!userAuth) {
        router.navigate(['/login']);
        return false;
      }

      if (userAuth.role === requiredRole) {
        return true;
      }

      if (userAuth.role === RoleTypeEnum.admin) {
        router.navigate(['/dashboard']);
      } else {
        router.navigate(['/']);
      }

      return false; // Crucial para avisarle a Angular que bloquee la ruta original
    }),
  );
};
