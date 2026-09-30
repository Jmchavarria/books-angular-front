import { TableAction } from '../../../core/types/table.type';

export const AUTHORS_TABLE_ACTIONS: TableAction[] = [
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

export const AUTHORS_COLUMNS = [
  'id',
  'firstName',
  'lastName',
  'biography',
  'birthdate',
  'deathdate',
  'countryOfBirth',
  'status',
];
