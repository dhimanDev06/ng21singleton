import { HttpInterceptorFn } from "@angular/common/http";

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

  return next(authReq);
};