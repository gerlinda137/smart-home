import { Routes } from '@angular/router';
import { LoginPage } from './components/pages/login-page/login-page';
import { NotFoundPage } from './components/pages/not-found-page/not-found-page';
import { DashboardPage } from './components/pages/dashboard-page/dashboard-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  { path: 'login', component: LoginPage },
  { path: 'dashboard/:dashboardId', component: DashboardPage, canActivate: [authGuard] },
  { path: '**', component: NotFoundPage },
];
