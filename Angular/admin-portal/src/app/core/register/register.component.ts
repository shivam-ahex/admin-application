import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../Interface/auth';
import { CommonModule } from '@angular/common';
import { multiDomainValidator } from '../shared/email.validator';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthGoogleService } from '../services/Socialservices/auth-google.service';
import { PasswordValidator } from '../shared/resetPassword-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, ToastrModule],
  providers: [AuthenticationService, Router],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent implements OnInit {

  SignUpForm!: FormGroup;
  isLoggedin?: boolean = undefined;
  feildTextType?:boolean
  feildTextTypePwd?:boolean
  private oAuthservice = inject(AuthGoogleService);

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
    private formBuilder:FormBuilder
  ) { }
  ngOnInit(): void {
    this.SignUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      company: ['', [Validators.required]],
      emailAddress: ['', [
        Validators.required,
        Validators.email,
        multiDomainValidator(['ahex.co.in', 'gmail.com'])]],
      password: ['',
         [Validators.required, 
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
          this.noScriptingValidator()
         ]],
      reEnterPassword: ['',
        [Validators.required,
         Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
         this.noScriptingValidator()
        ]],
        question:['',[Validators.required]],
        answer:['',[Validators.required]]
    }, { validators:PasswordValidator.passwordMatch });

  }

  // Custom validator to check for scripting codes
 public noScriptingValidator(): Validators {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && /<|>|&|:|;/.test(value)) { // Add any other characters to test against
        return { 'scriptingNotAllowed': true };
      }
      return null;
    };
  }
  toggleFeildTextTypePwd(){
    this.feildTextTypePwd= !this.feildTextTypePwd;
  }
  toggleFeildTextType(){
    this.feildTextType= !this.feildTextType;
  }
  
  public submit(): void {
    this.authService.registerUser(this.SignUpForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem('userResponse', JSON.stringify(response));
        this.router.navigate(['/user-verification']);
        this.toastr.success(response.message, 'Success');
      },
      error: (err) => {
        this.toastr.error(err, 'Error');
      }
    }
    )
  }
  public signInWithGoogle(): void {
    this.oAuthservice.login();
  }

 
}
