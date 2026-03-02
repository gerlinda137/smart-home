import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Dashboard, DashboardService } from '../../../services/dashboard-service/dashboard-service';
import { AuthStateService } from '../../../services/auth-service/auth-state-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  dashboards: Dashboard[] = [];
  isLoading = false;
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
    setTimeout(() => {
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
    }, 0);
  }

  selectDashboard(dashboardId: string) {
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
