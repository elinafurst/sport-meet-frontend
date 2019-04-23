import { FormBuilder } from '@angular/forms';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent implements OnInit {

  private filterForm;
  private sports;
  private cities: any = ['Stockholm', 'Uppsala']
  private advancedSearch:boolean;


  constructor(private formBuilder: FormBuilder, private eventService: EventService) { }

  ngOnInit() {
    this.advancedSearch = false;
    this.eventService.getSports().subscribe((data) => {
      this.sports = data;
      console.log(this.sports);
    });
    this.initForm();
  }

  initForm(){
    this.filterForm = this.formBuilder.group({
      sport:[''],
      city:[''],
      fromDate:[''],
      toDate:[''],
      area:['']
  });
  }

  toggleAdvancedSearch(){
    //todo måste logga in
    this.advancedSearch = !this.advancedSearch;
  }

  isAdvancedSearch(): boolean{
    return this.advancedSearch;
  }

  onSubmit(){
    console.log(this.filterForm.value);
  }
  
}
