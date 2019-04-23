import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from './users/model/user';

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
  
  get_headersToken(): HttpHeaders {
      var access_token = sessionStorage.getItem('access_token');
      return new HttpHeaders().set('Authorization', 'Bearer ' + access_token);
  }

  isAuthenticated(): boolean {
    //console.log("isAuthenticated");
    const token = sessionStorage.getItem('access_token');
    if(token == undefined){
      return false;
    }
  
    const expiresIn = sessionStorage.getItem('expires_in');
    if(expiresIn == undefined){
      return false;
    }
    return !(+expiresIn < new Date().valueOf());

     
    // if token is expired try to get new one
      //TODO make flow more classii
   /*   this.authservice.tryRefreshToken();
      if(this.authservice.isAuthenticated()){
        return true;
      } */
    
    //compare token expiration
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
    console.log(url);
    console.log(sessionStorage.getItem('access_token')) ;
    console.log(this.get_headersToken());
    this.http.post(url, {headers: this.get_headersToken()});
    this.removeTokens();
    this.router.navigate(["/"]);
  }

  tryRefreshToken(){
    console.log("try refresh");
    var url = this.baseUrl + this.tokenUrl;

    const params = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        refresh_token: sessionStorage.getItem('refresh_token')
      }
    });

    this.http.post(url, params, {headers: this._headersAuth}).subscribe((data) => {
        this.setTokens(data);
      },
      (err) =>{
          this.removeTokens();            
          this.router.navigate["/login"];
          //TODO notis
      })
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
