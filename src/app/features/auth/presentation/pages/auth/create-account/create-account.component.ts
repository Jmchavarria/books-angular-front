import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GoogleAuthService } from '../../../../../../core/services/google-auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroEyeSlashSolid,
  heroEyeSolid,
  heroLockClosedSolid,
  heroUserSolid,
  heroEnvelopeSolid,
} from '@ng-icons/heroicons/solid';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisterUseCase } from '../../../../application/register/register.use-case';
import { ToastService } from '../../../../../../core/services/toast.service';
@Component({
  selector: 'app-home',
  standalone: true,
  providers: [
    provideIcons({
      heroEyeSlashSolid,
      heroEyeSolid,
      heroLockClosedSolid,
      heroUserSolid,
      heroEnvelopeSolid,
    }),
  ],
  imports: [RouterLink, NgIcon, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent implements OnInit {
  registerForm: FormGroup;
  showPassword = false;
  isSubmitted = false;
  isLoading = signal(false);

  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly fb: FormBuilder,
    private readonly registerUseCase: RegisterUseCase,
    private readonly toastService: ToastService,
    private readonly router: Router,
  ) {
    // 🟢 Agregamos confirmPassword y la validación a nivel de grupo
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
      // {
      //   validators: this.passwordMatchValidator,
      // },
    );
  }

  // private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');

  //   if (!password || !confirmPassword) {
  //     return null;
  //   }

  //   if (password.value !== confirmPassword.value) {
  //     confirmPassword.setErrors({ passwordMismatch: true });
  //     return { passwordMismatch: true };
  //   } else {
  //     if (confirmPassword.errors?.['passwordMismatch']) {
  //       delete confirmPassword.errors['passwordMismatch'];
  //       if (!Object.keys(confirmPassword.errors).length) {
  //         confirmPassword.setErrors(null);
  //       }
  //     }
  //     return null;
  //   }
  // }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.value;
    this.isLoading.set(true);
    this.registerUseCase
      .execute({
        firstName,
        lastName,
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.router.navigate(['/']);
        },

        error: (err) => {
          this.toastService.show(
            err.error?.error?.message ?? 'Ocurrió un error al iniciar sesión',
            'error',
          );

          this.isLoading.set(false);
        },
      });
  }

  ngOnInit(): void {
    this.googleAuthService.initializeGoogleSignIn();
  }
}
