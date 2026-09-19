import { OrderItemDE } from '../../../orders/domain/entities/order-item.entity';

export class Cart {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly items: OrderItemDE[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
