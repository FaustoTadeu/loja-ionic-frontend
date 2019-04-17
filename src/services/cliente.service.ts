import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { StorageService } from "./storage.service";
import { HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "src/config/api.config";
import { ClienteDTO } from "src/models/cliente.dto";
import { Observable } from "rxjs";

@Injectable()
export class ClienteService {

    constructor(public httpCliente : HttpClient, public storage : StorageService ) {}

    findByEmail(email: string) : Observable<ClienteDTO> {
        return this.httpCliente.get<ClienteDTO> (
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    insert(cliente: ClienteDTO) {
        return this.httpCliente.post (
            `${API_CONFIG.baseUrl}/clientes`,
            cliente,
            {
                observe: 'response',
                responseType: 'text' 
            } 
        );
    }
}