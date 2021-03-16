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
    if (req.body) {
      const duplicate = req.clone({ body: req.body.replace(/pizza/gi, '🍕') });
      return next.handle(duplicate);
    }
    return next.handle(req);
  }
}
