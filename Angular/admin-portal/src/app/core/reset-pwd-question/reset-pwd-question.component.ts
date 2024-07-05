import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { multiDomainValidator } from '../shared/email.validator';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-pwd-question',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './reset-pwd-question.component.html',
  styleUrl: './reset-pwd-question.component.scss'
})
export class ResetPwdQuestionComponent implements OnInit {
  ResetQuesForm!: FormGroup
  constructor(private formBuilder: FormBuilder,
    private authService:AuthenticationService,
    private toastr:ToastrService,
    private route:Router
  ) { }
  ngOnInit(): void {
    this.ResetQuesForm = this.formBuilder.group({
      emailAddress: ['', [
        Validators.required,
        Validators.email,
        multiDomainValidator(['ahex.co.in', 'gmail.com'])]],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    })
  }
  public onSubmit():void{
    if(this.ResetQuesForm.valid){
      this.authService.restQuesPwd(this.ResetQuesForm.value).subscribe({
        next:(response)=>{
          this.toastr.success(response.message,'Success')
          this.route.navigate(['/reset-password'])
        },
        error:(error:any)=>{
          this.toastr.error(error.message,'Error')
        }
      })
    }
  }
}
