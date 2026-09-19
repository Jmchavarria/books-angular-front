import { Injectable } from '@angular/core';
import { OrdersRepository } from '../../../domain/repositories/orders.repository';
import { CreateOrderProps, UpdateOrderProps } from '../../../domain/entities/orders.props';
import { Observable } from 'rxjs';
import { OrderDE } from '../../../domain/entities/orders.entity';

@Injectable({
  providedIn: 'root',
})
export class CreateOrderUseCase {
  constructor(private readonly repository: OrdersRepository) {}

  execute(input: CreateOrderProps): Observable<OrderDE> {
    return this.repository.create(input);
  }
}
