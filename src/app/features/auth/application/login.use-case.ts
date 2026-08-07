import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  constructor(private readonly http: HttpClient) {}

  login(): Observable<any> {
    return this.http.post<any>(environment.apiUrl, { name: 'asdasd' });
  }
}
