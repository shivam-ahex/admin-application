import { FormGroup, ValidationErrors } from "@angular/forms";

export class PasswordValidator{
    static passwordMatch(forms:FormGroup):ValidationErrors|null{
        const password=forms.get('newPassword')?.value;
        const confPassword=forms.get('reEnterPassword')?.value;
        return password === confPassword ? null : { passwordMismatch: true };
    }
}