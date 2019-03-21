import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StorageService } from "src/services/storage.service";
import { AlertController } from '@ionic/angular';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    
    constructor(private storage: StorageService, private alertCtrl: AlertController) {

    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
           .pipe(
               catchError((error: any) => {
                   let errorObj = error;
                   if(errorObj.error) {
                       errorObj = errorObj.error;
                   }
                   if (!errorObj.status) {
                       errorObj = JSON.parse(errorObj);
                   }

                   console.log('Erro detectado pelo interceptor: ');
                   console.log(errorObj);

                   switch(errorObj.status) {
                       case 401: 
                           this.handle401();
                       break;
                       case 403: 
                          this.handle403();
                        break;
                        default:
                          this.handleErrorDefault(errorObj);
                        break;
                   }

                    return Observable.throw(errorObj);
                })
           );
    }

    handle403() {
        this.storage.setLocalStorage(null);
    }

    async handle401() {
        const alert = await this.alertCtrl.create({
            header: 'Erro 401',
            subHeader: 'Falha de Autenticação',
            message: 'Verifique os dados inseridos e tente novamente',
            buttons: ['OK']
          });
      
          await alert.present();
    }

    async handleErrorDefault(errorObj) {
        const alert = await this.alertCtrl.create({
            header: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            buttons: ['OK']
          });
      
          await alert.present();
    }
}