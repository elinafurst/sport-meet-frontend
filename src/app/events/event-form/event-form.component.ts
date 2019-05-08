import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventForm } from '../model/event';
import { UnitService } from 'src/app/units/unit.service';
import { EventService } from '../event.service';
import * as moment from 'moment';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

 private eventForm :any
 private event: EventForm;
 private defaultCity: any = 'Stockholm'
 private areas;
 private myUnits: any;
 private sports;
 private defaultDate= new Date();
 private choosenDate;
 private choosenTime;
 private submitted = false;
 private errorMessage = '';

  constructor(private formBuilder: FormBuilder, private formsModule: FormsModule, private router: Router, private authService: AuthserviceService, private unitService: UnitService, private eventService: EventService) { }

  ngOnInit() {
    moment.locale('sv')

    this.unitService.getUnitsAdminOfKeyValue().subscribe((data) => {
        this.myUnits = data;
        console.log(this.myUnits);
    }, (err) => {
      this.handleUnauthorized(err);
    });

    this.eventService.getSports().subscribe((data) => {
        this.sports = data;
        console.log(this.sports);
    }, (err) => {
      this.handleUnauthorized(err);
    });

    this.eventService.getAreas(this.defaultCity).subscribe((data) => {
      this.areas = data;
      console.log(data);
    }, (err) => {
        this.handleUnauthorized(err);
    });

    this.initForm();
  }
  

  private handleUnauthorized(err: any) {
    if (err.status === 401) {      
      let success = this.authService.tryRefreshToken();
      if (success) {
        this.ngOnInit();
      } else {
        this.router.navigate(["logga-in"]);
      }
    }
  }

  initForm(){
    this.eventForm = this.formBuilder.group({
      name:['', [Validators.required]],
      sport:['', [Validators.required]],
      description:['', [Validators.required]],
      city:[this.defaultCity],
      meetingPoint:[''],
      byUnit:['', [Validators.required]],
      eventStartDate: new FormControl(''),
      eventStartTime:new FormControl('', [Validators.required]),
      area:['', [Validators.required]] 
  });
  }

  get name() {
    return this.eventForm.get('name');
  }

  get sport() {
    return this.eventForm.get('sport');
  }

  get description() {
    return this.eventForm.get('description');
  }

  get eventStartTime() {
    return this.eventForm.get('eventStartTime');
  }

  get area() {
    return this.eventForm.get('area');
  }


  onSelectDate(event: any){
  
    console.log(event);
    let date = moment(event.value).format("YYYY-MM-DD");
    let time = moment(event.value).format("HH:mm");
    this.eventForm.controls['eventStartDate'].setValue(date);
    this.eventForm.controls['eventStartTime'].setValue(time);
    this.choosenDate = date;
    this.choosenTime = time;
  }
  


  onSubmit(){
    console.log(this.eventForm.value);
    this.submitted = true;
   /* if (this.eventForm.invalid) {
      return;
    }*/

    this.event = new EventForm(this.eventForm.value);    
    console.log(this.event);

    this.eventService.createEvent(this.event).subscribe((data) =>{
      this.router.navigate(["events/"+ data]);
    },(err) =>{
      this.handleUnauthorized(err);
      this.errorMessage = "Oj något gick fel";
      console.log(err);
    });
    
  }
}
