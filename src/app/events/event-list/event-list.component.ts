import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  private events;
  private disableFilter;
  private errorMessage;
  private page: number = 0;
  private totalPages;
  private pageArray;
  private totalElements: any;
  private unitsActive = false;
  private filterActive = false;
  private showUnitButton = true;
  private showFilterButton = true;
  private hasFiltred = false;
  private eventFilter;

  constructor(private eventService: EventService, private router: Router, private authService: AuthserviceService) { }

  ngOnInit() {
    this.initEvents();
    this.resetBooleans();
  }

  initEvents() {
    this.eventService.getEvents(this.page).subscribe((data) => {
      console.log(data);
      this.setEvents(data);
    }, (err) => {
        this.isListEmpty(err);
    });
  }

  private isListEmpty(err: any) {
    if (err.status === 404) {
      this.errorMessage = "Kunde inte hitta några evenemang";
      this.pageArray = new Array();
    }
  }

  resetBooleans(){
    this.unitsActive = false;
    this.filterActive = false;
    this.showUnitButton = true;
    this.showFilterButton = true;
    this.hasFiltred = false;
  }

  resetPage(){
    this.page = 0;
    this.pageState();  
  }



  activateFilter(){
    this.filterActive = true;
  }

  inactiveFilter() {
    this.filterActive = false;
  }

  inactiveUnit() {
    this.unitsActive = false;
  }

  activateUnit() {
    this.unitsActive = true;
  }

  removeFilter() {
    this.filterActive = false;
    this.showFilterButton = true;
    this.hasFiltred = false;
    this.resetPage();
    this.initEvents();
  }

  reset() {
    console.log("RESET");
     this.resetBooleans();

    this.initEvents();
    this.errorMessage = '';
  }


  filterEvents(eventFilter: any){
    console.log(eventFilter);
    this.hasFiltred = true;
    this.eventService.getEventsFilter(eventFilter, this.page).subscribe((data) => {
      console.log(data);
      this.eventFilter = eventFilter;
      this.setEvents(data);
    }, (err) => {
      this.isListEmpty(err);
      this.events = null;
    });
  }

  getEventsForUnitsUserFollows() {
    this.activateUnit();
    this.showFilterButton = false;

    this.eventService.getEventsForUnitsUserFollows().subscribe((data) => {
      this.setEvents(data);
    }, (err) => {
      if(err.status === 404){
        this.isListEmpty(err);
        this.events=null;
      }
    });

  }

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }

  

  pageState() {
    if(this.filterActive){
      this.filterEvents(this.eventFilter);
    } else if(this.unitsActive){
      this.getEventsForUnitsUserFollows();
    } else {
      this.initEvents();
    }
  }

  setPage(i: any) {
    this.page = i;
    this.pageState();
  }
  
  private setEvents(data: any) {
    this.events = data.dtos;

    this.totalPages = data.totalPages;
    var N =  this.totalPages + 1;
    this.pageArray = Array.apply(null, {length: N}).map(Number.call, Number)
    
    this.totalElements = data.totalElements;
  }
}
