import { Component, computed, signal } from '@angular/core';
import {
  objectData,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { ModalMode } from '../../../../users/types/user-modal.type';
import { GetAllOrdersUseCase } from '../../../application/use-cases/get-all-orders/get-all-orders.use-case';
import { UpdateOrderUseCase } from '../../../application/use-cases/update-order/update-order.use-case';
import { CreateOrderUseCase } from '../../../application/use-cases/create-order/create-order.use-case';
import { OrderDE } from '../../../domain/entities/orders.entity';
import { ModalHeader } from '../../../../../core/types/modal.type';
import { PaginatedResult } from '../../../../../core/types/paginated-response';
import { TableAction } from '../../../../../core/types/table.type';
import { booksModalHeaders } from '../../../../books/config/book-modal.config';
import { GetAllOrdersDto } from '../../../application/use-cases/get-all-orders/get-all-orders.dto';
import { OrderFormData } from '../../../types/orders-form.type';
import { CreateOrderProps } from '../../../domain/entities/orders.props';
import { ModalComponent } from '../../../../../core/components/modal/modal.component';
import { PaginationComponent } from '../../../../../core/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { OrderFormComponent } from '../../components/order-form/order-form.component';
import { ORDERS_COLUMNS, ORDERS_TABLE_ACTIONS } from '../../../config/order-table.config';
import { UsersmodalHeaders } from '../../../../users/config/user-modal.config';
import { DropdownComponent } from '../../../../../core/components/dropdown/dropdown.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TableUtilsService } from '../../../../../core/services/table-utils.service';
import { CurrencyPipe } from '@angular/common';
import { heroEllipsisVerticalSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-orders',
  standalone: true,
  providers: [
    provideIcons({
      heroEllipsisVerticalSolid,
    }),
  ],
  imports: [
    ModalComponent,
    PaginationComponent,
    TableComponent,
    SearchBarComponent,
    ButtonComponent,
    OrderFormComponent,
    DropdownComponent,
    NgIcon,
    CurrencyPipe,
  ],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  isLoading = signal<boolean>(false);
  readonly columns = ORDERS_COLUMNS;

  orders = signal<objectData<OrderDE>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  readonly actions = ORDERS_TABLE_ACTIONS;

  selectedOrder = signal<OrderDE | null>(null);
  modalMode = signal<ModalMode>(null);

  constructor(
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    public readonly tableUtilsService: TableUtilsService<OrderDE>,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  readonly modalHeader = computed<ModalHeader>(() => {
    const mode: Exclude<ModalMode, null> | null = this.modalMode();

    if (mode === null) {
      return {
        title: '',
        description: '',
      };
    }

    return UsersmodalHeaders[mode];
  });
  openEdit(order: OrderDE): void {
    this.selectedOrder.set(order);

    this.modalMode.set('edit');
  }

  openCreate(): void {
    this.selectedOrder.set(null);
    this.modalMode.set('create');
  }

  onAction(event: { action: TableAction; item: OrderDE }) {
    switch (event.action.key) {
      case 'edit':
        this.openEdit(event.item);
        break;
      case 'view detail':
        this.openDetail(event.item);
        break;
    }
  }

  openDetail(order: OrderDE): void {
    this.selectedOrder.set(order);
    this.modalMode.set('detail');
  }

  loadOrders(filters?: GetAllOrdersDto): void {
    this.getAllOrdersUseCase.execute(filters).subscribe({
      next: (response: PaginatedResult<OrderDE>) => {
        this.orders.set({
          data: response.data,
          limit: response.limit,
          page: response.page,
          total: response.total,
          totalPages: response.totalPages,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeModal() {
    this.modalMode.set(null);
    this.selectedOrder.set(null);
    // this.currentTab.set('info');
  }

  private createOrder(order: CreateOrderProps): void {
    this.isLoading.set(true);

    this.createOrderUseCase
      .execute({
        userId: order.userId,
        shippingAddressSnapshot: order.shippingAddressSnapshot,
        items: order.items,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.loadOrders();
          this.closeModal();
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error(err);
        },
      });
  }

  private updateOrder(orderForm: OrderFormData): void {
    const order = this.selectedOrder();

    if (!order) {
      return;
    }

    this.isLoading.set(true);

    this.updateOrderUseCase
      .execute({
        id: order.id,
        items: orderForm.items,

        shippingAddressSnapshot: orderForm.shippingAddressSnapshot,
      })
      .subscribe({
        next: () => {
          this.loadOrders();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  saveUser(order: OrderFormData): void {
    switch (this.modalMode()) {
      case 'create':
        this.createOrder(order);
        break;

      case 'edit':
        this.updateOrder(order);
        break;
    }
  }
}
