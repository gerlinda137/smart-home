import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from '../user-api-service/user-api-service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private authSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<UserProfile | null>(null);

  isAuthenticated$: Observable<boolean> = this.authSubject;
  userProfile$ = this.userSubject.asObservable();

  public setAuthenticated(isAuth: boolean): void {
    console.log('setAuthenticated called:', isAuth);
    this.authSubject.next(isAuth);
  }

  setUserProfile(profile: UserProfile | null): void {
    this.userSubject.next(profile);
  }

  public getCurrentState(): boolean {
    return this.authSubject.getValue();
  }
}
