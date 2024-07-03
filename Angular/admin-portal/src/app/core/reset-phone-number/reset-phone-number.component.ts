import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-phone-number',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,FormsModule,CommonModule,ToastrModule],
  templateUrl: './reset-phone-number.component.html',
  styleUrl: './reset-phone-number.component.scss'
})
export class ResetPhoneNumberComponent implements OnInit{
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: Router,
    private toastr: ToastrService
  ){}
  phoneNumberForm!: FormGroup
  ngOnInit(): void {
    this.phoneNumberForm=this.formBuilder.group({
      phoneNumber:['',[
        Validators.required,
        Validators.pattern('^(?=.*?[0-9]).{10}$')]]
    })
  }
  public onSubmit():void{
    this.authService.resetPhnNumber(this.phoneNumberForm.value).subscribe(
      {
        next:(response)=>{
          //handle the Sucess response
          this.toastr.success(response.message,'Success')
          this.route.navigate(['/otp'])
        },
        error:(error)=>{
          this.toastr.error(error,'Error')
        }
      }
    )
  }


}
