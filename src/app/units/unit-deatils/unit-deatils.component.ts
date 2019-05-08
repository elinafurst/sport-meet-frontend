import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-unit-deatils',
  templateUrl: './unit-deatils.component.html',
  styleUrls: ['./unit-deatils.component.css']
})
export class UnitDeatilsComponent implements OnInit {

  private id: any;
  private unit;
  private events;

  constructor(private route: ActivatedRoute, private unitService: UnitService,  private router: Router, private authService: AuthserviceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log(this.id)
      this.unitService.getUnit(this.id).subscribe((data) => {
        console.log(data);
        this.unit = data;
        console.log(this.unit);
      }, (err) => {
        this.handleUnauthorized(err);
      });
    })  

    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log(this.id)
      this.unitService.getEventsForUnit(this.id).subscribe((data) => {
        console.log(data);
        this.events = data.dtos;
        console.log(this.unit);
      },(err) => {
        this.handleUnauthorized(err);
      });
    })  
    
  }

  onFollowUnit() {
    this.unitService.followUnit(this.id).subscribe((data) => {
      this.ngOnInit();
    })

  }

  onUnFollowUnit() {
    this.unitService.unFollowUnit(this.id).subscribe((data) => {
      this.ngOnInit();
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
