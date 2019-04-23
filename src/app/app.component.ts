import { AuthserviceService } from './authservice.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sportProject-angular';

  isAuthenticated: boolean;

  constructor(private authService: AuthserviceService){}
  
  ngOnInit() {
    this.isLoggedIn();
  }

  logOut(){
    this.authService.logOut();
  }

  isLoggedIn(){
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log(this.isAuthenticated);
    return this.isAuthenticated;
  }
}
