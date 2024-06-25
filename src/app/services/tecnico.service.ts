import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';

// Decorador Injectable para indicar que o serviço pode ser injetado em outros componentes e serviços
@Injectable({
  providedIn: 'root'  // O serviço é registrado no nível raiz, tornando-o disponível em toda a aplicação
})
export class TecnicoService {

  // Construtor que recebe o HttpClient
  constructor(private http: HttpClient) { }

  // Método para buscar um técnico pelo ID.
  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.BASE_URL}/tecnicos/${id}`);
  }

  // Método para buscar todos os técnicos
  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.BASE_URL}/tecnicos`); // Faz uma solicitação GET para a API e retorna um Observable contendo a lista de técnicos
  }

  // Método para cadastrar um novo técnico
  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API_CONFIG.BASE_URL}/tecnicos`, tecnico);
  }

  // Método para atualizar um técnico
  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${API_CONFIG.BASE_URL}/tecnicos/${tecnico.id}`, tecnico);
  }

  // Método para deletar um técnico
  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_CONFIG.BASE_URL}/tecnicos/${id}`);
  }

}
