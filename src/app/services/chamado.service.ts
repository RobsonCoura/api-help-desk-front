import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chamado } from '../models/chamado';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

   // Envia uma requisição GET para Buscar um chamado pelo ID
  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.BASE_URL}/chamados/${id}`);
  }

  // Método para buscar um lista de chamados
  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.BASE_URL}/chamados`);
  }

  // Envia uma requisição POST para criar um novo chamado
  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.BASE_URL}/chamados`, chamado);
  }

  // Envia uma requisição PUT para atualizar um chamado
  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${API_CONFIG.BASE_URL}/chamados/${chamado.id}`, chamado);
  }

}
