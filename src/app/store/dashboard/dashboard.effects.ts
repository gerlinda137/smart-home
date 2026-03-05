import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';
import * as DashboardActions from './dashboard.actions';
import { catchError, switchMap, mergeMap, map, tap, withLatestFrom } from 'rxjs';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { selectSelectedDashboard } from './dashboard.selectors';
import { Store } from '@ngrx/store';
import { DeviceService } from '../../services/device-service/device-service';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  private deviceService = inject(DeviceService);
  private store = inject(Store);

  navigateToCreatedDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.createDashboardSuccess),
        tap(({ dashboard }) => {
          void this.router.navigate(['/dashboard', dashboard.id]);
        }),
      ),
    { dispatch: false },
  );

  navigateAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.deleteDashboardSuccess),
        switchMap(() =>
          this.dashboardService.getDashboards().pipe(
            tap((dashboards) => {
              if (dashboards.length > 0) {
                void this.router.navigate(['/dashboard', dashboards[0].id]);
              } else {
                void this.router.navigate(['/']);
              }
            }),
          ),
        ),
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

  saveDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.saveDashboard),
      withLatestFrom(this.store.select(selectSelectedDashboard)),
      switchMap((result) => {
        const action = result[0];
        const dashboard = result[1];

        if (!dashboard) {
          return of(
            DashboardActions.saveDashboardFailure({
              error: 'No dashboard to save',
            }),
          );
        }
        const dashboardId = action.dashboardId;
        const data = { tabs: dashboard.tabs };
        return this.dashboardService.updateDashboard(dashboardId, data).pipe(
          map((updatedDashboard) =>
            DashboardActions.saveDashboardSuccess({ dashboard: updatedDashboard }),
          ),
          catchError((error) =>
            of(DashboardActions.saveDashboardFailure({ error: error.message })),
          ),
        );
      }),
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

  toggleDeviceState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.toggleDeviceState),
      mergeMap((action) => {
        const deviceId = action.deviceId;
        const newState = action.newState;
        return this.deviceService.updateDeviceState(deviceId, newState).pipe(
          map(() =>
            DashboardActions.toggleDeviceStateSuccess({
              deviceId,
              newState,
            }),
          ),
          catchError((error) =>
            of(
              DashboardActions.toggleDeviceStateFailure({
                error: error.message,
              }),
            ),
          ),
        );
      }),
    ),
  );
}
