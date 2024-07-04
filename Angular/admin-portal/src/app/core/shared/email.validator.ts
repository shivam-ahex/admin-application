import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function multiDomainValidator(allowedDomains: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // return if the control is empty
    }

    const email = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    const valid = allowedDomains.some(allowedDomain => domain === allowedDomain);

    return valid ? null : { multiDomain: true };
  };
}
