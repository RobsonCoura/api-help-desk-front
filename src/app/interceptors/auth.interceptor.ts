import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token) {
      const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
      return next.handle(cloneReq);
    } else {
      return next.handle(request);
    }
  }
}

// Provedor de interceptador de autenticação para injetar no módulo
export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS, // Define que o provedor é para HTTP_INTERCEPTORS
    useClass: AuthInterceptor, // Especifica que a classe AuthInterceptor será usada como interceptador
    multi: true // Permite múltiplos interceptadores
  }
]
