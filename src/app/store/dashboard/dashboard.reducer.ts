import { createReducer, on } from '@ngrx/store';
import { DashboardState } from './dashboard.state';
import * as DashboardActions from './dashboard.actions';

export const initialState: DashboardState = {
  selectedDashboard: null,
  isEditMode: false,
  originalSnapshot: null,
};

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.loadDashboard, (state) => state),

  on(DashboardActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
  })),

  on(DashboardActions.enterEditMode, (state) => ({
    ...state,
    isEditMode: true,
    originalSnapshot: state.selectedDashboard,
  })),

  on(DashboardActions.exitEditMode, (state) => ({
    ...state,
    isEditMode: false,
    originalSnapshot: null,
  })),
);
