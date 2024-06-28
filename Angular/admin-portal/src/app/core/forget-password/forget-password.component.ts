import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { multiDomainValidator } from '../shared/email.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  ForgetForm!: FormGroup

  constructor(){}
  ngOnInit(): void {
    this.ForgetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, multiDomainValidator(['gmail.com', 'ahex.co.in'])])
    })
  }
  public forgetPassword(): void {


  }


}
