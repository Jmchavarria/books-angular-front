import { FormControl } from '@angular/forms';
import { RoleTypeEnum } from '../../../core/enums/role.enum';

export interface UsersForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  password: FormControl<string>;
  role: FormControl<RoleTypeEnum>;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: RoleTypeEnum;
}
