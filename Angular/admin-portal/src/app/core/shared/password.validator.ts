import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// Custom validator function
export function forbiddenSymbolsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbiddenSymbols = /[<>":;{}[\]]/; // Define the regex for forbidden symbols
    if (forbiddenSymbols.test(control.value)) {
      return { forbiddenSymbols: true }; // Return an error object if any forbidden symbol is found
    }
    return null; // Return null if validation passes
  };
}
