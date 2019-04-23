import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  private units;

  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.initUnits();
  }
  
  initUnits(){
    this.unitService.getUnits().subscribe((data) => {
      console.log(data);
      this.units = data;
    });
  }
}
