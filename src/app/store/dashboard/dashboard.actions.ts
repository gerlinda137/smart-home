import { createAction, props } from '@ngrx/store';
import { DashboardData } from '../../../models/types';
import { Dashboard } from '../../services/dashboard-service/dashboard-service';

export const loadDashboard = createAction(
  '[Dashboard]Load Dashboard',
  props<{ dashboardId: string }>(),
);

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ dashboard: DashboardData }>(),
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: string }>(),
);

export const loadDashboards = createAction('[Dashboard]Load Dashboards');

export const loadDashboardsSuccess = createAction(
  '[Dashboard] Load Dashboards Success',
  props<{ dashboards: Dashboard[] }>(),
);

export const loadDashboardsFailure = createAction(
  '[Dashboard] Load Dashboards Failure',
  props<{ error: string }>(),
);

export const enterEditMode = createAction('[Dashboard] Enter Edit Mode');
export const exitEditMode = createAction('[Dashboard] Exit Edit Mode');

export const createDashboard = createAction(
  '[Dashboard] Create Dashboard',
  props<{ id: string; title: string; icon: string }>(),
);

export const createDashboardSuccess = createAction(
  '[Dashboard] Create Dashboard Success',
  props<{ dashboard: Dashboard }>(),
);

export const createDashboardFailure = createAction(
  '[Dashboard] Create Dashboard Failure',
  props<{ error: string }>(),
);
