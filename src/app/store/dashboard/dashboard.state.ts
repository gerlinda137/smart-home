import { DashboardData } from '../../../models/types';

export interface DashboardState {
  selectedDashboard: DashboardData | null;
  isEditMode: boolean;
  originalSnapshot: DashboardData | null;
}
