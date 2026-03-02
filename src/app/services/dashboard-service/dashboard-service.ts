import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardData } from '../../../models/types';

export interface Dashboard {
  id: string;
  title: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>('/dashboards');
  }

  getDashboardById(id: string): Observable<DashboardData> {
    return this.http.get<DashboardData>(`/dashboards/${id}`);
  }

  createDashboard(dashboard: Dashboard): Observable<Dashboard> {
    return this.http.post<Dashboard>('/dashboards', dashboard);
  }
}
