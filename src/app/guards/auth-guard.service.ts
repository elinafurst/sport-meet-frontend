import { AuthserviceService } from './../authservice.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authservice: AuthserviceService, private router: Router) { }

  canActivate()  {
    if(this.authservice.isAuthenticated()){
      return true;
    } else {    
      console.log("REDIRECT");
      this.router.navigate(["login"]);
      return false; 
    }

  }
}
