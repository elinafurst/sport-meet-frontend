import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgAnalyzedFile } from '@angular/compiler';

@Injectable()
export default class ServiceUtils {


  static getActiveParams(active: any, page: any): HttpParams {
    return  new HttpParams()
      .set('page', page)
      .set("active", active);
  }


  static getPageParam(page: any): HttpParams {
    return  new HttpParams()
      .set('page', page);
  }

  static get_headersToken(): HttpHeaders {
      return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
  } 

  static getFilterParams(eventFilter: any, page: any): HttpParams {
    let params = new HttpParams()
      .set('page', page)
      .set('type', eventFilter.sport)
      .set('fromDate', eventFilter.fromDate)
      .set('toDate', eventFilter.toDate)
      .set('area', eventFilter.area)
      .set('city', eventFilter.city);
      
    if(this.validatePresent(eventFilter.sport)) {
      params = params.delete('type');
    }
    if(this.validatePresent(eventFilter.fromDate)) {
      params = params.delete('fromDate');
    }
    if(this.validatePresent(eventFilter.toDate)) {    
      params = params.delete('toDate');
    }
    if(this.validatePresent(eventFilter.area)) {  
      params = params.delete('area');
    }
    if(this.validatePresent(eventFilter.city)){
      params = params.delete('city')    
    }
    console.log(params);
    return params;
  }

  static validatePresent(param: any): boolean{
    if(param === null || param == undefined || param == ''){
      return true;
    }
    return false;
  }
  static getKeyValueParamFalse(): any {
    return new HttpParams().set('keyvalue', '0');
  }
  
  static getKeyValueParamTrue(){
    return new HttpParams().set('keyvalue', '1');
  
  }
}