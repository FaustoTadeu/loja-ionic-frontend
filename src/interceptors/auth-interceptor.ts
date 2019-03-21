import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StorageService } from "src/services/storage.service";
import { API_CONFIG } from "src/config/api.config";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    
    constructor(private storage: StorageService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       let localUser = this.storage.getLocalStorage();

       let N = API_CONFIG.baseUrl.length;
       let apiBaseRequest = request.url.substr(0, N) == API_CONFIG.baseUrl;

       if(localUser && apiBaseRequest) {
           const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)});
           return next.handle(authReq);
       } else {
            return next.handle(request);
       }
    }
}