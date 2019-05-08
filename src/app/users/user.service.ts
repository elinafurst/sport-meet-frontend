import { UserDetails, User } from './model/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import ServiceUtils from '../service-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  readonly baseUrl = environment.baseUrL;
  readonly usersUrl = 'users/';

  constructor(private http: HttpClient) { }  
  
  
  getUser(id: any): Observable<UserDetails> {
    var url = this.baseUrl + this.usersUrl + id;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<UserDetails>(url, {headers: _headersToken})
  } 
  
  getActiveUser(): Observable<UserDetails> {
    var url = this.baseUrl + this.usersUrl + "active";
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<UserDetails>(url, {headers: _headersToken});
  } 
  
  updateUser(updateUserForm: User): Observable<any> {
    var url = this.baseUrl + this.usersUrl + "active";
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.put(url, updateUserForm, {headers: _headersToken});
  }
}
