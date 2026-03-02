import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';
import * as DashboardActions from './dashboard.actions';
import { catchError, switchMap, map, tap } from 'rxjs';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  navigateToCreatedDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.createDashboardSuccess),
        tap(({ dashboard }) => {
          void this.router.navigate(['/dashboard', dashboard.id, 'main']);
        }),
      ),
    { dispatch: false },
  );

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      switchMap(({ dashboardId }) =>
        this.dashboardService.getDashboardById(dashboardId).pipe(
          map((dashboard) => DashboardActions.loadDashboardSuccess({ dashboard })),

          catchError((error) =>
            of(DashboardActions.loadDashboardFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  loadDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboards),
      switchMap(() =>
        this.dashboardService.getDashboards().pipe(
          map((dashboards) => DashboardActions.loadDashboardsSuccess({ dashboards })),

          catchError((error) =>
            of(DashboardActions.loadDashboardsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.createDashboard),
      switchMap(({ id, title, icon }) =>
        this.dashboardService.createDashboard({ id, title, icon }).pipe(
          switchMap((dashboard) =>
            of(
              DashboardActions.createDashboardSuccess({ dashboard }),
              DashboardActions.loadDashboards(),
            ),
          ),

          catchError((error) =>
            of(DashboardActions.createDashboardFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  deleteDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.deleteDashboard),
      switchMap(({ dashboardId }) =>
        this.dashboardService.deleteDashboard(dashboardId).pipe(
          switchMap(() =>
            of(
              DashboardActions.deleteDashboardSuccess({ dashboardId }),
              DashboardActions.loadDashboards(),
            ),
          ),
          catchError((error) =>
            of(DashboardActions.deleteDashboardFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
