import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { heroEyeSlashSolid, heroEyeSolid } from '@ng-icons/heroicons/solid';
import { FormContainerComponent } from '../../../../core/components/form-container/form-container.component';
import { CategoryForm, CategoryFormData } from '../../types/category-form.types';
import { Categories } from '../../domain/entities/categories.entity';

@Component({
  selector: 'app-category-form',
  standalone: true,
  providers: [
    provideIcons({
      heroEyeSlashSolid,
      heroEyeSolid,
    }),
  ],
  imports: [ReactiveFormsModule, FormContainerComponent],
  templateUrl: './category-form.component.html',
})
export class UserFormComponent implements OnChanges {
  categoryForm: FormGroup<CategoryForm>;

  isLoading = input(false);
  isEdit = input(false);
  category = input<Categories | null>(null);
  isSubmitted = false;
  cancelled = output<void>();
  submitted = output<CategoryFormData>();

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(155)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['category']) {
      return;
    }

    const category = this.category();
    this.isSubmitted = false;

    if (category) {
      this.categoryForm.patchValue({
        name: category.name,
        description: category.description,
      });
    } else {
      this.resetForm();
    }
  }

  handleSubmit(): void {
    this.isSubmitted = true;

    this.categoryForm.markAllAsTouched();
    this.categoryForm.updateValueAndValidity();

    if (this.categoryForm.invalid) {
      return;
    }

    this.submitted.emit(this.categoryForm.getRawValue());
  }

  private resetForm(): void {
    this.categoryForm.reset({
      name: '',
      description: '',
    });

    this.isSubmitted = false;
  }
}
