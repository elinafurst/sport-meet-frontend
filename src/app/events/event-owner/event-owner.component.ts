import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-event-owner',
  templateUrl: './event-owner.component.html',
  styleUrls: ['./event-owner.component.css']
})
export class EventOwnerComponent implements OnInit {
  private events;

  private totalPagesActive: any;
  private totalElementsActive: any;
  private totalPagesInActive: any;
  private totalElementsInActive: any;
  private pageActive = 0;
  private pageInActive = 0;
  private pageArrayActive;
  private pageArrayInActive
  
  private eventsInactive;

  private errorMessagActive;
  private errorMessageInActive;

  constructor(private eventService: EventService, private authService: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.initActiveEvents();
    this.initInActiveEvents();
  }

  initActiveEvents() {
    this.eventService.getEventsCreaterOf(1, this.pageActive).subscribe((data) => {
      console.log(data);
      this.setEventsActive(data)
    }, (err) => {
      this.handleUnauthorized(err);
      this.isListEmptyInActive(err);
    });
  }

  initInActiveEvents() {
    this.eventService.getEventsCreaterOf(0, this.pageInActive).subscribe((data) => {
      console.log(data);
      this.setEventsInActive(data)
    }, (err) => {
      this.handleUnauthorized(err);
      this.isListEmptyActive(err);
    });
  }



  private setEventsActive(data: any) {
    this.events = data.dtos;
    this.totalPagesActive = data.totalPages;
    this.pageArrayActive = this.getPageArray(this.totalPagesActive);

  }

  private setEventsInActive(data: any) {
    this.eventsInactive = data.dtos;
    this.totalPagesInActive = data.totalPages;
    this.pageArrayInActive = this.getPageArray(this.totalPagesInActive);
  }

  setPageInActive([i]){
    this.pageInActive = i;
    this.initInActiveEvents();
  }

  setPageActive([i]){
    this.pageActive = i;
    this.initActiveEvents();
  }

  getPageArray(totalPages: any){
    var N =  totalPages + 1;
    return Array.apply(null, {length: N}).map(Number.call, Number)

  }

  private isListEmptyActive(err: any) {
    if (err.status === 404) {
      this.errorMessagActive = "Kunde inte hitta några evenemang";
      this.pageArrayActive = new Array();
    }
  }

  private isListEmptyInActive(err: any) {
    if (err.status === 404) {
      this.errorMessageInActive = "Kunde inte hitta några evenemang";
      this.pageArrayInActive = new Array();
    }
  }
  
  private handleUnauthorized(err: any) {
    if (err.status === 401) {      
      let success = this.authService.tryRefreshToken();
      if (success) {
        this.ngOnInit();
      } else {
        this.router.navigate(["/logga-in"]);
      }
    }
  }

}
