import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormContainerComponent } from '../../../../../core/components/form-container/form-container.component';
import { OrderStatusTypeEnum } from '../../../domain/enums/order-status-type.enum';
import { OrderDE } from '../../../domain/entities/orders.entity';
import { OrderForm, OrderFormData, OrderItemFormGroup } from '../../../types/orders-form.type';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormContainerComponent],
  templateUrl: './order-form.component.html',
})
export class OrderFormComponent implements OnChanges {
  orderForm: FormGroup<OrderForm>;

  isLoading = input(false);
  isEdit = input(false);
  order = input<OrderDE | null>(null);

  isSubmitted = false;

  cancelled = output<void>();
  submitted = output<OrderFormData>();

  protected readonly OrderStatusTypeEnum = OrderStatusTypeEnum;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.nonNullable.group<OrderForm>({
      userId: this.fb.nonNullable.control(0, [Validators.required, Validators.min(1)]),
      status: this.fb.nonNullable.control(OrderStatusTypeEnum.PENDING, [Validators.required]),
      shippingAddressSnapshot: this.fb.nonNullable.group({
        alias: ['', [Validators.required]],
        apartmentOrSuite: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        recipientName: ['', [Validators.required]],
        recipientPhone: ['', [Validators.required]],
        streetAddress: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
      }),
      items: this.fb.nonNullable.array<FormGroup<OrderItemFormGroup>>([], [Validators.required]),
    });
  }

  // Getter útil para el HTML
  get itemsControls(): FormArray<FormGroup<OrderItemFormGroup>> {
    return this.orderForm.controls.items;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['order']) {
      return;
    }

    const currentOrder = this.order();
    this.isSubmitted = false;

    if (currentOrder) {
      // Limpiar ítems anteriores antes de agregar los de la orden cargada
      this.itemsControls.clear();

      currentOrder.items?.forEach((item) => {
        this.addItem({
          bookId: item.bookId,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase,
        });
      });

      this.orderForm.patchValue({
        userId: currentOrder.userId,
        status: currentOrder.status,
        shippingAddressSnapshot: currentOrder.shippingAddressSnapshot,
      });
    } else {
      this.resetForm();
    }
  }

  // Métodos dinámicos para manipular los ítems de la orden
  addItem(data?: { bookId: number; quantity: number; priceAtPurchase: number }): void {
    const itemGroup = this.fb.nonNullable.group<OrderItemFormGroup>({
      bookId: this.fb.nonNullable.control(data?.bookId ?? 0, [
        Validators.required,
        Validators.min(1),
      ]),
      quantity: this.fb.nonNullable.control(data?.quantity ?? 1, [
        Validators.required,
        Validators.min(1),
      ]),
      priceAtPurchase: this.fb.nonNullable.control(data?.priceAtPurchase ?? 0, [
        Validators.required,
        Validators.min(0),
      ]),
    });

    this.itemsControls.push(itemGroup);
  }

  removeItem(index: number): void {
    this.itemsControls.removeAt(index);
  }

  handleSubmit(): void {
    this.isSubmitted = true;

    this.orderForm.markAllAsTouched();
    this.orderForm.updateValueAndValidity();

    if (this.orderForm.invalid) {
      return;
    }

    this.submitted.emit(this.orderForm.getRawValue() as OrderFormData);
  }

  handleCancel(): void {
    this.cancelled.emit();
  }

  private resetForm(): void {
    this.itemsControls.clear();
    this.orderForm.reset({
      userId: 0,
      status: OrderStatusTypeEnum.PENDING,
      shippingAddressSnapshot: {
        alias: '',
        apartmentOrSuite: '',
        city: '',
        country: '',
        postalCode: '',
        recipientName: '',
        state: '',
        recipientPhone: '',
        streetAddress: '',
      },
    });

    this.isSubmitted = false;
  }
}
