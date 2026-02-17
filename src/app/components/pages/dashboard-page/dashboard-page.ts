// dashboard-page.ts
import { Component, computed, signal, ViewChild, OnInit, inject } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Dashboard } from '../../dashboard/dashboard';
import { Sidebar } from '../../sidebar/sidebar';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard-service/dashboard-service';
import { DashboardData, Tab } from '../../../../models/types';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  imports: [Sidebar, Dashboard, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dashboardService = inject(DashboardService);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isMobile = signal(window.matchMedia('(max-width: 1024px)').matches);
  isOpen = signal(false);
  sidenavMode = computed<'side' | 'over'>(() => (this.isMobile() ? 'over' : 'side'));
  sidenavOpened = computed(() => (this.isMobile() ? this.isOpen() : true));

  dashboard: DashboardData | null = null;
  currentTab: Tab | null = null;
  isLoading = false;
  error: string | null = null;

  private mediaQuery = window.matchMedia('(max-width: 1024px)');

  private onResize = (event: MediaQueryListEvent) => {
    this.isMobile.set(event.matches);
    this.isOpen.set(false);
  };

  ngOnInit() {
    this.isMobile.set(this.mediaQuery.matches);
    this.isOpen.set(false);
    this.mediaQuery.addEventListener('change', this.onResize);

    this.loadDashboard();
  }

  private loadDashboard() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const dashboardId = params.get('dashboardId');
          const tabId = params.get('tabId');

          this.isLoading = true;
          this.error = null;

          if (!dashboardId || !tabId) {
            return this.redirectToFirstDashboard();
          }

          return this.dashboardService.getDashboardById(dashboardId).pipe(
            switchMap((dashboard) => {
              this.dashboard = dashboard;

              const tab = dashboard.tabs.find((t) => t.id === tabId);

              if (!tab) {
                const firstTab = dashboard.tabs[0];
                this.router.navigate(['/dashboard', dashboardId, firstTab.id], {
                  replaceUrl: true,
                });
                return of(null);
              }

              this.currentTab = tab;
              return of(dashboard);
            }),
          );
        }),
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading dashboard:', err);
          this.error = 'Failed to load dashboard';
          this.isLoading = false;
        },
      });
  }

  private redirectToFirstDashboard() {
    return this.dashboardService.getDashboards().pipe(
      switchMap((dashboards) => {
        if (!dashboards.length) {
          this.error =
            'You don’t have any dashboards yet. They’ll appear here as soon as you create them';
          return of(null);
        }

        const firstDashboard = dashboards[0];

        return this.dashboardService.getDashboardById(firstDashboard.id).pipe(
          switchMap((detail) => {
            const firstTab = detail.tabs[0];

            this.router.navigate(['/dashboard', firstDashboard.id, firstTab.id], {
              replaceUrl: true,
            });

            return of(null);
          }),
        );
      }),
    );
  }

  selectTab(tabId: string): void {
    const dashboardId = this.route.snapshot.params['dashboardId'];
    this.router.navigate(['/dashboard', dashboardId, tabId]);
  }

  toggleSideNav() {
    if (!this.isMobile()) return;
    this.isOpen.update((v) => !v);
  }

  closeSidebar() {
    if (!this.isMobile()) return;
    this.isOpen.set(false);
  }
}
