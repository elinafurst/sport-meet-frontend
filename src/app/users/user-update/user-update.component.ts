import { Component, OnInit } from '@angular/core';
import { UserDetails, User } from '../model/user';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  private user: Observable<UserDetails>
  private userNumber: any;
  private userForm: User;
  private editable: boolean;
  private updateUserForm: any;
  private submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private authService: AuthserviceService) { }

  ngOnInit() {
    this.initForm();

    this.editable = false;

    this.userService.getActiveUser().subscribe((data) => {
    }, (err) => {
      this.handleUnauthorized(err);
    });
    this.user = this.userService.getActiveUser().pipe(
      tap(user => this.updateUserForm.patchValue(user))
    );
  }

  makeEditable(){
    this.editable = true;
    console.log("uppdatera");
  }

  cancelEditable() {
    this.editable = false;
    this.ngOnInit();
  }

  initForm(){
     this.updateUserForm = this.formBuilder.group({
      username:['', [Validators.required]],
      firstname: [''],
      lastname: [''],
      description:['']
    });
  }

  get username(){
    return this.updateUserForm.get('username');
  }

  isEditable(): boolean {
    return this.editable;
  }

  onSubmit(){
    console.log(this.updateUserForm.value);
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }

    this.userForm = new User(this.updateUserForm.value);
    this.userService.updateUser(this.userForm).subscribe(() => {
      console.log("Success");
      this.ngOnInit();
    }, (err) => {
      this.handleUnauthorized(err);
    }
    )
    console.log(this.userForm);

  }
  private handleUnauthorized(err: any) {
    if (err.status === 401) {      
      let success = this.authService.tryRefreshToken();
      if (success) {
        this.ngOnInit();
      } else {
        this.router.navigate(["/logga-in"]);
      }
    }
  }

  deleteAccount(){
    this.authService.deleteAccount();
  }
}
