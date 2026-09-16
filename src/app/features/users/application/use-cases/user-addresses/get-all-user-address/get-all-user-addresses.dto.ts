import { IQueryParams } from '../../../../../../core/interfaces/query-params.interface';

export interface GetAllUserAdrressesDto extends IQueryParams {
  userId: number;
}
