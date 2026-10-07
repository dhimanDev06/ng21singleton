import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { ApiService } from "../../services/api";
import { catchError, map, of, retry, throwError, timer } from "rxjs";

export function asynEmailValidation(apiService: ApiService): AsyncValidatorFn {
    return (control:AbstractControl) => {
        const emailID = control.value;
        return apiService.getObject(emailID).pipe(
            retry({
                count: 5,
                delay: (err,errCount) => {
                    if(err.status === 401) {
                        return throwError(() => new Error('Email not found'));
                    }
                    const seconds = errCount * 1000;
                    console.log("Retrying API call for email validation...", seconds);
                    return timer(seconds); // Retry after 1 second
                }
            }),
            map((response:any) => {
                return response ? { emailTaken: true } : null;
            }),
            catchError(() => of(null))
        );
    }
}