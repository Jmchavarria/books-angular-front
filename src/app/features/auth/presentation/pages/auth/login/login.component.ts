import { Component, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightSolid,
  heroEnvelopeSolid,
  heroEyeSlashSolid,
  heroEyeSolid,
  heroLockClosedSolid,
} from '@ng-icons/heroicons/solid';
import { Router, RouterLink } from '@angular/router';
import { GoogleAuthService } from '../../../../../../core/services/google-auth.service';
import { LoginUseCase } from '../../../../application/login.use-case';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastService } from '../../../../../../core/services/toast.service';
import { ToastContainerComponent } from '../../../../../../core/components/toast-container/toast-container.component';
import { UserAuth } from '../../../../domain/interfaces/user-auth';
import { RoleTypeEnum } from '../../../../../../core/enums/role.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIcon, RouterLink, FormsModule, ReactiveFormsModule, ToastContainerComponent],
  providers: provideIcons({
    heroEnvelopeSolid,
    heroArrowRightSolid,
    heroEyeSlashSolid,
    heroEyeSolid,
    heroLockClosedSolid,
  }),
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isSubmitted = false;
  isLoading = signal(false);

  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly loginUseCase: LoginUseCase,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
    private readonly router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.googleAuthService.initializeGoogleSignIn();
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.isLoading.set(true);

    this.loginUseCase.execute(email, password).subscribe({
      next: (response: UserAuth) => {
        this.isLoading.set(false);
        // se debe verificar que rol tiene para saber a que modulo será redirigido, se debe actualizar el userAuth

        console.log(typeof response.role);
        console.log(typeof RoleTypeEnum.admin);
        if (response.role === RoleTypeEnum.admin) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
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
}
