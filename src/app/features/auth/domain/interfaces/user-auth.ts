import { RoleTypeEnum } from '../../../../core/enums/role.enum';

export interface UserAuth {
  id: string;
  email: string;
  fullName: string;
  role: RoleTypeEnum;
  // Opcional: añade el token si tus casos de uso lo necesitan para lógica interna
  // token?: string;
}
