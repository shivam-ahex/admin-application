import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-verification',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.scss'
})
export class UserVerificationComponent implements OnInit{
  userSmSVerifyForm!:FormGroup
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.userSmSVerifyForm=this.formBuilder.group({
    
    })
  }

}
