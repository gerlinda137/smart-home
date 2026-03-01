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
}
