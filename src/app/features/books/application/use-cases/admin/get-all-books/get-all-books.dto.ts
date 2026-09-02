import { Pagination } from '../../../../../../core/types/pagination';

export interface GetAllBooksDto extends Pagination {
  title?: string;
  isActive?: boolean;
  publishedYear?: number;
  search?: string;
}
