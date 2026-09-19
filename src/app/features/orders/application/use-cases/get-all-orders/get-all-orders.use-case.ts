import { Injectable } from '@angular/core';
import { OrdersRepository } from '../../../domain/repositories/orders.repository';
import { GetAllOrdersProps } from '../../../domain/entities/orders.props';
import { Observable } from 'rxjs';
import { OrderDE } from '../../../domain/entities/orders.entity';
import { PaginatedResult } from '../../../../../core/types/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class GetAllOrdersUseCase {
  constructor(private readonly repository: OrdersRepository) {}

  execute(filters?: GetAllOrdersProps): Observable<PaginatedResult<OrderDE>> {
    return this.repository.getAll(filters);
  }
}
