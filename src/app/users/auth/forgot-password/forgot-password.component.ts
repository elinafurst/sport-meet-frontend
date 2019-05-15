import { AuthGuardService } from './../../../guards/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private emailForm
  private message = '';
  private sentClicked = false;

  constructor(private formBuilder: FormBuilder, private router: Router,  private authService:AuthserviceService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.emailForm = this.formBuilder.group({
     email:['', [Validators.required]],
    
   });
 }

 onSubmit(){
   let email = this.emailForm.value.email;
   this.sentClicked = true;
   this.message = "Skickar..."
   this.authService.resetPassword(email).subscribe(() => {
      this.message = "Mail har skickats med återställnings instruktioner";
   }, (err) => {       
     this.sentClicked = false;
     if(err.status === 404){
       this.message =  "Email adressen är inte registrerad";
     } else {
        this.message = "Gick inte att skicka";
     }
     console.log(err);
   })
 }
}
