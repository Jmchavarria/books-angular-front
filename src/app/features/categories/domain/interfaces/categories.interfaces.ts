import { UserStatusTypeEnum } from '../../../users/domain/enums/users-status-type.enum';

export interface ICatetegories {
  id: number;
  name: string;
  description: string;
  status: UserStatusTypeEnum;
}
