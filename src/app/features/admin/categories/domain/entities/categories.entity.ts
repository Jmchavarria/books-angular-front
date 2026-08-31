import { UserStatusTypeEnum } from '../../../users/domain/enums/users-status-type.enum';

export class Categories {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly status: UserStatusTypeEnum,
  ) {}
}
