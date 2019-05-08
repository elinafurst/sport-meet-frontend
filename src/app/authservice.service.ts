import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from './users/model/user';
import ServiceUtils from './service-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 

  readonly baseUrl = environment.baseUrL;
  readonly tokenUrl = "oauth/token";
  readonly logoutUrl = "account/signout"; 
  readonly signupUrl = "account/signup";

  private _headersAuth = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Authorization', 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret));

  private _headersJson = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Checks if token has expired without making request to server.
   * If token har expired it will try to get a new token by the refresh token
   */

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('access_token');
    if(token == undefined){
      return false;
    }
  
    const expiresIn = sessionStorage.getItem('expires_in');
    if(expiresIn == undefined){
      return false;
    }

    if(+expiresIn < new Date().valueOf()) {
      if(this.tryRefreshToken()){
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

signUp(user: User): Observable<any> {
  var url = this.baseUrl + this.signupUrl;
  return this.http.post(url, user, {headers: this._headersJson});
}

login(username: string, password: string) {
    var url = this.baseUrl + this.tokenUrl;
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        username: username,
        password: password
      }
    });

    this.http.post(url, params, {headers: this._headersAuth}).subscribe((data) => {
        console.log(data);
        this.router.navigate(["/"]);
        this.setTokens(data);
    },
    (err) =>{
      console.log(err);
    })
  }


 logOut(){
    var url = this.baseUrl + this.logoutUrl;   
    var _headersToken = ServiceUtils.get_headersToken();

    this.http.delete(url, {headers: _headersToken}).subscribe((data) => {
      console.log(data);
    });
    this.removeTokens();
    this.router.navigate(["/"]);
  }

  /**
   * Tries to get new access token through refresh token,  if succeeded user is still logged in, else redirectet to log-in page
   */
  tryRefreshToken(): boolean{
    console.log("try refresh");
    const refresh_token = sessionStorage.getItem('refresh_token');

    if(refresh_token == undefined){
      return false;
    }

    var url = this.baseUrl + this.tokenUrl;

    const params = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        refresh_token: sessionStorage.getItem('refresh_token')
      }
    });

    let success;

    this.http.post(url, params, {headers: this._headersAuth}).subscribe((data) => {
        this.setTokens(data);
        success= true;
      },
      (err) =>{
          this.removeTokens();            
          success= false;
      })
      return success;
  }


  removeTokens(){
    sessionStorage.clear();
  }

  setTokens(data: any){    
    var expiresDateTime = new Date().setUTCSeconds(data.expires_in);

    sessionStorage.setItem('access_token', data.access_token );
    sessionStorage.setItem('refresh_token', data.refresh_token);
    sessionStorage.setItem('expires_in', expiresDateTime.valueOf().toString());
  }
}
