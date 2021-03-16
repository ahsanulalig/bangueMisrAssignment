import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    const authToken =
      '31ca335f2787d438a0f6897634752c33b8a131e031d3662d74468d55dbd22fd6';
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    // if (req.body) {
    //   const duplicate = req.clone({ body: req.body.replace(/pizza/gi, '🍕') });
    //   return next.handle(duplicate);
    // }
    return next.handle(req);
  }
}
