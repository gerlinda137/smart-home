import { Component, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Dashboard, DashboardService } from '../../../services/dashboard-service/dashboard-service';
import { AuthStateService } from '../../../services/auth-service/auth-state-service';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Actions, ofType } from '@ngrx/effects';
import * as DashboardActions from '../../../store/dashboard/dashboard.actions';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  private dashboardService = inject(DashboardService);
  private authStateService = inject(AuthStateService);
  private router = inject(Router);
  private actions$ = inject(Actions);


  dashboards: Dashboard[] = [];
  isLoading = signal(false);
  error: string | null = null;

  constructor() {
    this.authStateService.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth) {
        this.loadDashboards();
      } else {
        this.dashboards = [];
      }
    });

    this.actions$
      .pipe(
        ofType(DashboardActions.createDashboardSuccess, DashboardActions.deleteDashboardSuccess),
      )
      .subscribe(() => {
        setTimeout(() => {
          this.loadDashboards();
        }, 0);
      });
  }

  isActiveDashboard(dashboardId: string): boolean {
    return this.router.url.includes(`/dashboard/${dashboardId}`);
  }

  loadDashboards() {
    this.isLoading.set(true);
    this.error = null;

    this.dashboardService.getDashboards().subscribe({
      next: (dashboards) => {
        this.dashboards = dashboards;
        this.isLoading.set(false);
      },
      error: () => {
        this.error = 'Error in loading dashboards';
        this.isLoading.set(false);
      },
    });
  }

  selectDashboard(dashboardId: string) {
    this.router.navigate(['/dashboard', dashboardId]);
  }

  trackById(index: number, dashboard: Dashboard): string {
    return dashboard.id;
  }
}
