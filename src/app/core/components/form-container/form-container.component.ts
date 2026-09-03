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
  title = input<string>();
  isLoading = input<boolean>();
  onSubmit = output<void>();
  onCancel = output<void>();

  handleSubmit(): void {
    const form = this.formGroup();

    form.updateValueAndValidity();

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.onSubmit.emit();
  }

  handleCancel(): void {
    this.onCancel.emit();
  }
}
