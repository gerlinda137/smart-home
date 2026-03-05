import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectSelectedDashboard = createSelector(
  selectDashboardState,
  (state) => state.selectedDashboard,
);

export const selectIsEditMode = createSelector(selectDashboardState, (state) => state.isEditMode);

export const selectOriginalSnapshot = createSelector(
  selectDashboardState,
  (state) => state.originalSnapshot,
);

export const selectIsLoading = createSelector(selectDashboardState, (state) => state.isLoading);

export const selectError = createSelector(selectDashboardState, (state) => state.error);
