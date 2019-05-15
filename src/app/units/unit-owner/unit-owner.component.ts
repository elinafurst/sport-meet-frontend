import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-unit-owner',
  templateUrl: './unit-owner.component.html',
  styleUrls: ['./unit-owner.component.css']
})
export class UnitOwnerComponent implements OnInit {

  private units;
  private page;
  private totalPages;
  private pageArray;
  private totalElements;

  constructor(private unitService: UnitService,  private router: Router, private authService: AuthserviceService) { }

  ngOnInit() {
    this.initUnits();
  }
  
  initUnits(){
    this.unitService.getUnitsAdminOf().subscribe((data) => {
      console.log(data);
      this.setUnits(data);
    },(err) => {
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

  private setUnits(data: any) {
    this.units = data.dtos;

    this.totalPages = data.totalPages;
    var N =  this.totalPages + 1;
    this.pageArray = Array.apply(null, {length: N}).map(Number.call, Number)
    
    this.totalElements = data.totalElements;
  }
}
