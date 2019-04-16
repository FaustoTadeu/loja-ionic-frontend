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

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe: 'response', responseType: 'text'});
    }

    refreshToken () {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {observe: 'response', responseType: 'text'});
    }

    successfulLogin (authValue: string) {
        const tok = authValue.substring(7);
        const user: LocalUser = {
            token : tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storageService.setLocalStorage(user);
    }

    logout () {
        this.storageService.setLocalStorage(null);
    }
}
