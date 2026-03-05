import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage/token-storage';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);
  const token = tokenStorage.getToken();

  let authReq = req;

  if (!authReq.url.startsWith('http')) {
    authReq = authReq.clone({
      url: `${environment.apiUrl}${req.url}`,
    });
  }

  if (token) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq);
};
