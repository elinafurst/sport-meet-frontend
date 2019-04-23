import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  private events;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.initNetworks();
  }

  initNetworks() {
    this.eventService.getEvents().subscribe((data) => {
      console.log(data);
      this.events = data;
    });
  }

}
