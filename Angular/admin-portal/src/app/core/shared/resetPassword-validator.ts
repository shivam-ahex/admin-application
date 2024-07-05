import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('password');
    const reEnterPassword = control.get('reEnterPassword');

    if (newPassword && reEnterPassword && newPassword.value !== reEnterPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
