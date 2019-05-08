import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  private units;
  private page;
  private totalPages;
  private pageArray;
  private totalElements;
  private errorMessage;

  constructor(private unitService: UnitService,private router: Router, private authService: AuthserviceService) { }

  ngOnInit() {
    this.initUnits();
  }
  
  initUnits(){
    this.unitService.getUnits().subscribe((data) => {
      console.log(data);
      this.setUnits(data);
    }, (err) => {
      this.handleUnauthorized(err);
        this.isListEmpty(err);
    });
  }

  private isListEmpty(err: any) {
    if (err.status === 404) {
      this.errorMessage = "Kunde inte hitta några grupper";
      this.pageArray = new Array();
    }
  }

  
  setPage(i: any) {
    this.page = i;
    this.initUnits();
  }
  
  private setUnits(data: any) {
    this.units = data.dtos;

    this.totalPages = data.totalPages;
    var N =  this.totalPages + 1;
    this.pageArray = Array.apply(null, {length: N}).map(Number.call, Number)
    
    this.totalElements = data.totalElements;
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
