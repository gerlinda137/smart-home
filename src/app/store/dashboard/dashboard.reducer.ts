import { createReducer, on } from '@ngrx/store';
import { DashboardState } from './dashboard.state';
import * as DashboardActions from './dashboard.actions';

export const initialState: DashboardState = {
  selectedDashboard: null,
  isEditMode: false,
  originalSnapshot: null,
  isLoading: false,
  error: null,
};

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DashboardActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    isLoading: false,
    error: null,
  })),

  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
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

  on(DashboardActions.createDashboard, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DashboardActions.createDashboardSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(DashboardActions.createDashboardFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
