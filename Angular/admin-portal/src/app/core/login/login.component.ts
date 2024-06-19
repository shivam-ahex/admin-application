import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, ToastrModule, CommonModule, ToastModule, MessageModule],
  // providers: [
  //   {provide: ToastrService, useClass: ToastrService}
  // ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent implements OnInit {
  userInfo: any;
  private toastr: any;
  constructor(private authenticationService: AuthenticationService,
    private messageService: MessageService
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
    this.authenticationService.loginuser(email as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          localStorage.setItem('email', email as string)
          alert("Sucess!!")
        } else {
          alert("Wrong Password!!")
        }
      },
      error => {
        alert("Something went wrong!!")
      }
    )

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      keepSignedIn: new FormControl(false)
    });
  }
}
