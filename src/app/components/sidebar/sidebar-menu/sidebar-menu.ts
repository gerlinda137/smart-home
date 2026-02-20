import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Dashboard, DashboardService } from '../../../services/dashboard-service/dashboard-service';
import { AuthStateService } from '../../../services/auth-service/auth-state-service';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  dashboardService = inject(DashboardService);
  authStateService = inject(AuthStateService);
  router = inject(Router);

  dashboards: Dashboard[] = [];
  isLoading = false;
  error: string | null = null;
  activeDashboardId: string | null = null;

  constructor() {
    this.authStateService.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth) {
        this.loadDashboards();
      } else {
        this.dashboards = [];
      }
    });
  }

  loadDashboards() {
    this.isLoading = true;
    this.error = null;

    this.dashboardService.getDashboards().subscribe({
      next: (dashboards) => {
        this.dashboards = dashboards;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error in loading dashboards';
        this.isLoading = false;
      },
    });
  }

  selectDashboard(dashboardId: string) {
    this.activeDashboardId = dashboardId;
    this.dashboardService.getDashboardById(dashboardId).subscribe({
      next: (dashboard) => {
        const firstTab = dashboard.tabs[0];
        this.router.navigate(['/dashboard', dashboardId, firstTab.id]);
      },
      error: () => {
        console.log('Failed to load dashboard');
      },
    });
  }

  trackById(index: number, dashboard: Dashboard): string {
    return dashboard.id;
  }
}
