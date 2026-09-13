import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '../../../../orders/domain/entities/orders.entity';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './users-orders.component.html',
})
export class UsersOrdersComponent {
  orders = input<Order[]>([]);
}
