import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient, private storageService: StorageService) {}

    usuario: CredenciaisDTO = {
        emailCredencial: 'fausto@hotmail.com',
        senhaCredencial: '123456',
      };

    authorization =  'value: feffvcevcer3453vefewf3e';


    authenticate(creds: CredenciaisDTO) {

        if ( creds.emailCredencial === this.usuario.emailCredencial && creds.senhaCredencial === this.usuario.senhaCredencial) {
            const userAuth = {email: this.usuario.emailCredencial, senha: this.usuario.senhaCredencial,
                              authorization: this.authorization };
            return userAuth;
        } else {
            return null;
        }
        // return this.http.post(
        //     `${API_CONFIG.baseUrl}/login`,
        //     creds,
        //     {
        //         observe: 'response',
        //         responseType: 'text'
        //     }
        // );
    }

    successfulLogin (authValue: string) {
        const tok = authValue.substring(7);
        const user: LocalUser = {
            token : tok,
            email: 'fausto@hotmail.com'      // this.jwtHelper.decodeToken(tok)
        };
        this.storageService.setLocalStorage(user);
    }

    logout () {
        this.storageService.setLocalStorage(null);
    }
}
