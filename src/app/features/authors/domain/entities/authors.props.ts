import { IQueryParams } from '../../../../core/interfaces/query-params.interface';

export interface CreateAuthorProps {
  firstName: string;
  lastName: string;
  birthdate: Date;
  biography?: string;
  countryOfBirth: string;
  literaryGenre?: string;
  photoUrl?: string;
}

export interface GetAllAuthorsProps {
  filter?: IQueryParams[];
}

export type UpdateAuthorsProps = Partial<CreateAuthorProps> & { id: number };
