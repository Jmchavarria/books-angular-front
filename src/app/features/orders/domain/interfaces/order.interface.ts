import { User } from '../../../users/domain/entities/users.entity';
import { OrderStatusTypeEnum } from '../enums/order-status-type.enum';
import { IOrderItem } from './order-item.interface';

export interface IShippingAddressSnapshot {
  alias?: string;
  streetAddress: string;
  apartmentOrSuite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  recipientName?: string;
  recipientPhone?: string;
}

export interface IOrder {
  id: number;
  orderNumber: string;
  userId: number;
  user: User;
  status: OrderStatusTypeEnum;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddressSnapshot: IShippingAddressSnapshot;
  trackingNumber?: string;
  shippingCarrier?: string;
  createdAt: Date;
  updatedAt: Date;
  items?: IOrderItem[];
}
