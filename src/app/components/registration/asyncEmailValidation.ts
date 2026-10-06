import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { ApiService } from "../../services/api";
import { catchError, map, of } from "rxjs";

export function asynEmailValidation(apiService: ApiService): AsyncValidatorFn {
    return (control:AbstractControl) => {
        const emailID = control.value;
        return apiService.getObject(emailID).pipe(
            map((response:any) => {
                return response ? { emailTaken: true } : null;
            }),
            catchError(() => of(null))
        );
    }
}