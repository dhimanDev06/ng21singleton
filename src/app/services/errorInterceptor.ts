import {
  HttpInterceptorFn
} from '@angular/common/http';

import {
  catchError,
  throwError
} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError(error => {

      switch (error.status) {

        case 400:
          console.error('Bad Request');
          break;

        case 401:
          console.error('Unauthorized');
          break;

        case 403:
          console.error('Forbidden');
          break;

        case 404:
          console.error('API not found');
          break;

        case 500:
          console.error('Server error');
          break;

        default:
          console.error('Unknown API error');
      }

      return throwError(() => error);
    })
  );
};