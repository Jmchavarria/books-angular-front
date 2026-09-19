import { Injectable } from '@angular/core';
import { OrdersRepository } from '../../../domain/repositories/orders.repository';
import { UpdateOrderProps } from '../../../domain/entities/orders.props';
import { Observable } from 'rxjs';
import { OrderDE } from '../../../domain/entities/orders.entity';

@Injectable({
  providedIn: 'root'
})
export class UpdateOrderUseCase {
  constructor(private readonly repository: OrdersRepository) {}

  execute(data: UpdateOrderProps): Observable<OrderDE> {
    return this.repository.update(data);
  }
}
