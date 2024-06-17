import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userInfo: any;

  constructor(private authenticationService: AuthenticationService, private toastr: ToastrService) { }

  SignInOptions: { image: string, name: string }[] = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];
  loginForm!: FormGroup;

  public login(): void {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value).subscribe(() => {
        next: (response: HttpResponse<any>) => {
          this.toastr.success(response.body.message, 'Success');
          if (response.body.user) {
            this.userInfo = response.body.user;
          }
          else {
            this.userInfo = null;
          }
          if (response.headers.get('token')) {
            let token = response.headers.get('token') as string;
            localStorage.setItem('token', token);
          }
          else {
            localStorage.removeItem('token');
          }
        }
        error: (error: any) => {
          if (error.error.message) {
            this.toastr.error(error.error.message, 'Error');
          }
        }
      });
    }
    else {
      this.toastr.error('Please enter valid email and password', 'Error');
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      keepSignedIn: new FormControl(false)
    });
  }
}