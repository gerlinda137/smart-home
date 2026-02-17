import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage/token-storage';
import { inject } from '@angular/core';
import { AuthStateService } from '../services/auth-service/auth-state-service';
import { catchError, throwError } from 'rxjs';

export const unauthHandleInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenStorageService);
  const authService = inject(AuthStateService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        tokenService.clearToken();
        authService.setAuthenticated(false);
      }
      return throwError(() => error);
    }),
  );
};
