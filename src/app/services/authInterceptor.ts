import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('access_token');

  const isPublicApi =
    req.url.includes('/api/login') ||
    req.url.includes('/api/register');

  if (!token || isPublicApi) {
    console.log('No token found or public API request, proceeding without Authorization header.', req.url);
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });


  return next(authReq).pipe(
    catchError((error) => {
        console.error('HTTP request failed:', error);
        if (error.status === 401) {
            console.error('Unauthorized request. Token may be invalid or expired.', error);
             sessionStorage.removeItem('access_token');
            // Redirect to login
            window.location.href = '/registration';
            // Optionally, you can redirect to login page or handle token refresh here.
        }
        return throwError(() => error);
    })
  );
};