import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authTokenInterceptor } from './interceptors/auth-token-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { unauthHandleInterceptor } from './interceptors/unauth-handle-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor, unauthHandleInterceptor])),
  ],
};
