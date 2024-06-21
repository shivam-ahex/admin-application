import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { multiDomainValidator } from '../shared/email.validator';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, ToastrModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
    private toastr: ToastrService
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

  public login(): void {
     //if (this.loginForm.valid) {
    //   this.authenticationService.login(this.loginForm.value).subscribe(() => {
    //     next: (response: HttpResponse<any>) => {
    //       this.toastr.success(response.body.message, 'Success');
    //       if (response.body.user) {
    //         this.userInfo = response.body.user;
    //         alert("Sucess");
    //       }

    //       else {
    //         this.userInfo = null;
    //       }
    //       if (response.headers.get('token')) {
    //         let token = response.headers.get('token') as string;
    //         localStorage.setItem('token', token);
    //       }
    //       else {
    //         localStorage.removeItem('token');
    //       }
    //     }
    //     error: (error: any) => {
    //       if (error.error.message) {
    //         alert("Error");
    //         this.toastr.error(error.error.message, 'Error');
    //       }
    //     }
    //   });
    // }
    // else {
    //   this.toastr.error('Please enter valid email and password', 'Error');
    // }


    const { email, password } = this.loginForm.value;
    this.authenticationService.loginuser(email as string).subscribe({
      next: response => {
        if (response.length > 0 && response[0].password === password) {
          localStorage.setItem('email', email as string)
         this.toastr.success('Login sucessfully','Success');
          
        }else{
          this.toastr.error('Wrong Creditentials','Error');
         
        }
        
        
      },
      error: error => {
        this.toastr.error('Something went wrong!!','Error');
        
      }
    }
    )


    // const { email, password } = this.loginForm.value;
    // this.authenticationService.loginuser(email as string).subscribe({
    //   next: (response: HttpResponse<User[]>) => {
    //     console.log('Response:', response); // Logging the whole response
    //     const users = response.body || [];
    //     console.log('Users:', users); // Logging the users array
    //     if (users.length > 0) {
    //       console.log('User password from response:', users[0].password); // Logging the password from the response
    //       if (users[0].password === password) {
    //         localStorage.setItem('email', email as string);
    //         alert("Success!!");
    //         const token = response.headers.get('token');
    //         if (token) {
    //           localStorage.setItem('token', token as string);
    //         } else {
    //           localStorage.removeItem('token');
    //         }
    //       } else {
    //         alert("Invalid credentials!!");
    //       }
    //     } else {
    //       alert("No user found with the provided email.");
    //     }
    //   },
    //   error: error => {
    //     console.error('Error:', error); // Logging the error
    //     alert("Something went wrong!!");
    //   }
    // });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,multiDomainValidator(['ahex.co.in', 'gmail.com'])]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      keepSignedIn: new FormControl(false)
    });
  }
}
