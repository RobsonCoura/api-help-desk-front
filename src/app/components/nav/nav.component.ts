// Importações necessárias do Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para navegação
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

// Componente Angular para a barra de navegação
@Component({
  selector: 'app-nav', // Seletor do componente
  templateUrl: './nav.component.html', // Template HTML associado ao componente
  styleUrls: ['./nav.component.css'] // Estilos CSS associados ao componente
})
export class NavComponent implements OnInit {

  // Construtor do componente, injeta o serviço Router para navegação
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService) { }

  // Método executado quando o componente é inicializado
  ngOnInit(): void {
    this.router.navigate(['home']); // Navega para a rota 'home' ao inicializar
  }

  // Método para realizar logout do usuário
  logout() {
    this.router.navigate(['login']); // Navega para a rota de login
    this.authService.logout(); // Chama o serviço de logout do AuthService para limpar dados de autenticação
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 5000 });  // Exibe uma mensagem informando que o logout foi realizado com sucesso
  }

}
