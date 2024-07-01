import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Interface/auth';
import { CommonModule } from '@angular/common';
import { multiDomainValidator } from '../shared/email.validator';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthGoogleService } from '../services/Socialservices/auth-google.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule,ToastrModule ],
  providers: [AuthenticationService,Router ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent implements OnInit {

  SignUpForm!: FormGroup;
  isLoggedin?: boolean = undefined;
  private oAuthservice= inject(AuthGoogleService);

  SignUpOptions: { image: string, name: string }[] = [
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
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.SignUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      company: new FormControl('', [Validators.required]),
      emailAddress:  new FormControl('', [
        Validators.required,
        Validators.email,
        multiDomainValidator(['ahex.co.in', 'gmail.com'])]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    });
    
  }
  public submit():void {
    this.authService.registerUser(this.SignUpForm.value).subscribe({
      next: (response)=> {
        localStorage.setItem('token',response.token)
        this.router.navigate(['/login']);
        this.toastr.success('Register sucessfully','Success');
      },
      error: () => {
        this.toastr.error('Something went wrong!!','Error');
      }
    }
    )
  }
  public signInWithGoogle():void{
    this.oAuthservice.login();
  }

  // Sign in with fb
  // public signInWithFb(): void{
    
  //   this.ssoauthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  // refreshToken(): void {
  //   this.ssoauthService.refreshAuthToken(FacebookLoginProvider.PROVIDER_ID);
  // }

 
}
