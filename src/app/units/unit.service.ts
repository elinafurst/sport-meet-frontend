import { environment } from './../../environments/environment';
import { Unit, UnitDetails, UnitForm, UnitPage } from './model/unit';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import ServiceUtils from '../service-utils';
import { EventPage } from '../events/model/event';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
 
  readonly baseUrl = environment.baseUrL;
  readonly unitUrl = 'units/';

  constructor(private http: HttpClient) { } 
  
  createUnit(unit: UnitForm): Observable<any> {
    var url = this.baseUrl + this.unitUrl;
    var _headersToken = ServiceUtils.get_headersToken();
    return this.http.post(url, unit, {headers: _headersToken});
  }

  getUnit(id: any): Observable<UnitDetails> {
    var url = this.baseUrl + this.unitUrl + id;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<UnitDetails>(url, {headers: _headersToken});
  }

  getUnits(): Observable<UnitPage> {
    var url = this.baseUrl + this.unitUrl;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<UnitPage>(url, {headers: _headersToken});
  }

  getUnitsAdminOf(): any {
    var url = this.baseUrl + this.unitUrl + "admins"
    var _headersToken = ServiceUtils.get_headersToken();
    const params = ServiceUtils.getKeyValueParamFalse();


    return this.http.get<UnitPage>(url, { params: params, headers: _headersToken});
  }

  getEventsForUnit(id: any): Observable<EventPage> {
    var url = this.baseUrl + this.unitUrl + id +"/events";
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<EventPage>(url, {headers: _headersToken});
  }

  getUnitsAdminOfKeyValue(): Observable<{[key:number]:string}> {
    var url = this.baseUrl + this.unitUrl + 'admins';
    var _headersToken = ServiceUtils.get_headersToken();
    const params = ServiceUtils.getKeyValueParamTrue();


    return this.http.get<{[key:number]:string}>(url, {params: params, headers: _headersToken});
  }

  followUnit(id: any): Observable<any> {
    var url = this.baseUrl + this.unitUrl + id + "/joiner"
    var _headersToken = ServiceUtils.get_headersToken();
    console.log(_headersToken);

    return this.http.get(url, {headers: _headersToken});
  }

  unFollowUnit(id: any): Observable<any> {
    var url = this.baseUrl + this.unitUrl + id + "/joiner"
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.delete(url, {headers: _headersToken});
  }
 
 
}
