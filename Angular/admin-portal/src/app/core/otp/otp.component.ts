import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterModule,ToastrModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit{

  otpForm!:FormGroup
  constructor(private formBuilder:FormBuilder,
    private authService:AuthenticationService,
    private route:Router,
    private toastr: ToastrService
  ){}
  ngOnInit(): void {
    this.otpForm= this.formBuilder.group({
      otp: ['',[Validators.required]]
    }
    )
  }
  public onSubmit():void {
    this.authService.otpVerify(this.otpForm.value).subscribe({
      next:(response)=>{
        this.toastr.success('OTP verified','Success')
        this.route.navigate(['/reset-password'])
      },
      error:(error)=>{
        this.toastr.error(error,'Error')
      }
    })
    }

}
