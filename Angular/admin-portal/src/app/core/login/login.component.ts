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
  userInfo: any
  private oAuthservice = inject(AuthGoogleService);

  constructor(private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private route:Router
  ) { }

  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, multiDomainValidator(['ahex.co.in', 'gmail.com'])]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      keepSignedIn: new FormControl(false)
    });

    this.authenticationService.getData().subscribe(
      data=>{
        this.userInfo=data
      }
    )
    
  }

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
      let loginData = this.loginForm.value;
      let user = this.userInfo.filter((u: any) => u.emailAddress === loginData.email);
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      
      console.log(user.emailAddress,user.password);
      
      if(user[0].emailAddress === loginData.email && user[0].password===loginData.password){
      this.authenticationService.loginuser(this.loginForm.value).subscribe({
        next: (response:any) => {
          if (response) {           
            response.token = 'eyjkkgsdg9g9gg0dgsdg09gsd0g0llljkokfklofifll';
            response.message = 'Successfull login...!';
            localStorage.setItem('token', response.token);
            this.toastr.success(response.message, 'Success');
            this.route.navigate(['/user-verification'])
          }
        },
        error: (error) => {
          this.toastr.error(error, 'Error');
        }
      }
      );
    }
    
  }
  
}
public signInWithGoogle(): void {
  this.oAuthservice.login();
}
}
 
  

