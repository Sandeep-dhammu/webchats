import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldsComponent } from './form-fields.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const exports = [FormFieldsComponent];

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [exports],
  exports:[exports]
})
export class FormFieldsModule { }
