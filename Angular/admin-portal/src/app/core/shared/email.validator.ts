import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      // if control is empty, return no error
      return null;
    }
    const email = control.value;
    const domainPattern = new RegExp(`@${domain}$`);
    const valid = domainPattern.test(email);
    return valid ? null : { emailDomain: { value: control.value, domain } };
  };
}
