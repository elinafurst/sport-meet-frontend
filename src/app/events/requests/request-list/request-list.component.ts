import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../../model/event';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  private requests;
  private selectedIndex;
  private id;
  private request;
  private messages;
  constructor(private requestService: RequestService, private router: Router, private authService: AuthserviceService) { }

  ngOnInit() {
    this.requestService.getRequests().subscribe((data) => {
      this.requests = data;
      console.log(data);
      console.log(this.requests);
    }, (err) => {
      this.handleUnauthorized(err);
    });
  }

  openRequest(request: Request){
    this.id=request.requestNumber;
    console.log(this.id);
    
      console.log(this.id)
      this.requestService.getRequest(request.requestNumber).subscribe((data) => {
        console.log(data);
        this.request = data;
        this.messages = data.messages;
        console.log(this.request);
      }, (err) => {
        this.handleUnauthorized(err);
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
