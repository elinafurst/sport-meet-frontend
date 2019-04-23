import { Component, OnInit } from '@angular/core';
import { UserDetails, User } from '../model/user';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

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

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.initForm();

    this.editable = false;

    this.userService.getActiveUser().subscribe((data) => {
      console.log(data);
    })
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
      username:[''],
      firstname: [''],
      lastname: [''],
      description:['']
    });
  }

  isEditable(): boolean {
    return this.editable;
  }

  onSubmit(){
    console.log(this.updateUserForm.value);
    this.userForm = new User(this.updateUserForm.value);
    this.userService.updateUser(this.userForm).subscribe(() => {
      console.log("Success");
      this.ngOnInit();
    }, (err) => {
      console.log(err);
    }
    )
    console.log(this.userForm);

  }
}
