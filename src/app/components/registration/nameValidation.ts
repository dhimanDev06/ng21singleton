import { AbstractControl, ValidationErrors } from "@angular/forms";

export function NameValidate(control: AbstractControl): ValidationErrors | null {
    const data = control.value;

    if(!data || data.trim() === '') {
        return null; // No validation error if the field is empty
    }

    const isValid = /^[a-zA-Z]+$/.test(data);

    return isValid ? null : { nameValidation: true}; 

}