import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-verification',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.scss'
})


export class UserVerificationComponent implements OnInit {

  userSmSVerifyForm!: FormGroup
  public user!: any;
  showSmsForm: boolean = true;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private route: Router
  ) { }
  ngOnInit(): void {
    const userData = localStorage.getItem('userResponse');
    if (userData !== null) {
      this.user = JSON.parse(userData);
    }

    this.userSmSVerifyForm = this.formBuilder.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^(?=.*?[0-9]).{10}$')]]
    })
  }
   onInput(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }
  public EmailVerificationUser(): void {

    if (this.user) {
      const email = { email: this.user.emailAddress }
      this.authService.userEmailVerify(email).subscribe({
        next: (response) => {
          console.log(email)
          this.toastr.success(response.message, 'Success');
          this.route.navigate(['/login']);

        },
        error: (error) => {
          this.toastr.error(error, 'Error');
        }
      })
    } else {
      this.toastr.error("Email not found in localStorage", 'Error');
    }

  }

  public onSubmit(): void {
    if (this.userSmSVerifyForm.valid) {
      this.authService.userSmsVerify(this.userSmSVerifyForm.value).subscribe({
        next: (response) => {
          this.toastr.success("OTP Sent to entered mobile number", 'Success');
          this.route.navigate(['/otp-verify'])
        },
        error: (error: any) => {
          this.toastr.error(error, 'Error');
        }
      })

    }
  }
}
