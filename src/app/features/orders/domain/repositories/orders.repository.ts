import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { UpdateUserProps } from '../../../users/domain/entities/users.props';
import { OrderDE } from '../entities/orders.entity';
import { CreateOrderProps, GetAllOrdersProps } from '../entities/orders.props';

export abstract class OrdersRepository {
  abstract getAll(filters?: GetAllOrdersProps): Observable<PaginatedResult<OrderDE>>;
  abstract create(input: CreateOrderProps): Observable<OrderDE>;
  abstract update(input: UpdateUserProps): Observable<OrderDE>;
}
