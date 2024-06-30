import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { User } from '../Interface/auth';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler';
import { Value } from '@angular/fire/compat/remote-config';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private toastr: ToastrService
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

  // public loginuser(credentials: {email:'string',token:'string'}): Observable<HttpResponse<any>> {
  //   return this.http.get<any>(`${environment.api_url}?emailAddress=${credentials.email}/users`)
  // }

  // public loginuser(email: string): Observable<HttpResponse<User> | undefined> {

  //   return this.http.get<User>(`${environment.api_url}/users`, { observe: 'response' }).pipe(
  //     map(response => {
  //       console.log('Response body:', response.body); // Log the response body
  //       const user = response.body?.find(user => {
  //         console.log('Checking user:', user); // Log each user being checked
  //         return user.emailAddress === email && user.token === "eyopgtcxxvb_gfgsfgfgdgvbbbbxgxfgsdfgfrgsfgsfertertrtdvxbcvhcvbcvbnbnbncvvbxfg";
  //       });
  //       return user;
  //     })
  //   )
      
  // }

  public loginuser(email:string): Observable<HttpResponse<User>> {
    const params = new HttpParams().set('email', email);
    return this.http.get<User>(`${environment.api_url}/users`,{ params, observe: 'response' })
   
  }
}
