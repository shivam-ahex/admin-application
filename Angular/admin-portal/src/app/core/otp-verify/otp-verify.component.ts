import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-otp-verify',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './otp-verify.component.html',
  styleUrl: './otp-verify.component.scss'
})
export class OtpVerifyComponent implements OnInit {
  otpVerifyForm!:FormGroup
  constructor(private formBuilder:FormBuilder,
    private authService:AuthenticationService,
    private route:Router,
    private toastr: ToastrService){}
  ngOnInit(): void {
    this.otpVerifyForm= this.formBuilder.group({
      otp: ['',[Validators.required]]
    }
    )
  }
  public onSubmit():void{
    if(this.otpVerifyForm.valid){
      this.authService.otpVerify(this.otpVerifyForm.value).subscribe({
        next:(response)=>{
          this.toastr.success(response.message,'Success')
          this.route.navigate(['/login'])
        },
        error:(error)=>{
          this.toastr.error(error,'Error')
        }
      })
      }
  
    }
  }


