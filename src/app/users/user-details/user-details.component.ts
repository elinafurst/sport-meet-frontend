import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private id;
  private user;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log(this.id)
      this.userService.getUser(this.id).subscribe((data) => {
        console.log(data);
        this.user = data;
        console.log(this.user);
      })
    })  
  }

}
