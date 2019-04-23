import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  error: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username':[''],
      'password':['']
    });
  }

  onSubmit(){

    var username = this.loginForm.value.username;
    var password = this.loginForm.value.password;

    console.log(username, password);
    this.authService.login(username, password);
    this.error = true;
    //TODO error wrong inlog this.error=false;
  }

}
