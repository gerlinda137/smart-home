import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';
import * as DashboardActions from './dashboard.actions';
import { catchError, switchMap, map } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);

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
          map((dashboard) => DashboardActions.createDashboardSuccess({ dashboard })),

          catchError((error) =>
            of(DashboardActions.createDashboardFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
