import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from 'primeng/api';
import { User } from '../Interface/auth';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

import { coInDomainValidator } from '../shared/co-in-email.validator';
import { emailDomainValidator,  } from '../shared/email.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, MessageModule, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent implements OnInit {

  SignUpOptions: { image: string, name: string }[] = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  
  SignUpForm!: FormGroup;
  ngOnInit(): void {
    this.SignUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      company: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email,emailDomainValidator('gmail.com'),coInDomainValidator()]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    });
  }
  public submit():void {
    const postData = { ...this.SignUpForm.value };
    delete postData.company;
    this.authService.registerUser(postData as User).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully' });
        this.router.navigate(['/login']);

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    )
  }
}
