import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    usuario: CredenciaisDTO = {
        emailCredencial: 'fausto@hotmail.com',
        senhaCredencial: '123456'
      };



    authenticate(creds: CredenciaisDTO) {

        if ( creds.emailCredencial === this.usuario.emailCredencial && creds.senhaCredencial === this.usuario.senhaCredencial) {
            return this.usuario;
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
}
