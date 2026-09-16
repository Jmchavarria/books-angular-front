import { IQueryParams } from '../../../../core/interfaces/query-params.interface';

export interface CreateUserAddressProps {
  userId: number;
  alias: string;
  streetAddress: string;
  apartmentOrSuite: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface GetAllUserAddressesProps {
  userId?: number;
  filter?: IQueryParams[];
}

export type UpdateUserAddressesProps = Partial<CreateUserAddressProps> & { id: number };
