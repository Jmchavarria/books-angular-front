import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { FormContainerComponent } from '../../../../core/components/form-container/form-container.component';
import { RoleTypeEnum } from '../../../../core/enums/role.enum';
import { Book } from '../../domain/entities/book.entity';
import { BookForm, BookFormData } from '../../types/book-form.type';
import { Author } from '../../../authors/domain/entities/author.entity';
import { Categories } from '../../../categories/domain/entities/categories.entity';
import { objectData } from '../../../../core/layouts/admin-layouts/table/table.component';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormContainerComponent],
  templateUrl: './book-form.component.html',
})
export class UserFormComponent {
  bookForm: FormGroup<BookForm>;

  isLoading = input(false);
  isEdit = input(false);
  book = input<Book | null>(null);
  isSubmitted = false;
  showPassword = false;
  authors = input<objectData<Author>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  categories = input<objectData<Categories>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });

  cancelled = output<void>();
  submitted = output<BookFormData>();
  protected readonly RoleTypeEnum = RoleTypeEnum;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      publishedYear: [0, [Validators.required]],
      pages: [0, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      author: [0, [Validators.required]],
      category: [0, [Validators.required]],
    });

    effect(() => {
      const book = this.book();

      this.isSubmitted = false;

      if (book) {
        this.bookForm.patchValue({
          title: book.title,
          description: book.description,
          publishedYear: book.publishedYear,
          author: book.author.id,
          category: book.category.id,
        });

        this.showPassword = false;
      } else {
        this.resetForm();
      }
    });
  }

  handleSubmit(): void {
    this.isSubmitted = true;

    this.bookForm.markAllAsTouched();
    this.bookForm.updateValueAndValidity();

    if (this.bookForm.invalid) {
      return;
    }

    this.submitted.emit(this.bookForm.getRawValue());
  }

  private resetForm(): void {
    this.bookForm.reset({
      title: '',
      description: '',
      publishedYear: 2026,
      pages: 0,
      author: 0,
      category: 0,
    });

    this.isSubmitted = false;
    this.showPassword = false;
  }
}
