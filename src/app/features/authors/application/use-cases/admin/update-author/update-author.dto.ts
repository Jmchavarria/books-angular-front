import { CreateAuthorDto } from '../create-author/create-author.dto';

export type UpdateAuthorDto = Partial<CreateAuthorDto> & { id: number };
