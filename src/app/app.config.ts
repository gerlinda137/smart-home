import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authTokenInterceptor } from './interceptors/auth-token-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { unauthHandleInterceptor } from './interceptors/unauth-handle-interceptor';
import { AuthInitService } from './services/auth-init-service/auth-init-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor, unauthHandleInterceptor])),
    provideAppInitializer(() => {
      const authInit = inject(AuthInitService);
      return authInit.initialize();
    }),
  ],
};
