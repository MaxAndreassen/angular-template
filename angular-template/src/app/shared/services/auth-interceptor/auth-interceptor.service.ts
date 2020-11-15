import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaderResponse,
  HttpSentEvent,
  HttpProgressEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(APP_CONFIG) private config: IAppConfig
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authHeader = this.authService.getAuthHeader();
    const authReq = req.clone({ setHeaders: { Token: authHeader } });

    return next
      .handle(authReq)
      .pipe(tap(event => {
        // Success
      }, event => {
        if (event instanceof HttpErrorResponse) {
          if (event.status === 401) {
            this.authService.logout();
          }
        }
      }));
  }
}
