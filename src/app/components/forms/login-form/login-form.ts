import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginApiService } from '../../../services/login-api-service/login-api-service';
import { finalize } from 'rxjs';
import { TokenStorageService } from '../../../services/token-storage/token-storage';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm implements OnInit {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  loginApiService = inject(LoginApiService);
  tokenStorage = inject(TokenStorageService);
  router = inject(Router);
  errorMessage: string | null = null;
  isLoading = false;

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;
    this.isLoading = true;
    this.errorMessage = null;

    const { userName, password } = this.loginForm.value;
    const creds = { userName: userName!, password: password! };

    this.loginApiService
      .login(creds)
      .pipe(
        finalize(() => {
          console.log('finalize called');
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (response) => {
          this.tokenStorage.saveToken(response.token);
          this.router.navigate(['']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Invalid login or password.';
            this.cdr.markForCheck();
          } else {
            this.errorMessage = error;
            this.cdr.markForCheck();
          }
        },
      });
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }
}
