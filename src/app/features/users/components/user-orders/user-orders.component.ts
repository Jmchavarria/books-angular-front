import { Component, input } from '@angular/core';
import { Order } from '../../../orders/domain/entities/orders.entity';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './users-orders.component.html',
})
export class UsersOrdersComponent {
  orders = input<Order[]>([]);
}
