import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-service/auth-state-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  if (authStateService.isAuthenticated$) {
    return true;
  }

  console.log('Access denied.Redirecting to login');
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
