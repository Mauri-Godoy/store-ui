import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Injectable()
export class HttpRequestInterceptor implements HttpRequestInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // lo saca del storage

    // Clonamos la request y agregamos el header si hay token
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Mostrar mensajes dependiendo del tipo de error
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
          this.toast.error('Sesión expirada. Por favor, volvé a ingresar.');
        } else if (error.status === 403) {
          this.toast.error('No tenés permisos para esta acción.');
        } else {
          this.toast.error('Error en la solicitud');
        }
        return throwError(() => error);
      })
    );
  }
}
