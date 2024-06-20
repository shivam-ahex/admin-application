import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function coInDomainValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // return if the control is empty
    }
    
    const email = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    
    return domain === 'ahex.co.in' ? null : { coInDomain: true }; // valid if domain is ahex.co.in
  };
}
