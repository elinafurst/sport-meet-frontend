import { FormBuilder, FormControl } from '@angular/forms';
import { EventService } from './../event.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { EventFilter } from '../model/event';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent implements OnInit {

  private filterForm;
  private eventFilter: EventFilter;
  private sports;
  private areas;
  private defaultCity: any = 'Stockholm'
  private advancedSearch:boolean = false;
  private selectedToDate;
  private selectedFromDate
  private error;


  constructor(private formBuilder: FormBuilder, private eventService: EventService) { }

  ngOnInit() {
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

  hideAdvancedSearch(){
    this.advancedSearch = false;
    this.goBack();
  }

  showAdvancedSearch() {
    this.advancedSearch = true;
  }

  clearFilter(){
    this.ngOnInit();
    this.selectedToDate = '';
    this.selectedFromDate = '';
    this.selectedFromDate ='';

    this.childEvent.emit(this.eventFilter);
  }

  isAdvancedSearch(): boolean{ 
    return this.advancedSearch;
  }

  @Output()
  childEvent2 = new EventEmitter();
  goBack(){
    console.log("triggered")
    this.childEvent2.emit();
  }

  @Output() 
  childEvent = new EventEmitter();
  onSubmit(){
    let from = this.filterForm.value.fromDate;
    let to = this.filterForm.value.toDate;
    
    if(from && to){
      if(from.valueOf() > to.valueOf()){
        this.error = "Ogiltiga datum. Till datumet måste inträffa efter eller samma datum som från datumet"
        return;
      }
    }
    this.advancedSearch = false;
    this.error= '';
    console.log(this.filterForm.value.fromDate);
    this.eventFilter = new EventFilter(this.filterForm.value);
    this.childEvent.emit(this.eventFilter);
  }
  
}
