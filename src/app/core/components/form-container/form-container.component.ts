import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-container.component.html',
})
export class FormContainerComponent<T extends { [K in keyof T]: any }> {
  formGroup = input.required<FormGroup<T>>();
  isLoading = input<boolean>();
  ngSubmit = output<void>();
  onCancel = output<void>();

  handleSubmit(): void {
    this.ngSubmit.emit();
  }

  handleCancel(): void {
    this.onCancel.emit();
  }
}
