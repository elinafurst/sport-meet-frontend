import { CommentForm } from './../model/event';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetails } from '../model/event';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventMessagePopupComponent } from '../requests/event-message-popup/event-message-popup.component';
import { AuthserviceService } from 'src/app/authservice.service';

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

  constructor(private eventService: EventService, private route: ActivatedRoute,private authService: AuthserviceService, private router: Router, private modalService: NgbModal) { }


  ngOnInit() {
    this.initEvent();
  }

  initEvent() {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.eventService.getEvent(this.id).subscribe((data) => {
        this.event = data;
        console.log(this.event);
      },(err) => {
        this.handleUnauthorized(err);
    });
    })  
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

  open() {
    const modalRef = this.modalService.open(EventMessagePopupComponent);
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.passEntry.subscribe(() => {
      this.event.requestStatus = "PENDING";
    })
  }


}
