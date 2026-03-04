import { createAction, props } from '@ngrx/store';
import { CardItem, CardModel, DashboardData } from '../../../models/types';
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

export const deleteDashboard = createAction(
  '[Dashboard] Delete Dashboard',
  props<{ dashboardId: string }>(),
);

export const deleteDashboardSuccess = createAction(
  '[Dashboard] Delete Dashboard Success',
  props<{ dashboardId: string }>(),
);

export const deleteDashboardFailure = createAction(
  '[Dashboard] Delete Dashboard Failure',
  props<{ error: string }>(),
);

export const saveDashboard = createAction(
  '[Dashboard] Save dashboard',
  props<{ dashboardId: string }>(),
);

export const saveDashboardSuccess = createAction(
  '[Dashboard] Save dashboard success',
  props<{ dashboard: DashboardData }>(),
);

export const saveDashboardFailure = createAction(
  '[Dashboard] Save dashboard failure',
  props<{ error: string }>(),
);

export const addTab = createAction('[Dashboard] Add Tab', props<{ title: string }>());

export const removeTab = createAction('[Dashboard] Remove Tab', props<{ tabId: string }>());

export const editTabTitle = createAction(
  '[Dashboard] Edit tab title',
  props<{ tabId: string; newTitle: string }>(),
);

export const moveTabLeft = createAction('[Dashboard] Move Tab left', props<{ tabId: string }>());

export const moveTabRight = createAction('[Dashboard] Move Tab right', props<{ tabId: string }>());

export const addCard = createAction(
  '[Dashboard] Add cart',
  props<{ tabId: string; card: CardModel }>(),
);

export const removeCard = createAction(
  '[Dashboard] Remove Card',
  props<{ tabId: string; cardId: string }>(),
);

export const editCardContent = createAction(
  '[Dashboard] Edit Card Content',
  props<{
    tabId: string;
    cardId: string;
    title: string;
    items: CardItem[];
  }>(),
);

export const reorderCard = createAction(
  '[Dashboard] Reorder Card',
  props<{ tabId: string; cardId: string; newIndex: number }>(),
);
