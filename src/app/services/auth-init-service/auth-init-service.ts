import { inject, Injectable } from '@angular/core';
import { AuthStateService } from '../auth-service/auth-state-service';
import { TokenStorageService } from '../token-storage/token-storage';
import { UserApiService } from '../user-api-service/user-api-service';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthInitService {
  private authStateService = inject(AuthStateService);
  private tokenStorage = inject(TokenStorageService);
  private userApi = inject(UserApiService);
  private router = inject(Router);

  initialize() {
    const token = this.tokenStorage.getToken();
    if (!token) return of(undefined);

    return this.userApi.getProfile().pipe(
      tap((profile) => {
        this.authStateService.setAuthenticated(true);
        this.authStateService.setUserProfile(profile);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        if (error.status === 401) {
          this.tokenStorage.clearToken();
          this.authStateService.setUserProfile(null);
          this.router.navigate(['/login']);
        }
        return of(undefined);
      }),
    );
  }
}
