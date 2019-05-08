import { AuthserviceService } from './../authservice.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authservice: AuthserviceService, private router: Router) { }

  /**
   * Get called by app-routing.module.ts check if is user is Autenticated, CanActiveted in routes needs log in
   */
  canActivate()  {
    if(this.authservice.isAuthenticated()){
      return true;
    } else {    
      console.log("REDIRECT");
      this.router.navigate(["/logga-in"]);
      return false; 
    }

  }
}
