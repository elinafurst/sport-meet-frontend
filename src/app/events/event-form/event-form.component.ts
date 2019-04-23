import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventForm } from '../model/event';
import { UnitService } from 'src/app/units/unit.service';
import { EventService } from '../event.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

 private eventForm :any
 private event: EventForm;
 private cities: any = ['Stockholm', 'Uppsala']
 private maxNumbers: any = [1, 2, 3, 4, 5, 6, 7]
 private myUnits: any;
 private sports;

  constructor(private formBuilder: FormBuilder, private router: Router, private unitService: UnitService, private eventService: EventService) { }

  ngOnInit() {

    this.unitService.getUnitsActiveUserIsAdminOf().subscribe((data) => {
        this.myUnits = data;
        console.log(this.myUnits);
    });

    this.eventService.getSports().subscribe((data) => {
        this.sports = data;
        console.log(this.sports);
    });

    this.initForm();
  }

  initForm(){
    this.eventForm = this.formBuilder.group({
      name:[''],
      sport:[''],
      description:[''],
      city:[''],
      meetingPlace:[''],
      maxParticipants:[''],
      byUnit:[''],
      eventStartDate:[''],
      eventStartTime:[''],
      area:['']
  });
  }
  
  changeCity(choosen: any){
    console.log(choosen.target.value);
  }

  onSubmit(){
    console.log(this.eventForm.value);
    this.event = new EventForm(this.eventForm.value);    
    console.log(this.event);

    this.eventService.createEvent(this.event).subscribe((data) =>{
      this.router.navigate(["events/"+ data]);
    },(err) =>{
      //Todo Validation errors
      console.log(err);
    });
    
  }
}
