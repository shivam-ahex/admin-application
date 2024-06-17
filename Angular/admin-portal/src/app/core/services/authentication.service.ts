import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(data: { email: string, password: string }): Observable<{ email: string, password: string }> {
    return this.http.post<{ email: string, password: string }>(`${environment.api_url}/login`, { data });
  }
}
