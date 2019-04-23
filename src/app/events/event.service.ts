import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EventDetails, EventForm, CommentForm } from './model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  readonly baseUrl = environment.baseUrL;
  readonly eventUrl = "events/";
 
  constructor(private http: HttpClient, private router: Router) { }
  
  get_headersToken(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
  }

  createEvent(event: EventForm): Observable<any> {
    var url = this.baseUrl + this.eventUrl;
    var _headersToken = this.get_headersToken();

    return this.http.post(url, event, {headers: _headersToken});
  }

  getEvent(eventNumber: string): Observable<EventDetails> {
    var url = this.baseUrl + this.eventUrl + eventNumber;
    var _headersToken = this.get_headersToken();

    return this.http.get<EventDetails>(url, {headers: _headersToken});
  }

  getEvents(): Observable<Event> {
    var url = this.baseUrl + this.eventUrl;

    var _headersToken = this.get_headersToken();

    const params = new HttpParams({
      fromObject: {
        //TODO filter
      }
    });
    return this.http.get<Event>(url, {headers: _headersToken})
  }


  createComment(eventNumber: any, comment: CommentForm): Observable<any> {
    var url = this.baseUrl + this.eventUrl + eventNumber + "/comments"
    var _headersToken = this.get_headersToken();

    return this.http.post(url, comment, {headers: _headersToken}); 
  }

  getComments(eventNumber: any): Observable<Comment> {
    var url = this.baseUrl + this.eventUrl + eventNumber + "/comments"
    var _headersToken = this.get_headersToken();

    return this.http.get<Comment>(url, {headers: _headersToken});   
  }

 deleteComment(commentNumber: any): Observable<any> {
    var url = this.baseUrl + this.eventUrl  + "comments/"+ commentNumber
    var _headersToken = this.get_headersToken();

    return this.http.delete(url, {headers: _headersToken});
  }

  getSports(): Observable<string[]> {
    var url = this.baseUrl + this.eventUrl + 'sports';
    var _headersToken = this.get_headersToken();

    return this.http.get<string[]>(url, {headers: _headersToken});
  }
}
