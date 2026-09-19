import { IQueryParams } from '../../../../core/interfaces/query-params.interface';
import { IShippingAddressSnapshot } from '../interfaces/order.interface';
import { CreateOrderItemProps } from './order-items.props';

export interface CreateOrderProps {
  userId: number;
  shippingAddressSnapshot: IShippingAddressSnapshot;
  items: CreateOrderItemProps[];
}

export interface GetAllOrdersProps {
  filter?: IQueryParams[];
}

export type UpdateOrderProps = Partial<CreateOrderProps> & { id: number };
