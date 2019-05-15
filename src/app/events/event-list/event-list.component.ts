import { EventFilter } from './../model/event';
import { FormBuilder, FormControl } from '@angular/forms';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AuthserviceService } from 'src/app/authservice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  private events;
  private disableFilter;
  private errorMessage;
  private filterForm;
  private eventFilter: EventFilter;
  private sports;
  private areas;
  private defaultCity: any = 'Stockholm'
  private advancedSearch:boolean = false;
  private selectedToDate;
  private selectedFromDate
  private error;
  private page: number = 0;
  private totalPages;
  private pageArray;
  private totalElements: any;
  private unitsActive = false;
  private filterActive = false;
  private showUnitButton = true;
  private showFilterButton = true;
  private hasFiltred = false;

  constructor(private eventService: EventService, private router: Router, private authService: AuthserviceService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.initEvents();
    this.resetBooleans();
    moment.locale('sv')

    this.eventService.getSports().subscribe((data) => {
      this.sports = data;
      console.log(this.sports);
    });

    this.eventService.getAreas(this.defaultCity).subscribe((data) => {
      this.areas = data;
      console.log(data);
    }, (err) => {
      console.log(err);
    })
    this.initForm();
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

  clearFilter() {
    console.log("triggerd");
    this.initForm();
  }
  removeFilter() {
    this.filterActive = false;
    this.showFilterButton = true;
    this.hasFiltred = false;
    this.resetPage();
    this.initEvents();
  }

  reset() {
   /* console.log("RESET");
     this.resetBooleans();

    this.initEvents();
    this.errorMessage = '';*/
    this.ngOnInit();
  }

  
  initForm(){
    this.filterForm = this.formBuilder.group({
      sport:[''],
      city:[this.defaultCity],
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      area:['']
  });
  }

  onSelectFromDate(event: any){
    let date = moment(event.value).format("YYYY-MM-DD");
    this.filterForm.controls['fromDate'].setValue(date);
    this.selectedFromDate = date;
  }

  onSelectToDate(event: any) {
    let date = moment(event.value).format("YYYY-MM-DD");
    this.filterForm.controls['toDate'].setValue(date);
    this.selectedToDate = date;
  }

  onSubmit(){
    let from = this.filterForm.value.fromDate;
    let to = this.filterForm.value.toDate;
    
    if(from && to){
      if(from.valueOf() > to.valueOf()){
        this.error = "Ogiltiga datum. Till datumet måste inträffa efter eller samma datum som från datumet"
        return;
      }
    }
    this.error= '';
    console.log(this.filterForm.value.fromDate);
    this.eventFilter = new EventFilter(this.filterForm.value);
    this.filterEvents(this.eventFilter)
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
