export type TableKey =
  | 'edit'
  | 'delete'
  | 'activate'
  | 'desactivate'
  | 'change password'
  | 'view detail';

export interface TableAction {
  key: TableKey;
  label: string;
  icon: string;
}

export interface TableData<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
