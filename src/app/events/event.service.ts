import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EventDetails, EventForm, CommentForm, EventFilter, EventPage } from './model/event';
import ServiceUtils from '../service-utils';

@Injectable({
  providedIn: 'root'
})
export class EventService {
 
  readonly baseUrl = environment.baseUrL;
  readonly openUrl = "open/";
  readonly eventUrl = "events/";
 
  constructor(private http: HttpClient, private router: Router) { }
  
  createEvent(event: EventForm): Observable<any> {
    var url = this.baseUrl + this.eventUrl;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.post(url, event, {headers: _headersToken});
  }

  updateEvent(eventNumber: string, event: EventForm): any {
    var url = this.baseUrl + this.eventUrl + eventNumber;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.put(url, event, {headers: _headersToken});
  }

  getEvent(eventNumber: string): Observable<EventDetails> {
    var url = this.baseUrl + this.eventUrl + eventNumber;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<EventDetails>(url, {headers: _headersToken});
  }

  getEventToPromise(eventNumber: string): any {
    var url = this.baseUrl + this.eventUrl + eventNumber;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<EventDetails>(url, {headers: _headersToken}).toPromise();
  }

  cancelEventCreator(eventNumber: string): any {
    var url = this.baseUrl + this.eventUrl + eventNumber + "/creator"
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get(url, {headers: _headersToken})
  }

  getEvents(page: any):  Observable<EventPage>{
    var url = this.baseUrl + this.openUrl + this.eventUrl;
    const params = ServiceUtils.getPageParam(page);
   
    return this.http.get<EventPage>(url, {params: params})
  }

  getEventsFilter(eventFilter: EventFilter, page: any):  Observable<EventPage> {
    var url = this.baseUrl + this.openUrl + this.eventUrl;
    var _headersToken = ServiceUtils.get_headersToken();
    console.log(_headersToken);
    const params = ServiceUtils.getFilterParams(eventFilter, page);
  
    return this.http.get<EventPage>(url, {params: params, headers: _headersToken})
   }

   getEventsForUnitsUserFollows(): Observable<EventPage> {
    var url = this.baseUrl + this.eventUrl +"units"
    var _headersToken = ServiceUtils.get_headersToken(); 
    
    return this.http.get<EventPage>(url, {headers: _headersToken})
  
  }
   getEventsCreaterOf(active, page): Observable<EventPage>  {
    var url = this.baseUrl + this.eventUrl + "creator"
    var _headersToken = ServiceUtils.get_headersToken();
    const params = ServiceUtils.getActiveParams(active, page);

    return this.http.get<EventPage>(url, {params: params, headers: _headersToken})
  }

   cancelEvent(id: any): Observable<any> {
    var url = this.baseUrl + this.eventUrl + id + "/requests"
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.put(url, {headers: _headersToken})
  }

  getAreas(defaultCity: any): Observable<any> {
    var url = this.baseUrl + this.eventUrl + "locations/" + defaultCity;
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<Location>(url, {headers: _headersToken})
  }

  createComment(eventNumber: any, comment: CommentForm): Observable<any> {
    var url = this.baseUrl + this.eventUrl + eventNumber + "/comments"
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.post(url, comment, {headers: _headersToken}); 
  }

  getComments(eventNumber: any): Observable<Comment> {
    var url = this.baseUrl + this.eventUrl + eventNumber + "/comments"
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<Comment>(url, {headers: _headersToken});   
  }

 deleteComment(commentNumber: any): Observable<any> {
    var url = this.baseUrl + this.eventUrl  + "comments/"+ commentNumber
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.delete(url, {headers: _headersToken});
  }

  getSports(): Observable<string[]> {
    var url = this.baseUrl + this.eventUrl + 'sports';
    var _headersToken = ServiceUtils.get_headersToken();

    return this.http.get<string[]>(url, {headers: _headersToken});
  }
}
