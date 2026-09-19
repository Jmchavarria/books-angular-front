import { FormArray, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { OrderStatusTypeEnum } from '../domain/enums/order-status-type.enum';
import { IShippingAddressSnapshot } from '../domain/interfaces/order.interface';
import { IOrderItem } from '../domain/interfaces/order-item.interface';

export interface ShippingAddressForm {
  alias: FormControl<string>;
  streetAddress: FormControl<string>;
  apartmentOrSuite: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  postalCode: FormControl<string>;
  country: FormControl<string>;
  recipientName: FormControl<string>;
  recipientPhone: FormControl<string>;
}

export interface OrderItemFormGroup {
  bookId: FormControl<number>;
  quantity: FormControl<number>;
  priceAtPurchase: FormControl<number>;
}

export interface OrderForm {
  userId: FormControl<number>;
  status: FormControl<OrderStatusTypeEnum>;
  shippingAddressSnapshot: FormGroup<ShippingAddressForm>;
  items: FormArray<FormGroup<OrderItemFormGroup>>;
}

export type OrderFormData = {
  userId: number;
  status: OrderStatusTypeEnum;
  shippingAddressSnapshot: IShippingAddressSnapshot;
  items: IOrderItem[];
};
