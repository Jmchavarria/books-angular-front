import { UserStatusTypeEnum } from '../../../users/domain/enums/users-status-type.enum';
import { Categories } from '../../domain/entities/categories.entity';

export interface CategoriesApiResponse {
  id: number;
  name: string;
  description: string;
  status: UserStatusTypeEnum;
}

export class CategoriesMapper {
  static toDomain(raw: CategoriesApiResponse): Categories {
    return new Categories(raw.id, raw.name, raw.description, raw.status);
  }
}
