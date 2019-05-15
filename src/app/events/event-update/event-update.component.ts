import { EventDetails } from './../model/event';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { tap } from 'rxjs/operators'; 
import * as moment from 'moment';
import { UnitService } from 'src/app/units/unit.service';
import { FormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventForm } from '../model/event';
import { Observable } from 'rxjs';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {

  private eventUpdateForm :any
  private eventForm: Observable<EventDetails>
  private event: EventForm;
  private defaultCity: any = 'Stockholm'
  private areas;
  private myUnits: any;
  private sports;
  private defaultDate= new Date();
  private choosenDate;
  private choosenTime;
  private submitted = false;
  private id;

  private errorMessage;
  private errorMessageCancel
  keyvalues: {[key:number]:string};

 
   constructor(private formBuilder: FormBuilder,  private authService: AuthserviceService, private formsModule: FormsModule, private router: Router, private unitService: UnitService, private eventService: EventService, private route: ActivatedRoute) { }
 
   ngOnInit() {
     moment.locale('sv')
     this.initForm();

      this.unitService.getUnitsAdminOfKeyValue().subscribe((data) => {
        this.myUnits = data;
      }, (err) => {
        this.handleUnauthorized(err);
      });  

    this.eventService.getSports().subscribe((data) => {
        this.sports = data;
    }, (err) => {
      this.handleUnauthorized(err);
    });  

    
   this.eventService.getAreas(this.defaultCity).subscribe((data) => {
     this.areas = data;
     console.log(data);
   }, (err) => {
    this.handleUnauthorized(err);
  });      

    this.initEvent(); 
  }

  initEvent() {
    //pipd with patch didnt work
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log(this.id);
      this.eventService.getEventToPromise(this.id).then(data => {
        console.log(data);
        this.eventUpdateForm.get("name").patchValue(data.name);
        this.eventUpdateForm.get("sport").patchValue(data.sport);
        this.eventUpdateForm.get("description").patchValue(data.description);
        this.eventUpdateForm.get("area").patchValue(data.area);
        this.eventUpdateForm.get("meetingPoint").patchValue(data.meetingPoint);
        this.eventUpdateForm.get("eventStartDate").patchValue(data.eventStartDate);
        this.eventUpdateForm.get("eventStartTime").patchValue(data.eventStartTime);
        this.eventUpdateForm.get("byUnit").patchValue(data.byUnit);
        this.choosenDate = data.eventStartDate;
        this.choosenTime = data.eventStartTime;
        this.keyvalues = data.byUnit;    
      }).then(() => {
        for (var key in this.keyvalues) {
          if (this.keyvalues.hasOwnProperty(key)) {
            this.eventUpdateForm.get("byUnit").patchValue(key);
          }
        }
      });      
    })  
  }

  initForm(){
    this.eventUpdateForm = this.formBuilder.group({
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
    return this.eventUpdateForm.get('name');
  }

  get sport() {
    return this.eventUpdateForm.get('sport');
  }

  get description() {
    return this.eventUpdateForm.get('description');
  }

  get eventStartTime() {
    return this.eventUpdateForm.get('eventStartTime');
  }

  get area() {
    return this.eventUpdateForm.get('area');
  }


  onSelectDate(event: any){
  
    console.log(event);
    let date = moment(event.value).format("YYYY-MM-DD");
    let time = moment(event.value).format("HH:mm");
    this.eventUpdateForm.controls['eventStartDate'].setValue(date);
    this.eventUpdateForm.controls['eventStartTime'].setValue(time);
    this.choosenDate = date;
    this.choosenTime = time;
  }
  
  onSubmit(){
   
    console.log(this.eventUpdateForm.value);
    this.submitted = true;
   /* if (this.eventForm.invalid) {
      return;
    }*/
    this.event = new EventForm(this.eventUpdateForm.value);    
    this.eventService.updateEvent(this.id, this.event).subscribe((data) =>{
      this.router.navigate(["events/"+ data]);
    },(err) =>{
      this.handleUnauthorized(err);
      this.errorMessage = "Oj något gick fel";
    });
  }

  cancelEvent(){
    this.eventService.cancelEventCreator(this.id).subscribe(() => {
      this.router.navigate(["/mina-sidor/events"]);
    },(err) =>{
      this.handleUnauthorized(err);
      this.errorMessageCancel = "Oj något gick fel";
    });
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
