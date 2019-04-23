import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private authService: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username:[''],
      password:[''],
      email:[''],
      firstname: [''],
      lastname: [''],
      description:['']
    });
  }

  onSubmit(){
    this.user = new User(this.signUpForm.value);
    console.log(this.user);
    this.authService.signUp(this.user).subscribe(() => {
      console.log("sucess")
      this.router.navigate["/"];
    },(err) =>{
      console.log(err);
    })
  }
}
