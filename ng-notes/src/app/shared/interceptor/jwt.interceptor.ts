import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  if (request.url.startsWith(environment.apUrl)){
    request = request.clone({
      setHeaders :   
      {  
        Authorization :'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFiaGFyd29ya3MuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2MjQzNzAwMDYsImV4cCI6MTYyNDM3MzYwNn0.a-qhOQFKIWWua5tjU9RZSwD-_Ry4GtkbpJ23oUyrDpc'
      }
    })
  }
   
    return next.handle(request);
  }
}
