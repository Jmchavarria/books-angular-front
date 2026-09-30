import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { heroEyeSlashSolid, heroEyeSolid } from '@ng-icons/heroicons/solid';
import { FormContainerComponent } from '../../../../core/components/form-container/form-container.component';
import { AuthorForm, AuthorFormData } from '../../types/authors-form-types';
import { Author } from '../../domain/entities/author.entity';

@Component({
  selector: 'app-author-form',
  standalone: true,
  providers: [
    provideIcons({
      heroEyeSlashSolid,
      heroEyeSolid,
    }),
  ],
  imports: [ReactiveFormsModule, FormContainerComponent],
  templateUrl: './author-form.component.html',
})
export class UserFormComponent implements OnChanges {
  authorForm: FormGroup<AuthorForm>;

  isLoading = input(false);
  isEdit = input(false);
  author = input<Author | null>(null);

  isSubmitted = false;
  showPassword = false;

  cancelled = output<void>();
  submitted = output<AuthorFormData>();

  constructor(private fb: FormBuilder) {
    this.authorForm = this.fb.nonNullable.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      biography: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      birthdate: [
        new Date(),
        [
          Validators.required,
          // dateInPastValidator(), // No permite fechas futuras
          // minimumAgeValidator(12) // Opcional: Requiere una edad mínima (ej: 12 años)
        ],
      ],
      deathdate: [
        new Date(),
        [
          Validators.required,
          // dateInPastValidator(), // No permite fechas futuras
          // minimumAgeValidator(12) // Opcional: Requiere una edad mínima (ej: 12 años)
        ],
      ],
      countryOfBirth: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['author']) {
      return;
    }

    const author = this.author();

    this.isSubmitted = false;

    if (author) {
      this.authorForm.patchValue({
        firstName: author.firstName,
        lastName: author.lastName,
        biography: author.biography,
        birthdate: author.birthdate,
        countryOfBirth: author.countryOfBirth,
      });

      this.showPassword = false;
    } else {
      this.resetForm();
    }
  }

  handleSubmit(): void {
    this.isSubmitted = true;

    this.authorForm.markAllAsTouched();
    this.authorForm.updateValueAndValidity();

    if (this.authorForm.invalid) {
      return;
    }

    this.submitted.emit(this.authorForm.getRawValue());
  }

  private resetForm(): void {
    this.authorForm.reset({
      firstName: '',
      lastName: '',
      biography: '',
      birthdate: new Date(),
      countryOfBirth: '',
    });

    this.isSubmitted = false;
    this.showPassword = false;
  }
}
