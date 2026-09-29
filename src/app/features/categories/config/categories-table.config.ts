import { TableAction } from '../../../core/types/table.type';

export const CATEGORIES_TABLE_ACTIONS: TableAction[] = [
  {
    key: 'edit',
    label: 'Edit',
    icon: 'pencil-square',
  },
  {
    key: 'view detail',
    label: 'View Detail',
    icon: 'eye',
  },
];

export const CATEGORIES_COLUMNS = ['id', 'name', 'description', 'status'];
