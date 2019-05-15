import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  private id;
  private passwordForm;
  private showPasswordForm = true;
  private errorMessage =  "";
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthserviceService) { }

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log(this.id);
      this.authService.checkPasswordUpdateToken(this.id).subscribe(() => {
          console.log("ok to update");
      },(err) => {
        this.showPasswordForm = false;
        this.errorMessage = "Går inte att updatera lösenord, försök skicka ny återställnings länk";
      })
    })  
  }

  
  initForm(){
    this.passwordForm = this.formBuilder.group({
     password:[''],
    
   });
 }

 onSubmit(){
   let password = this.passwordForm.value.password; 

   this.authService.saveNewPassword(password, this.id).subscribe(() => {
     console.log("success");
      this.router.navigate(["/logga-in"]);
   }, (err) => {
    this.showPasswordForm = false;
      this.errorMessage = "Går inte att updatera lösenord, försök skicka ny återställnings länk";
     console.log(err);
   })
 }
}

