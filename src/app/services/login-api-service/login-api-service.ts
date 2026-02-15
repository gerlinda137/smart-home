import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginCreds {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface UserProfile {
  fullName: string;
  initials: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private http = inject(HttpClient);

  public login(loginCreds: LoginCreds): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/user/login', loginCreds);
  }

  public getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('api/user/profile');
  }
}
