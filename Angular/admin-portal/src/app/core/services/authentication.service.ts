import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Interface/auth';
import { TOAST_CONFIG } from 'ngx-toastr';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  constructor(private http: HttpClient) { }

  // public login(data: { email: string, password: string }): Observable<{ email: string, password: string }> {
  //   return this.http.get<{ email: string, password: string }>(`${environment.api_url}/users?email=${data.email}`,);
  // }

  registerUser(userDetails: User) {
    return this.http.post(`${environment.api_url}/users`, userDetails);
  }
  loginuser(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}/users?email=${email}`);
  }
  public emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        // if control is empty, return no error
        return null;
      }
      const email = control.value;
      const domainPattern = new RegExp(`@${domain}$`);
      const valid = domainPattern.test(email);
      return valid ? null : { emailDomain: { value: control.value, domain } };
    };
  }
}
