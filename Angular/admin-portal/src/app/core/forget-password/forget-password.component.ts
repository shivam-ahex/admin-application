import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { multiDomainValidator } from '../shared/email.validator';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, ToastrModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  ForgetForm!: FormGroup


  constructor(
    private authService: AuthenticationService,
    private route: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.ForgetForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        multiDomainValidator(['ahex.co.in', 'gmail.com'])]),
    })
  }
  public onSubmit(): void {

    if (this.ForgetForm.valid) {
      this.authService.forgetPassword(this.ForgetForm.value).subscribe({
        next: (response) => {
          this.toastr.success(response.message, 'Success')
          this.route.navigate(['/reset-password'])
        },
        error: (error) => {
          this.toastr.error(error, 'Error')
        }
      }
      )
    }

  }


}
