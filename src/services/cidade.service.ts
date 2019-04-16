import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';
import { CidadeDTO } from 'src/models/cidade.dto';

@Injectable()
export class CidadeService {

    constructor(private http: HttpClient) {}

    findByEstado (estado_id: string): Observable<CidadeDTO[]> {
          return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`); 
    }

}
