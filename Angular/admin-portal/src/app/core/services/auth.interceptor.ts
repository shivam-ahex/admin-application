import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getToken();
//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//       return next.handle(cloned);
//     }
//     return next.handle(req);
//   }
// }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Get token from localStorage or wherever you store it
  // const token = localStorage.getItem('token');
  const token="eyopgtcxxvb_gfgsfgfgdgvbbbbxgxfgsdfgfrgsfgsfertertrtdvxbcvhcvbcvbnbnbncvvbxfg"
  if (token) {
    // Clone the request and add the token to the Authorization header
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle unauthorized errors or other errors if needed
      console.error('Interceptor error:', error);
      return throwError(error);
    })
  );
}
}