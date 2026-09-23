import { TableAction } from '../../../core/types/table.type';

export const ORDERS_TABLE_ACTIONS: TableAction[] = [
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

export const ORDERS_COLUMNS = [
  'id',
  'orderNumber',
  'status',
  'subtotal',
  'shippingCost',
  'taxAmount',
  'discountAmount',
  'totalAmount',
];
