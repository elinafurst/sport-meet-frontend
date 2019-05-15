import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ServiceUtils from 'src/app/service-utils';
import { RequestForm, MessageForm, RequestDetails } from '../model/event';
import { Request } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
 
  readonly baseUrl = environment.baseUrL;
  readonly eventUrl = "events/"
  readonly requestUrl = "requests/"

  constructor(private http: HttpClient) { }
  
  
  sendEventRequest(requestForm: RequestForm): Observable<any> {
    var url = this.baseUrl + this.requestUrl + this.eventUrl + requestForm.eventNumber;
    console.log(url);
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.post(url, requestForm, {headers: _headersToken});
  } 

  getRequest(id: any): Observable<RequestDetails> {
    var url = this.baseUrl + this.requestUrl + id;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<RequestDetails>(url, {headers: _headersToken});

  }

  getRequests(): Observable<Request> {
    var url = this.baseUrl + this.requestUrl;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<Request>(url, {headers: _headersToken});

  }
 

  sendMessageForRequest(id: any, messageForm: MessageForm): Observable<any> {
    var url = this.baseUrl + this.requestUrl + id + "/messages";
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.put(url, messageForm, {headers: _headersToken});
  }

  answerRequest(id: any, isApproved: boolean): Observable<any> {
    var url = this.baseUrl + this.requestUrl + id;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.put(url, isApproved, {headers: _headersToken});
  }

  
  cancelRequest(id: any): Observable<any> {
    var url = this.baseUrl + this.eventUrl + id + "/" + this.requestUrl;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.delete(url,  {headers: _headersToken});
  }

  readRequest(id: any): Observable<any> {
    var url = this.baseUrl + this.requestUrl + "reader";
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.put(url, {headers: _headersToken});
  }

  pollUnreadRequest(): Observable<any> {
    var url = this.baseUrl + this.requestUrl + "poll";
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get(url, {headers: _headersToken});
  }
}
