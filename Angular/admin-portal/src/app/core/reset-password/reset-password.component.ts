import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PasswordValidator } from '../shared/resetPassword-validator';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  ResetForm!: FormGroup;
  token!: string | null;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.ResetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      reEnterPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    }, { validators: PasswordValidator.passwordMatch });


  }
  public onSubmit(): void {
    if (this.ResetForm.valid) {
      this.authService.resetPassword(this.ResetForm.value.newPassword).subscribe(
        {

          next: (response) => {
            this.toastr.success('Reset Sucessfully sucessfully', 'Success');
            this.router.navigate(['/login'])
          },
          error: (error) => {
            //handle the error
            console.log(error)

          },

        }
      )
    }
  }


}
