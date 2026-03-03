import { Component, computed, signal, ViewChild, OnInit, inject } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Dashboard } from '../../dashboard/dashboard';
import { Sidebar } from '../../sidebar/sidebar';
import { ActivatedRoute, Router } from '@angular/router';
import * as DashboardActions from '../../../store/dashboard/dashboard.actions';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectIsEditMode,
  selectIsLoading,
  selectSelectedDashboard,
} from '../../../store/dashboard/dashboard.selectors';

@Component({
  selector: 'app-dashboard-page',
  imports: [Sidebar, Dashboard, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isMobile = signal(window.matchMedia('(max-width: 1024px)').matches);
  isOpen = signal(false);
  sidenavMode = computed<'side' | 'over'>(() => (this.isMobile() ? 'over' : 'side'));
  sidenavOpened = computed(() => (this.isMobile() ? this.isOpen() : true));

  dashboard$ = this.store.selectSignal(selectSelectedDashboard);
  isLoading$ = this.store.selectSignal(selectIsLoading);
  error$ = this.store.selectSignal(selectError);
  isEditMode$ = this.store.selectSignal(selectIsEditMode);

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
    this.route.paramMap.subscribe((params) => {
      const dashboardId = params.get('dashboardId');

      if (dashboardId) {
        this.store.dispatch(DashboardActions.loadDashboard({ dashboardId }));
      }
    });
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

  enterEditMode() {
    this.store.dispatch(DashboardActions.enterEditMode());
  }

  exitEditMode() {
    this.store.dispatch(DashboardActions.exitEditMode());
  }

  deleteDashboard() {
    const dashboardId = this.route.snapshot.params['dashboardId'];
    this.store.dispatch(DashboardActions.deleteDashboard({ dashboardId }));
  }

  saveDashboard() {
    const dashboardId = this.route.snapshot.params['dashboardId'];
    this.store.dispatch(DashboardActions.saveDashboard({ dashboardId }));
  }
}
