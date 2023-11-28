import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/services/validators.service';

@Component({
  selector: 'form-field',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.scss']
})
export class FormFieldsComponent implements OnInit {

  @Input("errorControl") control: ValidationErrors | null = null;
  @Input("name") name?: string = '';
  @Input("radius") radius?:boolean;

  constructor() { }

  ngOnInit() {
  }

  get error() {
    return ValidatorsService.ngControlError(this.control?.["errors"], this.name);
  }

}
