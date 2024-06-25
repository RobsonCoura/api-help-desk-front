// Importações necessárias do Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Importa a interface Credenciais do modelo
import { Credenciais } from '../models/credenciais';

// Importa a configuração da API
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root' // Define o serviço como provido a partir do módulo raiz
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  // Injeta o HttpClient no construtor para fazer requisições HTTP
  constructor(private http: HttpClient) { }

  // Método para autenticar o usuário com base nas credenciais fornecidas
  authenticate(creds: Credenciais) {
    // Realiza uma requisição POST para o endpoint de login na API
    // Utiliza a URL base da API configurada em API_CONFIG e adiciona /login ao final
    return this.http.post(`${API_CONFIG.BASE_URL}/login`, creds, {
      observe: 'response', // Indica que queremos observar a resposta completa da requisição
      responseType: 'text' // Define que o tipo de resposta esperado é texto (para obter o token JWT)
    });
  }

  // Método para realizar o login bem-sucedido, armazenando o token JWT no localStorage
  successfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  // Método para verificar se o usuário está autenticado com base no token JWT armazenado
  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);  // Retorna verdadeiro se o token não estiver expirado
    }
    return false;  // Retorna falso se não houver token no localStorage
  }

  // Método para realizar logout do usuário
  logout() {
    localStorage.clear(); // Limpa todos os dados armazenados no localStorage
  }

}
