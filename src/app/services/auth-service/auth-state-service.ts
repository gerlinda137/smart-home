import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  authSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.authSubject;

  public setAuthenticated(isAuth: boolean): void {
    this.authSubject.next(isAuth);
  }

  public getCurrentState(): boolean {
    return this.authSubject.getValue();
  }
}
