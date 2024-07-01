import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Interface/auth';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
  ) { }


  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.api_url}/users`, user)
  }
  public setToken(token: string): void {
    localStorage.setItem(token, token);
  }
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public loginuser(data: { email: string, password: string }): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.api_url}/users`, data)
  }

  public forgetPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${environment.api_url}/users`, data);
  }
  // Backend Implementation
  // Receive a request with the user's email.
  // Generate a password reset token.
  // Send an email to the user with a reset link containing the token.
  // Verify the token when the user clicks the link.
  // Allow the user to reset their password.
  public resetPassword(data: {newPassword: string; }): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users`, data)
  }
} 