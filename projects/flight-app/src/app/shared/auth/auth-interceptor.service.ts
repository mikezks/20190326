import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('http://www.angular.at')) {
      let headers = req.headers.set('Authorization', 'Just for our demo.');
      req = req.clone({ headers });
    }

    return next.handle(req)
            .pipe(
              catchError(error => this.handleError(error))
            );
  }

  private handleError(event: HttpErrorResponse) {
    if (event.status === 401 || event.status === 403) {
      this.router.navigate(['/home', { needsLogin: true }]);
    }
    return throwError(event);
  }
}
