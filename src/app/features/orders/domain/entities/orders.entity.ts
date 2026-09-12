import { OrderItem } from './order-item.entity';

export class Order {
  constructor(
    public readonly id: number,
    public readonly orderNumber: string,
    public readonly userId: string,
    public readonly status: string,
    public readonly subtotal: string,
    public readonly shippingCost: string,
    public readonly taxAmount: string,
    public readonly discountAmount: string,
    public readonly totalAmount: string,
    public readonly shippingAddressSnapshot: {
      alias?: string;
      streetAddress: string;
      apartmentOrSuite?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      recipientName?: string;
      recipientPhone?: string;
    },
    public readonly trackingNumber: string,
    public readonly shippingCarrier: string,
    public readonly items: OrderItem[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
