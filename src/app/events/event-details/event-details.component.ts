import { CommentForm } from './../model/event';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EventDetails } from '../model/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  private event: EventDetails;
  private id;
  private commentForm;
  private comment: CommentForm;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initEvent();
  }


  initEvent() {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log(this.id)
      this.eventService.getEvent(this.id).subscribe((data) => {
        console.log(data);
        this.event = data;
        console.log(this.event);
      })
    })  
  }
 

}
