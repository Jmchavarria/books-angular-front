import { IQueryParams } from '../../../../../../core/interfaces/query-params.interface';

export interface GetAllUserAdrressesDto {
  userId?: number;
  filter?: IQueryParams[];
}
