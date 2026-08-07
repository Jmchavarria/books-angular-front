export interface UserAuth {
  id: string;
  email: string;
  name: string;
  roles: string[];
  // Opcional: añade el token si tus casos de uso lo necesitan para lógica interna
  // token?: string;
}
