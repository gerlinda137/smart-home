import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authTokenInterceptor } from './interceptors/auth-token-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { unauthHandleInterceptor } from './interceptors/unauth-handle-interceptor';
import { AuthInitService } from './services/auth-init-service/auth-init-service';
import { dashboardReducer } from './store/dashboard/dashboard.reducer';
import { DashboardEffects } from './store/dashboard/dashboard.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor, unauthHandleInterceptor])),
    provideStore({ dashboard: dashboardReducer }),
    provideEffects([DashboardEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    provideAppInitializer(() => {
      const authInit = inject(AuthInitService);
      return authInit.initialize();
    }),
  ],
};
