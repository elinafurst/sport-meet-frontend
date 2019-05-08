import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';
import { Router } from '@angular/router';
import { Unit, UnitForm } from '../model/unit';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.css']
})
export class UnitFormComponent implements OnInit {

  private unitForm: any
  private unit: UnitForm;
  private submitted = false;
  
  constructor(private formBuilder: FormBuilder, private unitService: UnitService, private router: Router) { }

  ngOnInit() {
    this.unitForm = this.formBuilder.group({
      name:['', [Validators.required]],
      description:['']
    });
  }

  get name(){
    return this.unitForm.get('name');
  }

  onSubmit(){
    this.unit = new UnitForm(this.unitForm.value);

    this.submitted = true;
    if (this.unitForm.invalid) {
      return;
    }

    this.unitService.createUnit(this.unit).subscribe((data) => {
      this.router.navigate(["/grupper/"+ data])
      console.log("Success")
      //ROUTA
    },(err) => {
      console.log(err);
      //TODO error hantering namn dubletter
    }
    )
  }

}
