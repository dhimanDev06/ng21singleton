import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, switchMap, throwError } from "rxjs";
import { ApiService } from "./api";
import { inject } from "@angular/core";
export const authInterceptor: HttpInterceptorFn = (req, next) => {

const apiService = inject(ApiService);
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
        if (error.status !== 401) {
            console.error('Unauthorized request. Token may be invalid or expired.', error);
             sessionStorage.removeItem('access_token');
            // Redirect to login
            window.location.href = '/registration';
            // Optionally, you can redirect to login page or handle token refresh here.
            return throwError(() => error);
        }
        
        return apiService.getRefreshToken().pipe(
            switchMap((response) => {
                const newToken = response.access_token;
                localStorage.setItem('access_token', newToken);
                const retryAuthReq  = req.clone({
                    setHeaders: {
                    Authorization: `Bearer ${newToken}`
                    }
                });
                return next(retryAuthReq);
            }),
            catchError((refreshError) => {
                console.error('Token refresh failed:', refreshError);
                // Redirect to login
                window.location.href = '/registration';
                return throwError(() => refreshError);
            })

        );
    })
  );
};