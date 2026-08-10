import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  showConfirmPassword = false;
  showPassword = false;
  isSubmitted = false;

  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly fb: FormBuilder,
  ) {
    // 🟢 Agregamos confirmPassword y la validación a nivel de grupo
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword.errors?.['passwordMismatch']) {
        delete confirmPassword.errors['passwordMismatch'];
        if (!Object.keys(confirmPassword.errors).length) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Aquí ejecutas la lógica de registro si todo es válido
    console.log('Formulario válido, enviando datos:', this.registerForm.value);
  }

  ngOnInit(): void {
    this.googleAuthService.initializeGoogleSignIn();
  }
}
