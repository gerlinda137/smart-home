import { createAction, props } from '@ngrx/store';
import { DashboardData } from '../../../models/types';

export const loadDashboard = createAction(
  '[Dashboard]Load Dashboard',
  props<{ dashboardsId: string }>(),
);

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ dashboard: DashboardData }>(),
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: string }>,
);

export const enterEditMode = createAction('[Dashboard] Enter Edit Mode');
export const exitEditMode = createAction('[Dashboard] Exit Edit Mode');
