import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private readonly TOKEN_KEY = 'auth_token';
  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    const savedToken = localStorage.getItem(this.TOKEN_KEY);
    return savedToken;
  }

  public clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
