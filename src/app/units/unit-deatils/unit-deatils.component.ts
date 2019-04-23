import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-unit-deatils',
  templateUrl: './unit-deatils.component.html',
  styleUrls: ['./unit-deatils.component.css']
})
export class UnitDeatilsComponent implements OnInit {

  private id: any;
  private unit;

  constructor(private route: ActivatedRoute, private unitService: UnitService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      console.log(this.id)
      this.unitService.getUnit(this.id).subscribe((data) => {
        console.log(data);
        this.unit = data;
        console.log(this.unit);
      })
    })  
  }

}
