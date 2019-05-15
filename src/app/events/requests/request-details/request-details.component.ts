import { MessageForm } from './../../model/event';
import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {
  @Input() idd: string;

  private id;
  private request;
  private messageForm;
  private message: MessageForm;

  constructor(private requestService: RequestService, private formBuilder: FormBuilder, private route: ActivatedRoute,private router: Router, private authService: AuthserviceService) { }

  ngOnInit() {
    console.log(this.idd);
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log(this.id)
      this.requestService.getRequest(this.id).subscribe((data) => {
        console.log(data);
        this.request = data;
        console.log(this.request);
      }, (err) => {
        this.handleUnauthorized(err);
      });
    }) 
    this.initForm();
  }

  initForm(){
    this.messageForm = this.formBuilder.group({
      message:['']
    })
  } 

  onDenied() {
    console.log("Answer " + false);
    this.requestAnswer(false);
  }

  onAccepted() {
    console.log("Answer " + true);
    this.requestAnswer(true);
  }

  onCancelRequest(event: any){
    this.requestService.cancelRequest(event).subscribe(() => {
      this.ngOnInit();
    });
  }

  requestAnswer(bool: boolean){
    this.requestService.answerRequest(this.id, bool).subscribe(() => {
      this.ngOnInit();
    }, (err) => {
      this.handleUnauthorized(err);
    })
  }

  onSubmit(){
    this.message = new MessageForm(this.messageForm.value)
    this.requestService.sendMessageForRequest(this.id, this.message).subscribe(() => {
      this.ngOnInit();
    }, (err) => {
      this.handleUnauthorized(err);
    })
    console.log(this.message);
    console.log(this.id);

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
