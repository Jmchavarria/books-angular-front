import { OrderItem } from './cart-item.entity';

export class Cart {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly items: OrderItem[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
