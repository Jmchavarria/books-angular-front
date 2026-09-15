import { Component, input } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { Cart } from '../../../../cart/domain/entities/cart.entity';
@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-cart.component.html',
})
export class UserCartComponent {
  cart = input<Cart | null>();

  
}
