import { environment } from './../../environments/environment';
import { Unit, UnitDetails, UnitForm } from './model/unit';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  readonly baseUrl = environment.baseUrL;
  readonly unitUrl = 'units/';

  constructor(private http: HttpClient) { } 
  
  get_headersToken(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));

  }
  
  createUnit(unit: UnitForm): Observable<any> {
    var url = this.baseUrl + this.unitUrl;
    var _headersToken = this.get_headersToken();
    return this.http.post(url, unit, {headers: _headersToken});
  }

  getUnit(id: any): Observable<UnitDetails> {
    var url = this.baseUrl + this.unitUrl + id;
    var _headersToken = this.get_headersToken();

    return this.http.get<UnitDetails>(url, {headers: _headersToken});
  }

  getUnits(): Observable<Unit> {
    var url = this.baseUrl + this.unitUrl;
    var _headersToken = this.get_headersToken();

    return this.http.get<UnitDetails>(url, {headers: _headersToken});
  }

  getUnitsActiveUserIsAdminOf(): Observable<{[key:number]:string}> {
    var url = this.baseUrl + this.unitUrl + 'admin';
    var _headersToken = this.get_headersToken();

    return this.http.get<{[key:number]:string}>(url, {headers: _headersToken});
  }
 
 
}
