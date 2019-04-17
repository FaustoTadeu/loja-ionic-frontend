import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StorageService } from "src/services/storage.service";
import { AlertController } from '@ionic/angular';
import { FieldMessage } from "src/models/fieldmessage";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";

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
                        case 422: 
                          this.handle422(errorObj);
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

    async handle422(errorObj) {
        const alert = await this.alertCtrl.create({
            header: 'Erro 422',
            subHeader: 'Erro de Validação',
            message: this.listErrors(errorObj),
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

    private listErrors(messages : FieldMessage[]) : string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + "</p>"; 

        }
        return s;
    }
}