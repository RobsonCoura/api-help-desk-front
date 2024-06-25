import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

// Decorador Injectable para indicar que o serviço pode ser injetado em outros componentes e serviços
@Injectable({
  providedIn: 'root'  // O serviço é registrado no nível raiz, tornando-o disponível em toda a aplicação
})
export class ClienteService {

  // Construtor que recebe o HttpClient
  constructor(private http: HttpClient) { }

  // Método para buscar um Cliente pelo ID.
  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.BASE_URL}/clientes/${id}`);
  }

  // Método para buscar todos os clientes
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.BASE_URL}/clientes`); // Faz uma solicitação GET para a API e retorna um Observable contendo a lista de técnicos
  }

  // Método para cadastrar um novo cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.BASE_URL}/clientes`, cliente);
  }

  // Método para atualizar um cliente
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.BASE_URL}/clientes/${cliente.id}`, cliente);
  }

  // Método para deletar um cliente
  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.BASE_URL}/clientes/${id}`);
  }

}
