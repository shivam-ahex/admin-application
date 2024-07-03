import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public getData():Observable<any>{
    return this.http.get<any>(`${environment.api_url}/users`)
  }

  public loginuser(data: { email: string, password: string }): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.api_url}/users`, data)
  }

  public forgetPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${environment.api_url}/users`, data);
  }
 
  public resetPassword(data: {newPassword: string }): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users`, data)
  }

  public resetPhnNumber(data:{phoneNumber: number}): Observable<any>{
    return this.http.post<any>(`${environment.api_url}/users`,data)
  }

  public otpVerify(data:{otp:string}):Observable<any>{
    return this.http.post<any>(`${environment.api_url}/users`,data)
  }

  public userEmailVerify(email:{}):Observable<any>{
    return this.http.post<any>(`${environment.api_url}/users`,email)
  }

  public userSmsVerify(phoneNumber: number):Observable<any>{
    return this.http.post<any>(`${environment.api_url}/users`,phoneNumber)
  }
} 