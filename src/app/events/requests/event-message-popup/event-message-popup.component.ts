import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { RequestService } from '../request.service';
import { RequestForm } from '../../model/event';
import { AuthserviceService } from 'src/app/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-message-popup',
  templateUrl: './event-message-popup.component.html',
  styleUrls: ['./event-message-popup.component.css']
})
export class EventMessagePopupComponent implements OnInit {  
  @Input() id: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  private requestForm: any;
  private request: RequestForm;
  constructor(private formBuilder:FormBuilder,  private router: Router, private authService: AuthserviceService, public activeModal: NgbActiveModal, private requestService: RequestService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.requestForm = this.formBuilder.group({
      eventNumber: [this.id],
      message:['']
    })
  } 

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  onSubmit() {
    console.log(this.requestForm.value);
    this.requestForm = new RequestForm(this.requestForm.value);   
    
    this.requestService.sendEventRequest(this.requestForm).subscribe((data) => {
      console.log(data);   
      this.passEntry.emit();
       this.activeModal.close('Modal Closed');
    }, (err) => {
      this.handleUnauthorized(err);
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
}
