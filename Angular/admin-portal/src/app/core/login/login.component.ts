import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { multiDomainValidator } from '../shared/email.validator';
import { CommonModule } from '@angular/common';
import { AuthGoogleService } from '../services/Socialservices/auth-google.service';
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { User } from '../Interface/auth';
import { AuthInterceptor } from '../services/auth.interceptor';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, ToastrModule, CommonModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor }],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  private oAuthservice = inject(AuthGoogleService);

  constructor(private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private route:Router
  ) { }

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

  userInfo!: User | null;
  public login(): void {
    if (this.loginForm.valid) {
      this.authenticationService.loginuser(this.loginForm.value).subscribe({
        next: (response:HttpResponse<any>) => {
          console.log(response)
          if (response) {
            localStorage.setItem('token', response.body.token);
            this.toastr.success(response.body.message, 'Success');
          }
        },
        error: (error) => {
          this.toastr.error(error, 'Error');
        }
      }
      );
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, multiDomainValidator(['ahex.co.in', 'gmail.com'])]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      keepSignedIn: new FormControl(false)
    });
  }
  public signInWithGoogle(): void {
    this.oAuthservice.login();
  }
}
