import { AuthserviceService } from './authservice.service';
import { Component } from '@angular/core';
import { RequestService } from './events/requests/request.service';
import { interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sportProject-angular';

  isAuthenticated: boolean;
  unreadRequests: number;

  constructor(private authService: AuthserviceService, private requestService: RequestService){
  
  }
  
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
