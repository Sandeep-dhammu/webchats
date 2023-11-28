import { Injectable } from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {

  private static getError(errorType:any, errorValue?:any){
    switch (errorType) {
      case 'required':
        return `${errorValue?.controlName ?? "this field"} is required.`;

      case 'minlength':
        return `${errorValue?.controlName} must be at least ${errorValue?.requiredLength} characters.`;

      case 'maxlength':
        return `${errorValue?.controlName} cannot exceed ${errorValue?.requiredLength} characters.`;

      case 'pattern':
        return `Invalid ${errorValue?.controlName}.`;

      case 'email':
        return `Invalid email address.`;

      case 'username':
        return `Invalid ${errorValue?.controlName}. Username must be 6-20 characters and can only contain letters, numbers, dots, and underscores.`;

      case 'compare':
        return `Passwords do not match.`;

      // Add more cases for additional error types as needed

      default:
        return `Validation error for ${errorValue.controlName}.`;
    }
  }
  constructor() {}

  static ngControlError(errors?: ValidationErrors | null | undefined, controlName?: string) {
    
    for (const error in errors) {
      if (errors.hasOwnProperty(error)) {
        return this.getError(error, {
          controlName,
          ...errors[error]
        }) 
      }
    }
    return null
  }

  static compare(control1:any, control2:any):ValidatorFn {
    return function matchPassword(c: AbstractControl) {
      if (
        c.get(control1)?.value &&
        c.get(control2)?.value &&
        c.get(control1)?.value !== c.get(control2)?.value
      ) {
        c.get(control2)?.setErrors({ compare: true });
        return { invalid: true };
      } else {
        return null;
      }
    };
  }

  static username(control:AbstractControl):ValidationErrors | null{
    if(control?.value){
      if(`${control.value}`.match(/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)){
        return null
      }else{
        return {username:true}
      }
    }
    return null
  }

  static email(control:AbstractControl):ValidationErrors | null{
    if(control?.value){
      if(`${control.value}`.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
        return null
      }else{
        return {email:true}
      }
    }
    return null
  }

  static usernameOrEmail(control:AbstractControl):ValidationErrors | null{
    if(control?.value){
      let username = ValidatorsService.username(control)
      let email = ValidatorsService.email(control)
      if(username && email) return username ?? email
    }
    return null
  }
}
