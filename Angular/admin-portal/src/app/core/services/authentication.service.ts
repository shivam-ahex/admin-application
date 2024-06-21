import { HttpClient, HttpResponse } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { User } from '../Interface/auth';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  constructor(private http: HttpClient) { }

  // public login(data: { email: string, password: string }): Observable<{ email: string, password: string }> {
  //   return this.http.get<{ email: string, password: string }>(`${environment.api_url}/users?email=${data.email}`,);
  // }
  public registerUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${environment.api_url}/users`, user, { observe: 'response' }).pipe(
      tap((response: HttpResponse<User>) => {
        const token = response.headers.get('token');
        if (token) {
          this.setToken(token);
        }
      }),
      catchError(this.handleError)
    );
  }
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));;
  }

  public loginuser(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}/users?email=${email}`);
  }

  
}
