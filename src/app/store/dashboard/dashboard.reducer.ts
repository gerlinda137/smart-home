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

  on(DashboardActions.exitEditMode, (state) => {
    if (state.originalSnapshot) {
      return {
        ...state,
        selectedDashboard: state.originalSnapshot,
        isEditMode: false,
        originalSnapshot: null,
      };
    }
    return {
      ...state,
      isEditMode: false,
      originalSnapshot: null,
    };
  }),

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

  on(DashboardActions.addTab, (state, { title }) => {
    if (!state.selectedDashboard) return state;
    const id = title.toLowerCase().replace(/\s+/g, '-');

    const newTab = {
      id,
      title,
      cards: [],
    };

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: [...state.selectedDashboard.tabs, newTab],
      },
    };
  }),

  on(DashboardActions.removeTab, (state, { tabId }) => {
    if (!state.selectedDashboard) return state;
    const updateTabs = state.selectedDashboard.tabs.filter((tab) => tab.id !== tabId);

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: updateTabs,
      },
    };
  }),

  on(DashboardActions.editTabTitle, (state, { tabId, newTitle }) => {
    if (!state.selectedDashboard) return state;
    const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
      if (tab.id === tabId) {
        return {
          ...tab,
          title: newTitle,
        };
      } else {
        return tab;
      }
    });

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: updatedTabs,
      },
    };
  }),

  on(DashboardActions.saveDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    isEditMode: false,
    originalSnapshot: null,
  })),

  on(DashboardActions.saveDashboardFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
