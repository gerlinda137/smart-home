import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardItem } from '../../../models/types';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private http = inject(HttpClient);

  getDevices(): Observable<CardItem[]> {
    return this.http.get<CardItem[]>('/devices');
  }
}
