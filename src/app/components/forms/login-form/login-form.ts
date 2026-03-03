import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserApiService } from '../../../services/user-api-service/user-api-service';
import { finalize } from 'rxjs';
import { TokenStorageService } from '../../../services/token-storage/token-storage';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../../services/auth-service/auth-state-service';
import { DashboardService } from '../../../services/dashboard-service/dashboard-service';

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
  private loginApiService = inject(UserApiService);
  private tokenStorage = inject(TokenStorageService);
  private authState = inject(AuthStateService);
  private router = inject(Router);
  private dashboardService = inject(DashboardService);
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
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (response) => {
          this.tokenStorage.saveToken(response.token);
          this.authState.setAuthenticated(true);

          this.dashboardService.getDashboards().subscribe((dashboards) => {
            if (dashboards.length > 0) {
              const firstDashboard = dashboards[0];
              this.dashboardService.getDashboardById(firstDashboard.id).subscribe((detail) => {
                const firstTab = detail.tabs[0];
                this.router.navigate(['/dashboard', firstDashboard.id, firstTab.id]);
              });
            }
          });
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Invalid login or password.';
            this.cdr.markForCheck();
          } else {
            this.errorMessage = error.message;
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
