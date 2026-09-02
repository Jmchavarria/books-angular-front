import { CreateUserDto } from '../create-user/create-user.dto';

export type UpdateUserDto = Partial<CreateUserDto> & { id: number };
