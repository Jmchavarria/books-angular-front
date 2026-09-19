import { IShippingAddressSnapshot } from '../../../domain/interfaces/order.interface';

export interface CreateOrderItemDto {
  bookId: number;
  quantity: number;
}

export interface CreateOrderDto {
  userId: number;
  shippingAddressSnapshot: IShippingAddressSnapshot;
  items: CreateOrderItemDto[];
}
