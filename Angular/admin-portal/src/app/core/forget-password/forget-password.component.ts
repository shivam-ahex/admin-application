import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { multiDomainValidator } from '../shared/email.validator';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  ForgetForm!: FormGroup


  constructor(
    private authService: AuthenticationService,
    private route: Router,
    private formBuilder: FormBuilder
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
          console.log('Password reset email sent', response);
          this.route.navigate(['/reset-password'])
        },
        error: (error) => {
          console.error('Error sending password reset email', error);
        },
        complete: () => {
          console.log('Password reset request complete');
        }
      }
      )
    }

  }


}
