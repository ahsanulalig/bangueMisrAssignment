import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    const authToken =
      "3bf7f00401220e2251c92a881288c458f29541ed60547d1aa8529d7f9badb793";
    req = req.clone({
      setHeaders: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
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
