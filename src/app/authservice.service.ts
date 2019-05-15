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
  readonly accountUrl = "account"
  readonly tokenUrl = "oauth/token";
  readonly logoutUrl = "account/signout"; 
  readonly signupUrl = "account/signup";
  readonly resetUrl = "account/password/reset";
  readonly updateUrl = "account/password/update";
  readonly passwordSaveUrl ="account/password/save";
  private _headersAuth = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Authorization', 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret));

  private _headersJson = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Checks if token has expired without making request to server.
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

    return +expiresIn < new Date().valueOf();
  }

signUp(user: User): Observable<any> {
  var url = this.baseUrl + this.signupUrl;
  return this.http.post(url, user, {headers: this._headersJson});
}

login(username: string, password: string): boolean {
    var url = this.baseUrl + this.tokenUrl;
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        username: username,
        password: password
      }
    });

    let error;

    this.http.post(url, params, {headers: this._headersAuth}).subscribe((data) => {
        console.log(data);
        this.router.navigate(["/"]);
        this.setTokens(data);
        error = false;
    },
    (err) =>{
      console.log(err);
      error = true;
    })
    return error;
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
   * 
   * EDIT: removed since storing token in localstorage
   */
  tryRefreshToken(): boolean{
/** 
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
      */
     this.removeTokens();            
     return false;
  }

  resetPassword(email: any): Observable<any> {
    var url = this.baseUrl + this.resetUrl;

    return this.http.post(url, email);
  }

  checkPasswordUpdateToken(id: any): Observable<any> {
    var url = this.baseUrl + this.updateUrl;
    const params = new HttpParams({
      fromObject: {
        token: id,
      }
    });

    return this.http.get(url, {params: params});
  }

  saveNewPassword(password: any, id:any): Observable<any> {
    var url = this.baseUrl + this.passwordSaveUrl;
    const params = new HttpParams({
      fromObject: {
        token: id,
        password: password
      }
    });

    return this.http.get(url, {params: params});

  }

  deleteAccount(){
    var url = this.baseUrl + this.accountUrl;
    var _headersToken = ServiceUtils.get_headersToken();

    this.http.delete(url, {headers: _headersToken});
    this.removeTokens();
    this.router.navigate(["/home"]);
  }
 
  removeTokens(){
    sessionStorage.clear();
  }

  /**
   * Sets access token and calculates expires in
   */

  setTokens(data: any){    
    var expiresDateTime = new Date().setUTCSeconds(data.expires_in);

    sessionStorage.setItem('access_token', data.access_token );
    sessionStorage.setItem('expires_in', expiresDateTime.valueOf().toString());
    //sessionStorage.setItem('refresh_token', data.refresh_token);
  }
}
