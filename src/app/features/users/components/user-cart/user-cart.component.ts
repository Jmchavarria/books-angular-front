import { Component, input } from '@angular/core';
import { Cart } from '../../../cart/domain/entities/cart.entity';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-cart.component.html',
})
export class UserCartComponent {
  cart = input<Cart | null>();
}
