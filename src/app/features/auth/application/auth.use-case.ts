import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUseCase {
  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable();

  constructor() {}

  setAuthState(state: boolean) {
    this.authState.next(state);
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }
}
