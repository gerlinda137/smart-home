import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

export interface LoginCreds {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserProfile {
  fullName: string;
  initials: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  private http = inject(HttpClient);

  login(loginCreds: LoginCreds): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/user/login', loginCreds).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/api/user/profile').pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      }),
    );
  }
}
