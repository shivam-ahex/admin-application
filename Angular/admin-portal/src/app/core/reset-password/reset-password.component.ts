import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PasswordValidator } from '../shared/resetPassword-validator';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { forbiddenSymbolsValidator } from '../shared/password.validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  ResetForm!: FormGroup;
  feildTextType?:boolean
  feildTextTypePwd?:boolean
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.ResetForm = this.formBuilder.group({
      password: ['', [Validators.required, 
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),this.noScriptingValidator()]],
      reEnterPassword: ['', [Validators.required,this.noScriptingValidator()]]
    }, { validators: PasswordValidator.passwordMatch });
  }
  
  // Custom validator to check for scripting codes
  noScriptingValidator(): Validators {
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
  
  public onSubmit(): void {
    if (this.ResetForm.valid) {
      this.authService.resetPassword(this.ResetForm.value.newPassword).subscribe(
        {
          next: (response) => {
            this.toastr.success(response.message, 'Success');
            this.router.navigate(['/login'])
          },
          error: (error) => {
            //handle the error
            this.toastr.error(error, 'Error');

          },

        }
      )
    }
  }


}
