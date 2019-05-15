import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: any;
  user: User;
  private submitted = false;
 private samePassword: true;

  constructor(private formBuilder: FormBuilder, private authService: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      firstname: [''],
      lastname: [''],
      description:['']
    });
  }


  get f(){
    return this.signUpForm.controls;
  }

  onSubmit(){
    this.user = new User(this.signUpForm.value);
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    console.log(this.user);
    this.authService.signUp(this.user).subscribe(() => {
      console.log("sucess");
      this.router.navigate(["/logga-in"]);
    },(err) =>{
      this.handleBadRequest(err)
    })
  }

errorMessages
handleBadRequest(err){
  console.log(err);
  if(err.status ==400) {
    console.log(err.error.details);
    console.log(err.error.message);
    this.errorMessages = err.error.details;
  }
}
}
