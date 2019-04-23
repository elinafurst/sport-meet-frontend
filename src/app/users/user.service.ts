import { UserDetails, User } from './model/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  readonly baseUrl = environment.baseUrL;
  readonly usersUrl = 'users/';

  constructor(private http: HttpClient) { }  
  
  get_headersToken(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
  }
  
  getUser(id: any): Observable<UserDetails> {
    var url = this.baseUrl + this.usersUrl + id;
    var _headersToken = this.get_headersToken();

    return this.http.get<UserDetails>(url, {headers: _headersToken})
  } 
  
  getActiveUser(): Observable<UserDetails> {
    var url = this.baseUrl + this.usersUrl + "active";
    var _headersToken = this.get_headersToken();

    return this.http.get<UserDetails>(url, {headers: _headersToken});
  } 
  
  updateUser(updateUserForm: User): Observable<any> {
    var url = this.baseUrl + this.usersUrl + "active";
    var _headersToken = this.get_headersToken();

    return this.http.put(url, updateUserForm, {headers: _headersToken});
  }
}
