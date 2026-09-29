import { IQueryParams } from '../../../../core/interfaces/query-params.interface';

export interface CreateCategoryProps {
  name: string;
  description: string;
}

export interface GetAllCategoriesProps {
  filter?: IQueryParams[];
}

export type UpdateCategoryProps = Partial<CreateCategoryProps> & { id: number };
